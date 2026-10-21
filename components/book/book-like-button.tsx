'use client';

import { LikeIcon } from '@/components/icon/like-icon';
import { cn } from '@/lib/utils';

interface Props {
  isLiked: boolean;
  title: string;
  onToggle: () => void;
  className?: string;
}

export const BookLikeButton = ({
  isLiked,
  title,
  onToggle,
  className,
}: Props) => {
  return (
    <button
      type="button"
      aria-pressed={isLiked}
      aria-label={`${title} ${isLiked ? '찜 해제' : '찜하기'}`}
      onClick={onToggle}
      className={cn(
        'focus-visible:outline-palette-primary cursor-pointer rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
    >
      <LikeIcon isFilled={isLiked} className="size-6" />
    </button>
  );
};
