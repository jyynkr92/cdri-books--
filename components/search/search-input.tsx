'use client';

import { useRef, useState } from 'react';
import { SearchIcon } from '@/components/icon/search-icon';
import { SearchHistoryList } from '@/components/search/search-history-list';
import { SEARCH_INPUT_PLACEHOLDER } from '@/constants/search';
import { useDismiss } from '@/hooks/use-dismiss';
import { useSearchHistory } from '@/hooks/use-search-history';
import { cn } from '@/lib/cn';

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

  // 바깥 클릭과 Escape 는 공통 훅에 맡긴다.
  useDismiss({
    isEnabled: isPopoverOpen,
    ref: wrapperRef,
    onPointerOutside: () => setIsHistoryOpen(false),
    onEscape: () => {
      setIsHistoryOpen(false);
      inputRef.current?.focus();
    },
  });

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    addHistory(trimmed);
    setKeyword(trimmed);
    // blur 가 handleBlur 를 거쳐 기록을 닫는다. 다시 focus 하면 열린다.
    inputRef.current?.blur();
    onSearch(trimmed);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    // 한글 등 IME 조합 중의 Enter 는 조합을 확정하는 키다.
    // 여기서 검색까지 실행하면 확정 후 keydown 이 한 번 더 와 두 번 검색된다.
    // keyCode 229 는 isComposing 을 제공하지 않는 브라우저용 보조 판정이다.
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) {
      return;
    }

    event.preventDefault();
    runSearch(keyword);
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
    <div ref={wrapperRef} className="relative w-full max-w-120">
      <div
        className={cn(
          'bg-palette-light-gray w-full rounded-2xl p-2.5',
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
        />
      )}
    </div>
  );
};
