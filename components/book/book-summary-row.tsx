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
    <div className="flex gap-6 p-4 xl:items-center xl:gap-0 xl:pr-4 xl:pl-12">
      <div className="relative shrink-0">
        <BookThumbnail
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          width={48}
          height={68}
        />
        {/* TODO(#7): 찜하기 상태를 use-favorites 와 연결한다. */}
        <BookLikeButton
          isLiked={false}
          title={book.title}
          onToggle={() => undefined}
          className="absolute -top-1 -right-1"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 xl:flex-row xl:items-center xl:gap-0">
        <h3 className="text-title-3 text-palette-black line-clamp-2 min-w-0 flex-1 xl:ml-12 xl:max-w-240">
          {book.title}
        </h3>

        <p className="text-body-2 text-text-secondary truncate xl:ml-4 xl:shrink-0">
          {formatAuthors(book.authors)}
        </p>

        <p className="text-title-3 text-palette-black xl:ml-5.5 xl:shrink-0">
          {formatPrice(displayPrice)}
        </p>

        <div className="flex items-center gap-2 xl:ml-14">
          <ActionLink href={book.url}>구매하기</ActionLink>
          {toggleButton}
        </div>
      </div>
    </div>
  );
};
