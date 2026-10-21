'use client';

import { useRef, useState } from 'react';
import { DetailSearchPopover } from '@/components/search/detail-search-popover';
import { useDismiss } from '@/hooks/use-dismiss';
import type { BookSearchTarget } from '@/types/book';

interface Props {
  onSubmit: (target: BookSearchTarget, keyword: string) => void;
}

export const DetailSearchButton = ({ onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // 트리거 버튼까지 포함해야 버튼 클릭이 "바깥 클릭" 으로 잡히지 않는다.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeAndRestoreFocus = () => {
    if (!isOpen) return;

    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useDismiss({
    ref: wrapperRef,
    // 바깥을 클릭했으면 그쪽에 포커스가 가야 하므로 되돌리지 않는다.
    onPointerOutside: () => setIsOpen(false),
    onEscape: closeAndRestoreFocus,
  });

  const handleSubmit = (target: BookSearchTarget, keyword: string) => {
    onSubmit(target, keyword);
    closeAndRestoreFocus();
  };

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-palette-gray text-text-secondary text-caption focus-visible:outline-palette-primary cursor-pointer rounded-lg border px-4 py-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        상세검색
      </button>

      {isOpen && (
        <DetailSearchPopover
          onClose={closeAndRestoreFocus}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
