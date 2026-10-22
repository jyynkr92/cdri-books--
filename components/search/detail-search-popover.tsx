'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from 'cn';
import { CloseIcon } from '@/components/icon/close-icon';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import {
  DETAIL_SEARCH_INPUT_PLACEHOLDER,
  DETAIL_SEARCH_OPTIONS,
} from '@/constants/search';
import type { BookSearchTarget } from '@/types/book';

interface Props {
  onClose: () => void;
  onSubmit: (target: BookSearchTarget, keyword: string) => void;
  /** 조건 드롭다운이 열려 있는 동안 팝오버가 닫히지 않게 알린다. */
  onSelectOpenChange: (isOpen: boolean) => void;
}

export const DetailSearchPopover = ({
  onClose,
  onSubmit,
  onSelectOpenChange,
}: Props) => {
  const [target, setTarget] = useState<BookSearchTarget>(
    DETAIL_SEARCH_OPTIONS[0].value,
  );
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
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
      ref={setContainer}
      role="dialog"
      aria-labelledby={titleId}
      className="bg-palette-white shadow-popover absolute top-full right-0 z-30 mt-2 w-[min(22.5rem,calc(100vw-2rem))] pt-2 pr-2 pb-6 pl-6"
    >
      <h2 id={titleId} className="sr-only">
        상세검색
      </h2>

      <div className="flex justify-end">
        <button
          type="button"
          aria-label="상세검색 닫기"
          onClick={onClose}
          className="focus-visible:outline-palette-primary cursor-pointer p-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <CloseIcon className="text-palette-gray size-3" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 pr-4">
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0">
            <Select
              value={target}
              options={DETAIL_SEARCH_OPTIONS}
              onValueChange={setTarget}
              onOpenChange={onSelectOpenChange}
              label="검색 조건"
              container={container}
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            required
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={DETAIL_SEARCH_INPUT_PLACEHOLDER}
            aria-label="상세검색 검색어"
            className={cn(
              'border-palette-gray text-body-2 text-text-primary w-full border-b bg-transparent py-2 outline-none',
              'placeholder:text-text-subtitle focus:border-palette-primary transition-colors duration-150',
            )}
          />
        </div>

        <Button
          type="submit"
          variant="action"
          size="action-sm"
          className="mt-4 w-full"
        >
          검색하기
        </Button>
      </form>
    </div>
  );
};
