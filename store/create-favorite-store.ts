'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FAVORITE_BOOKS_STORAGE_KEY } from '@/constants/book';
import type { Book } from '@/types/book';

type FavoriteState = {
  books: Book[];
};

type FavoriteActions = {
  toggleFavorite: (book: Book) => void;
};

const isBook = (value: unknown): value is Book => {
  if (value === null || typeof value !== 'object') return false;

  const book = value as Record<string, unknown>;

  return typeof book.id === 'string' && typeof book.title === 'string';
};

/**
 * persist 는 { state, version } 래퍼로 저장한다.
 * 같은 키에 평면 배열을 저장하던 이전 버전의 데이터도 읽어 찜 목록이 유실되지 않게 한다.
 */
const storage = createJSONStorage<FavoriteState>(() => localStorage, {
  reviver: (_key, value) => value,
  replacer: (_key, value) => value,
});

const migratingStorage: typeof storage = storage && {
  ...storage,
  getItem: (name) => {
    const stored = storage.getItem(name);
    if (stored) return stored;

    // 이전 형식(평면 배열)을 한 번 읽어 올린다.
    try {
      const raw = localStorage.getItem(name);
      if (!raw) return null;

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;

      return { state: { books: parsed.filter(isBook) }, version: 0 };
    } catch {
      return null;
    }
  },
};

export const useFavoriteStore = create<FavoriteState & FavoriteActions>()(
  persist(
    (set, get) => ({
      books: [],
      toggleFavorite: (book) => {
        const { books } = get();

        if (books.some((item) => item.id === book.id)) {
          set({ books: books.filter((item) => item.id !== book.id) });
          return;
        }

        // 찜한 시점의 데이터를 그대로 보관한다. (API 결과와 달라질 수 있음)
        set({ books: [book, ...books] });
      },
    }),
    {
      name: FAVORITE_BOOKS_STORAGE_KEY,
      storage: migratingStorage,
      // 액션은 저장할 필요가 없다.
      partialize: (state) => ({ books: state.books }),
      // 손상된 저장값이 들어와도 화면이 깨지지 않게 거른다.
      merge: (persisted, current) => {
        const books =
          persisted !== null &&
          typeof persisted === 'object' &&
          Array.isArray((persisted as FavoriteState).books)
            ? (persisted as FavoriteState).books.filter(isBook)
            : [];

        return { ...current, books };
      },
    },
  ),
);
