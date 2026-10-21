'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SEARCH_HISTORY_MAX,
  SEARCH_HISTORY_STORAGE_KEY,
} from '@/constants/search';

const readStoredHistory = (): string[] => {
  try {
    const raw = window.localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is string => typeof item === 'string')
      .slice(0, SEARCH_HISTORY_MAX);
  } catch {
    // 파싱 실패나 스토리지 차단 시 빈 목록으로 시작한다.
    return [];
  }
};

const writeStoredHistory = (history: string[]) => {
  try {
    window.localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(history),
    );
  } catch {
    // 스토리지가 막혀 있어도 화면 동작은 유지한다.
  }
};

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  // setState updater 를 순수하게 유지하기 위해 현재 값을 ref 로도 들고 있는다.
  const historyRef = useRef<string[]>([]);

  // localStorage 는 서버에 없으므로 마운트 후에 읽어 hydration mismatch 를 피한다.
  useEffect(() => {
    const stored = readStoredHistory();
    historyRef.current = stored;
    setHistory(stored);
  }, []);

  const commit = useCallback((next: string[]) => {
    historyRef.current = next;
    writeStoredHistory(next);
    setHistory(next);
  }, []);

  const addHistory = useCallback(
    (keyword: string) => {
      const trimmed = keyword.trim();
      if (!trimmed) return;

      const deduped = historyRef.current.filter((item) => item !== trimmed);
      commit([trimmed, ...deduped].slice(0, SEARCH_HISTORY_MAX));
    },
    [commit],
  );

  const removeHistory = useCallback(
    (keyword: string) => {
      commit(historyRef.current.filter((item) => item !== keyword));
    },
    [commit],
  );

  return { history, addHistory, removeHistory };
};
