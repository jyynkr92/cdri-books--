'use client';

import { BookLikeButton } from '@/components/book/book-like-button';
import { BookThumbnail } from '@/components/book/book-thumbnail';
import { ActionLink } from '@/components/common/action-link';
import { formatAuthors } from '@/lib/book/format-authors';
import { formatPrice } from '@/lib/book/format-price';
import type { Book } from '@/types/book';

interface Props {
  book: Book;
  /** 우측 끝 상세보기 토글 버튼 */
  toggleButton: React.ReactNode;
}

export const BookSummaryRow = ({ book, toggleButton }: Props) => {
  const displayPrice = book.salePrice ?? book.price;

  return (
    <div className="flex gap-4 p-4 lg:items-center lg:gap-0 lg:pr-4 lg:pl-12">
      <div className="relative shrink-0">
        <BookThumbnail
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          width={48}
          height={68}
        />
        <BookLikeButton book={book} className="absolute top-0 right-0" />
      </div>

      {/* 좁은 화면에서는 세로로 쌓고, lg 부터 한 줄로 편다. */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-0">
        <div className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-12 lg:flex-row lg:items-center lg:gap-4">
          <h3 className="text-title-3 text-text-primary min-w-0 flex-1 truncate">
            {book.title}
          </h3>
          <p className="text-body-2 text-text-secondary truncate lg:shrink-0">
            {formatAuthors(book.authors)}
          </p>
        </div>

        <div className="flex items-center gap-4 lg:ml-4">
          <p className="text-title-3 text-text-primary shrink-0">
            {formatPrice(displayPrice)}
          </p>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <ActionLink href={book.url}>구매하기</ActionLink>
            {toggleButton}
          </div>
        </div>
      </div>
    </div>
  );
};
