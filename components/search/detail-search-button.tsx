'use client';

import { useRef, useState } from 'react';
import { DetailSearchPopover } from '@/components/search/detail-search-popover';
import { Button } from '@/components/ui/button';
import { useDismiss } from '@/hooks/use-dismiss';
import type { BookSearchTarget } from '@/types/book';

interface Props {
  onSubmit: (target: BookSearchTarget, keyword: string) => void;
}

export const DetailSearchButton = ({ onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // 조건 드롭다운은 자체 dismiss 를 가지므로, 열려 있는 동안 팝오버 dismiss 를 멈춘다.
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // 트리거 버튼까지 포함해야 버튼 클릭이 "바깥 클릭" 으로 잡히지 않는다.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeAndRestoreFocus = () => {
    if (!isOpen) return;

    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useDismiss({
    isEnabled: !isSelectOpen,
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
      <Button
        ref={buttonRef}
        type="button"
        variant="action-outline"
        size="action-trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        상세검색
      </Button>

      {isOpen && (
        <DetailSearchPopover
          onClose={closeAndRestoreFocus}
          onSubmit={handleSubmit}
          onSelectOpenChange={setIsSelectOpen}
        />
      )}
    </div>
  );
};
