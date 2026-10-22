'use client';

import { LikeIcon } from '@/components/icon/like-icon';
import { toggleFavorite, useIsFavorite } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import type { Book } from '@/types/book';

interface Props {
  book: Book;
  /** 아이콘 크기 클래스. 목록은 16px, 상세는 24px 를 쓴다. */
  iconClassName?: string;
  className?: string;
}

export const BookLikeButton = ({
  book,
  iconClassName = 'size-4',
  className,
}: Props) => {
  const isLiked = useIsFavorite(book.id);

  return (
    <button
      type="button"
      aria-pressed={isLiked}
      aria-label={`${book.title} ${isLiked ? '찜 해제' : '찜하기'}`}
      onClick={() => toggleFavorite(book)}
      className={cn(
        'focus-visible:outline-palette-primary cursor-pointer rounded-xs p-1',
        'motion-safe:transition-transform motion-safe:duration-150 motion-safe:active:scale-75',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
    >
      <LikeIcon isFilled={isLiked} className={iconClassName} />
    </button>
  );
};
