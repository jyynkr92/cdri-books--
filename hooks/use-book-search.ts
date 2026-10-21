'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '@/api/book/search-books';
import { BOOK_SEARCH_MAX_PAGE } from '@/constants/book';
import type { BookSearchTarget } from '@/types/book';

interface Params {
  query: string;
  target?: BookSearchTarget;
}

export const useBookSearch = ({ query, target }: Params) => {
  // TanStack Query 의 반환 객체는 실제로 읽은 필드만 구독한다.
  // spread 하면 그 최적화가 깨지므로 필요한 필드만 꺼내 쓴다.
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['books', 'search', query, target ?? null],
    queryFn: ({ pageParam }) => searchBooks({ query, page: pageParam, target }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isEnd) return undefined;

      const nextPage = allPages.length + 1;

      return nextPage > BOOK_SEARCH_MAX_PAGE ? undefined : nextPage;
    },
    // 검색어가 없으면 호출하지 않는다.
    enabled: query.trim().length > 0,
  });

  // 페이지가 쌓일수록 커지므로 참조를 고정한다.
  const books = useMemo(
    () => data?.pages.flatMap((page) => page.books) ?? [],
    [data],
  );

  return {
    books,
    totalCount: data?.pages[0]?.totalCount ?? 0,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
};
