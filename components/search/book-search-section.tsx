'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookEmpty } from '@/components/book/book-empty';
import { BookList } from '@/components/book/book-list';
import { BookListSkeleton } from '@/components/book/book-list-skeleton';
import { ResultCount } from '@/components/common/result-count';
import { DetailSearchButton } from '@/components/search/detail-search-button';
import { SearchInput } from '@/components/search/search-input';
import { Button } from '@/components/ui/button';
import {
  BOOK_LABEL,
  BOOK_SEARCH_EMPTY_MESSAGE,
  BOOK_SEARCH_PAGE_SIZE,
} from '@/constants/book';
import { ROUTE } from '@/constants/route';
import { SEARCH_QUERY_PARAM, SEARCH_TARGET_PARAM } from '@/constants/search';
import { useBookSearch } from '@/hooks/use-book-search';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { saveLastSearch } from '@/hooks/use-last-search';
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

  // 공유된 URL 로 바로 들어온 경우까지 포함해, 검색 조건이 있으면 늘 기억해 둔다.
  // 다른 메뉴에 다녀와도 헤더 링크가 같은 결과로 돌려보낸다.
  const search = searchParams.toString();

  useEffect(() => {
    if (!keyword.trim()) return;

    saveLastSearch(search);
  }, [keyword, search]);

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
  // 검색 전 초기 화면과 결과 없음 화면을 같은 빈 상태로 보여준다.
  const shouldShowEmpty = !isLoading && !isError && books.length === 0;

  // 마지막 페이지는 10개보다 적을 수 있으므로 남은 개수까지만 자리를 잡는다.
  const nextPageSkeletonCount = Math.max(
    1,
    Math.min(BOOK_SEARCH_PAGE_SIZE, totalCount - books.length),
  );

  return (
    <section aria-label="도서 검색">
      <div className="mt-6 flex items-center gap-4">
        <SearchInput
          // 상세검색이 걸리면 전체 검색어 입력은 비워야 하므로 다시 마운트한다.
          key={target ?? 'all'}
          defaultKeyword={target ? '' : keyword}
          onSearch={handleSearch}
        />
        <DetailSearchButton onSubmit={handleDetailSearch} />
      </div>

      <div className="mt-8.75">
        <ResultCount
          label={BOOK_LABEL.SEARCH_RESULT}
          count={totalCount}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-9" aria-busy={isLoading || isFetchingNextPage}>
        {isError && (
          <div
            role="alert"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <p className="text-caption text-palette-red">
              {error instanceof Error ? error.message : '검색에 실패했습니다.'}
            </p>
            <Button
              variant="action-secondary"
              size="action"
              onClick={() => refetch()}
            >
              다시 시도
            </Button>
          </div>
        )}

        {isLoading && <BookListSkeleton />}

        {shouldShowEmpty && <BookEmpty message={BOOK_SEARCH_EMPTY_MESSAGE} />}

        {books.length > 0 && <BookList books={books} />}

        {isFetchingNextPage && (
          <BookListSkeleton count={nextPageSkeletonCount} />
        )}

        <p aria-live="polite" className="sr-only">
          {isLoading || isFetchingNextPage
            ? '검색 결과를 불러오는 중입니다.'
            : hasSearched && !isError
              ? `검색 결과 총 ${totalCount.toLocaleString('ko-KR')}건 중 ${books.length}건을 표시하고 있습니다.`
              : ''}
        </p>

        <div ref={sentinelRef} aria-hidden="true" />
      </div>
    </section>
  );
};
