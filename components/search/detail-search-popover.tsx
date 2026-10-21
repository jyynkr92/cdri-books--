'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ActionButton } from '@/components/common/action-button';
import { CloseIcon } from '@/components/icon/close-icon';
import {
  DETAIL_SEARCH_INPUT_PLACEHOLDER,
  DETAIL_SEARCH_OPTIONS,
} from '@/constants/search';
import type { BookSearchTarget } from '@/types/book';

interface Props {
  onClose: () => void;
  onSubmit: (target: BookSearchTarget, keyword: string) => void;
}

const FIELD =
  'border-palette-gray focus:border-palette-primary text-caption text-palette-black w-full border-b bg-transparent py-2 outline-none';

export const DetailSearchPopover = ({ onClose, onSubmit }: Props) => {
  const [target, setTarget] = useState<BookSearchTarget>(
    DETAIL_SEARCH_OPTIONS[0].value,
  );
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // 열리면 바로 입력할 수 있도록 포커스를 옮긴다.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = keyword.trim();
    if (!trimmed) return;

    onSubmit(target, trimmed);
  };

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      className="border-palette-primary bg-palette-white absolute top-full right-0 z-10 mt-2 w-[min(22.5rem,calc(100vw-2rem))] rounded-lg border pt-2 pr-2 pb-6 pl-6 shadow-lg"
    >
      <h2 id={titleId} className="sr-only">
        상세검색
      </h2>

      <div className="flex justify-end">
        <button
          type="button"
          aria-label="상세검색 닫기"
          onClick={onClose}
          className="focus-visible:outline-palette-primary cursor-pointer rounded-xs p-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <CloseIcon className="text-palette-black size-3" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 pr-4">
        <div className="flex items-center gap-4">
          <select
            value={target}
            onChange={(event) =>
              setTarget(event.target.value as BookSearchTarget)
            }
            aria-label="검색 조건"
            className={`${FIELD} w-24 shrink-0 cursor-pointer`}
          >
            {DETAIL_SEARCH_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            ref={inputRef}
            type="text"
            required
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={DETAIL_SEARCH_INPUT_PLACEHOLDER}
            aria-label="상세검색 검색어"
            className={`${FIELD} placeholder:text-text-subtitle`}
          />
        </div>

        <ActionButton type="submit" className="mt-4 w-full">
          검색하기
        </ActionButton>
      </form>
    </div>
  );
};
