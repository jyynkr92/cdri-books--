'use client';

import { useRef, useState } from 'react';
import { SearchIcon } from '@/components/icon/search-icon';
import { SearchHistoryList } from '@/components/search/search-history-list';
import { SEARCH_INPUT_PLACEHOLDER } from '@/constants/search';
import { useSearchHistory } from '@/hooks/use-search-history';
import { cn } from '@/lib/utils';

interface Props {
  /** 검색어 초기값. URL 쿼리에서 내려온다. */
  defaultKeyword?: string;
  /** Enter 또는 검색 기록 선택으로 검색이 실행될 때 호출된다. */
  onSearch: (keyword: string) => void;
}

export const SearchInput = ({ defaultKeyword = '', onSearch }: Props) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { history, addHistory, removeHistory } = useSearchHistory();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPopoverOpen = isHistoryOpen && history.length > 0;

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    addHistory(trimmed);
    setKeyword(trimmed);
    // blur 가 handleBlur 를 거쳐 기록을 닫는다. 다시 focus 하면 열린다.
    inputRef.current?.blur();
    setIsHistoryOpen(false);
    onSearch(trimmed);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      setIsHistoryOpen(false);
      inputRef.current?.focus();
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch(keyword);
      return;
    }

    handleKeyDown(event);
  };

  // Tab 으로 검색 기록 버튼에 들어가는 경우까지 닫히지 않도록 이동 대상을 확인한다.
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (wrapperRef.current?.contains(event.relatedTarget)) return;

    setIsHistoryOpen(false);
  };

  const handleHistorySelect = (value: string) => {
    runSearch(value);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={cn(
          'bg-palette-light-gray focus-within:ring-palette-primary/40 w-full rounded-2xl p-2.5 focus-within:ring-2',
          // 기록 목록이 바로 아래 붙으므로 아래쪽 라운드를 없애 하나로 보이게 한다.
          isPopoverOpen && 'rounded-b-none',
        )}
      >
        <div className="flex items-center gap-3">
          <SearchIcon className="size-7.5 shrink-0" />
          <input
            ref={inputRef}
            // type="search" 는 WebKit 에서 네이티브 clear 버튼을 띄워 디자인과 충돌한다.
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            onFocus={() => setIsHistoryOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleInputKeyDown}
            placeholder={SEARCH_INPUT_PLACEHOLDER}
            aria-label="도서 검색어"
            className="text-caption text-text-primary placeholder:text-text-subtitle w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {isPopoverOpen && (
        <SearchHistoryList
          history={history}
          onSelect={handleHistorySelect}
          onRemove={removeHistory}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
