'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BookEmpty } from '@/components/book/book-empty';
import { BookList } from '@/components/book/book-list';
import { ActionButton } from '@/components/common/action-button';
import { ResultCount } from '@/components/common/result-count';
import { DetailSearchButton } from '@/components/search/detail-search-button';
import { SearchInput } from '@/components/search/search-input';
import { ROUTE } from '@/constants/route';
import { SEARCH_QUERY_PARAM } from '@/constants/search';
import { useBookSearch } from '@/hooks/use-book-search';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export const BookSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get(SEARCH_QUERY_PARAM) ?? '';

  const {
    books,
    totalCount,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useBookSearch({ query: keyword });

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // 검색어는 공유와 뒤로가기가 가능해야 하므로 URL 쿼리로 관리한다.
  const handleSearch = (next: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_QUERY_PARAM, next);
    router.replace(`${ROUTE.SEARCH}?${params.toString()}`, { scroll: false });
  };

  const hasSearched = keyword.trim().length > 0;
  const isEmptyResult =
    hasSearched && !isLoading && !isError && books.length === 0;

  return (
    <section aria-label="도서 검색">
      <div className="mt-6 flex items-start gap-4">
        <SearchInput defaultKeyword={keyword} onSearch={handleSearch} />
        <DetailSearchButton />
      </div>

      <div className="mt-8.75">
        <ResultCount label="도서 검색" count={totalCount} />
      </div>

      <div className="mt-9" aria-busy={isLoading}>
        {isError && (
          <div
            role="alert"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <p className="text-caption text-palette-red">
              {error instanceof Error ? error.message : '검색에 실패했습니다.'}
            </p>
            <ActionButton variant="secondary" onClick={() => refetch()}>
              다시 시도
            </ActionButton>
          </div>
        )}

        {isEmptyResult && <BookEmpty />}

        {books.length > 0 && <BookList books={books} />}

        {isFetchingNextPage && (
          <p className="text-caption text-text-subtitle py-6 text-center">
            불러오는 중...
          </p>
        )}

        <div ref={sentinelRef} aria-hidden="true" />
      </div>
    </section>
  );
};
