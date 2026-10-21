'use client';

import { useEffect, useRef } from 'react';

interface Params {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

/** sentinel 이 뷰포트에 들어오면 다음 페이지를 불러온다. */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  onLoadMore,
}: Params) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(onLoadMore);

  // 렌더는 순수해야 하므로 ref 갱신은 effect 에서 한다.
  useEffect(() => {
    loadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMoreRef.current();
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching]);

  return sentinelRef;
};
