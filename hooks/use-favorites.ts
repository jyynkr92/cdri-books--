'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { FAVORITE_BOOKS_STORAGE_KEY } from '@/constants/book';
import type { Book } from '@/types/book';

type FavoriteStore = {
  books: readonly Book[];
  /** id 조회를 O(1) 로 하기 위한 보조 집합 */
  ids: ReadonlySet<string>;
};

const EMPTY_STORE: FavoriteStore = Object.freeze({
  books: Object.freeze([]),
  ids: new Set<string>(),
});

let store: FavoriteStore = EMPTY_STORE;
let isHydrated = false;
/** 마지막 쓰기가 실패했는지. 용량 초과 등으로 저장되지 않은 상태를 알린다. */
let hasStorageError = false;
const listeners = new Set<() => void>();

const isBook = (value: unknown): value is Book => {
  if (value === null || typeof value !== 'object') return false;

  const book = value as Record<string, unknown>;

  return typeof book.id === 'string' && typeof book.title === 'string';
};

const toStore = (books: readonly Book[]): FavoriteStore => ({
  books,
  ids: new Set(books.map((book) => book.id)),
});

const read = (): FavoriteStore => {
  try {
    const raw = window.localStorage.getItem(FAVORITE_BOOKS_STORAGE_KEY);
    if (!raw) return EMPTY_STORE;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_STORE;

    return toStore(parsed.filter(isBook));
  } catch {
    return EMPTY_STORE;
  }
};

const write = (books: readonly Book[]) => {
  try {
    window.localStorage.setItem(
      FAVORITE_BOOKS_STORAGE_KEY,
      JSON.stringify(books),
    );

    return true;
  } catch {
    // 용량 초과나 스토리지 차단. 이번 세션 동안은 화면 동작을 유지한다.
    return false;
  }
};

const emit = () => {
  for (const listener of listeners) listener();
};

const setBooks = (books: readonly Book[]) => {
  store = toStore(books);
  hasStorageError = !write(books);
  emit();
};

// 탭 간 동기화 리스너는 store 당 하나만 둔다.
const handleStorage = (event: StorageEvent) => {
  if (event.key !== FAVORITE_BOOKS_STORAGE_KEY) return;

  store = read();
  emit();
};

const subscribe = (listener: () => void) => {
  if (!isHydrated) {
    isHydrated = true;
    store = read();
  }

  if (listeners.size === 0) {
    window.addEventListener('storage', handleStorage);
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorage);
    }
  };
};

const getSnapshot = () => store;
// 서버에서는 항상 빈 목록으로 그려 hydration mismatch 를 피한다.
const getServerSnapshot = () => EMPTY_STORE;

const toggleFavorite = (book: Book) => {
  if (store.ids.has(book.id)) {
    setBooks(store.books.filter((item) => item.id !== book.id));
    return;
  }

  // 찜한 시점의 데이터를 그대로 보관한다. (API 결과와 달라질 수 있음)
  setBooks([book, ...store.books]);
};

/**
 * 한 권의 찜 여부만 구독한다. snapshot 이 boolean 이라
 * 다른 책을 토글해도 이 컴포넌트는 리렌더되지 않는다.
 */
export const useIsFavorite = (id: string) =>
  useSyncExternalStore(
    subscribe,
    () => store.ids.has(id),
    () => false,
  );

/**
 * 클라이언트에서 store 를 읽을 준비가 되었는지.
 * 서버 렌더 결과(빈 목록)를 빈 상태 UI 로 잘못 그리는 것을 막는다.
 */
export const useIsFavoritesReady = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

/** 찜한 책 목록 전체. 목록 화면에서 사용한다. */
export const useFavorites = () => {
  const { books } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isFavorite = useCallback((id: string) => store.ids.has(id), []);

  return {
    favoriteBooks: books,
    isFavorite,
    toggleFavorite,
    hasStorageError,
  };
};

export { toggleFavorite };
