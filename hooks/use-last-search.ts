'use client';

import { useSyncExternalStore } from 'react';
import { LAST_SEARCH_STORAGE_KEY } from '@/constants/search';

// 헤더는 레이아웃에 있어 페이지 이동으로 리마운트되지 않는다.
// 마운트 시 한 번만 읽으면 값이 낡으므로 구독 가능한 store 로 둔다.
let lastSearch = '';
let isHydrated = false;
const listeners = new Set<() => void>();

const read = () => {
  try {
    return window.sessionStorage.getItem(LAST_SEARCH_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
};

const subscribe = (listener: () => void) => {
  if (!isHydrated) {
    isHydrated = true;
    lastSearch = read();
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const saveLastSearch = (search: string) => {
  if (search === lastSearch) return;

  lastSearch = search;

  try {
    window.sessionStorage.setItem(LAST_SEARCH_STORAGE_KEY, search);
  } catch {
    // 스토리지가 막혀 있어도 이번 세션 동안은 동작한다.
  }

  for (const listener of listeners) listener();
};

/**
 * 마지막 검색 조건(쿼리스트링).
 * 서버 스냅샷은 빈 문자열이라 hydration mismatch 가 없다.
 */
export const useLastSearch = () =>
  useSyncExternalStore(
    subscribe,
    () => lastSearch,
    () => '',
  );
