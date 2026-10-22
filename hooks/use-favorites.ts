'use client';

import { useEffect, useState } from 'react';
import { useFavoriteStore } from '@/store/create-favorite-store';
import type { Book } from '@/types/book';

/** 한 권의 찜 여부만 구독한다. 다른 책을 토글해도 이 컴포넌트는 리렌더되지 않는다. */
export const useIsFavorite = (id: string) =>
  useFavoriteStore((state) => state.books.some((book) => book.id === id));

/** 찜한 책 목록 전체. 목록 화면에서 사용한다. */
export const useFavoriteBooks = () => useFavoriteStore((state) => state.books);

export const toggleFavorite = (book: Book) =>
  useFavoriteStore.getState().toggleFavorite(book);

/**
 * persist 복원이 끝났는지.
 * 복원 전에 빈 상태를 그리면 찜한 책이 있는 사용자에게 "없습니다" 가 잠깐 보인다.
 * 서버 렌더와 첫 클라이언트 렌더를 false 로 맞춰 hydration mismatch 도 피한다.
 */
export const useIsFavoritesReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (useFavoriteStore.persist.hasHydrated()) {
      setIsReady(true);
      return;
    }

    return useFavoriteStore.persist.onFinishHydration(() => setIsReady(true));
  }, []);

  return isReady;
};
