'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BookEmpty } from '@/components/book/book-empty';
import { BookList } from '@/components/book/book-list';
import { ActionButton } from '@/components/common/action-button';
import { ResultCount } from '@/components/common/result-count';
import { DetailSearchButton } from '@/components/search/detail-search-button';
import { SearchInput } from '@/components/search/search-input';
import { ROUTE } from '@/constants/route';
import { SEARCH_QUERY_PARAM, SEARCH_TARGET_PARAM } from '@/constants/search';
import { useBookSearch } from '@/hooks/use-book-search';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { isBookSearchTarget } from '@/lib/book/is-book-search-target';
import type { BookSearchTarget } from '@/types/book';

export const BookSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get(SEARCH_QUERY_PARAM) ?? '';
  const targetParam = searchParams.get(SEARCH_TARGET_PARAM);
  const target = isBookSearchTarget(targetParam) ? targetParam : undefined;

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
  } = useBookSearch({ query: keyword, target });

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // 검색어는 공유와 뒤로가기가 가능해야 하므로 URL 쿼리로 관리한다.
  const replaceQuery = (params: URLSearchParams) => {
    router.replace(`${ROUTE.SEARCH}?${params.toString()}`, { scroll: false });
  };

  // 전체 검색과 상세 검색은 동시에 진행할 수 없다. 서로의 조건을 지운다.
  const handleSearch = (next: string) => {
    const params = new URLSearchParams();
    params.set(SEARCH_QUERY_PARAM, next);
    replaceQuery(params);
  };

  const handleDetailSearch = (
    nextTarget: BookSearchTarget,
    nextKeyword: string,
  ) => {
    const params = new URLSearchParams();
    params.set(SEARCH_QUERY_PARAM, nextKeyword);
    params.set(SEARCH_TARGET_PARAM, nextTarget);
    replaceQuery(params);
  };

  const hasSearched = keyword.trim().length > 0;
  const isEmptyResult =
    hasSearched && !isLoading && !isError && books.length === 0;

  return (
    <section aria-label="도서 검색">
      <div className="mt-6 flex items-start gap-4">
        <SearchInput
          // 상세검색이 걸리면 전체 검색어 입력은 비워야 하므로 다시 마운트한다.
          key={target ?? 'all'}
          defaultKeyword={target ? '' : keyword}
          onSearch={handleSearch}
        />
        <DetailSearchButton onSubmit={handleDetailSearch} />
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
