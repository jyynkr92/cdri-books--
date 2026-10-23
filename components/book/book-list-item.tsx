'use client';

import { memo, useEffect, useId, useRef } from 'react';
import { BookDetailPanel } from '@/components/book/book-detail-panel';
import { BookSummaryRow } from '@/components/book/book-summary-row';
import { ChevronIcon } from '@/components/icon/chevron-icon';
import { Button } from '@/components/ui/button';
import { useCollapsible } from '@/hooks/use-collapsible';
import { cn } from '@/lib/cn';
import type { Book } from '@/types/book';

interface Props {
  book: Book;
}

/**
 * 상세 패널은 세로 패딩만 64px 라, 높이만 늘리면 한동안 빈 공간만 드러나다가
 * 내용이 뒤늦게 튀어나온다. 높이와 **같은 시간 동안** 페이드시켜 이를 덮는다.
 * duration 이 다르면 내용이 사라진 뒤에도 빈 공간이 계속 접혀 상단이 덜컹거린다.
 */
const collapsibleContent = (isVisible: boolean) =>
  cn(
    'overflow-hidden motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
    isVisible ? 'opacity-100' : 'opacity-0',
  );

const BookListItemBase = ({ book }: Props) => {
  const { isOpen, isMounted, toggle } = useCollapsible();
  const panelId = useId();

  const summaryToggleRef = useRef<HTMLButtonElement>(null);
  const panelToggleRef = useRef<HTMLButtonElement>(null);
  const hasToggledRef = useRef(false);

  // 토글하면 눌렀던 버튼이 inert 영역으로 들어가 포커스를 잃는다.
  // 새로 드러난 쪽 버튼으로 포커스를 옮겨 키보드 위치를 유지한다.
  useEffect(() => {
    if (!hasToggledRef.current) return;

    const nextButton = isOpen
      ? panelToggleRef.current
      : summaryToggleRef.current;
    nextButton?.focus();
  }, [isOpen]);

  const handleToggle = () => {
    hasToggledRef.current = true;
    toggle();
  };

  const renderToggleButton = (
    ref: React.RefObject<HTMLButtonElement | null>,
  ) => (
    <Button
      ref={ref}
      variant="action-secondary"
      size="action"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={handleToggle}
    >
      상세보기
      <ChevronIcon
        className={cn(
          'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
          isOpen && 'rotate-180',
        )}
      />
    </Button>
  );

  return (
    // 두 영역을 한 grid 의 두 행으로 두어 전환이 하나의 타임라인을 공유하게 한다.
    <li
      className={cn(
        'border-palette-line grid border-b',
        'motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out',
        isOpen ? 'collapsible-detail' : 'collapsible-summary',
      )}
    >
      {/* 접힌 영역은 inert 로 키보드 포커스와 스크린리더에서 제외한다. */}
      <div inert={isOpen} className={collapsibleContent(!isOpen)}>
        <BookSummaryRow
          book={book}
          toggleButton={renderToggleButton(summaryToggleRef)}
        />
      </div>

      <div id={panelId} inert={!isOpen} className={collapsibleContent(isOpen)}>
        {/* 한 번도 펼치지 않은 항목은 마운트하지 않는다. */}
        {isMounted && (
          <BookDetailPanel
            book={book}
            toggleButton={renderToggleButton(panelToggleRef)}
          />
        )}
      </div>
    </li>
  );
};

/**
 * 무한 스크롤로 수백 개가 쌓이는데, 부모(BookSearchSection)는 로딩 상태가 바뀔 때마다
 * 리렌더된다. book 객체는 react-query 캐시에서 오는 안정적인 참조라 memo 가 유효하다.
 */
export const BookListItem = memo(BookListItemBase);
