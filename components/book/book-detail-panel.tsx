'use client';

import { BookLikeButton } from '@/components/book/book-like-button';
import { BookPrice } from '@/components/book/book-price';
import { BookThumbnail } from '@/components/book/book-thumbnail';
import { ActionLink } from '@/components/common/action-link';
import { formatAuthors } from '@/lib/book/format-authors';
import type { Book } from '@/types/book';

interface Props {
  book: Book;
  /** 우상단 상세보기 토글 버튼. 접힘 상태에서는 요약 행 쪽 버튼이 쓰인다. */
  toggleButton: React.ReactNode;
}

export const BookDetailPanel = ({ book, toggleButton }: Props) => {
  return (
    <div className="flex flex-col gap-8 px-4 pt-6 pb-10 xl:flex-row xl:pl-13.5">
      <div className="relative shrink-0 self-start">
        <BookThumbnail
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          width={210}
          height={280}
        />
        <BookLikeButton book={book} className="absolute top-2 right-2" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-4">
          <h3 className="text-detail-title text-palette-black">{book.title}</h3>
          <p className="text-caption text-text-subtitle">
            {formatAuthors(book.authors)}
          </p>
        </div>

        {book.contents && (
          <>
            <h4 className="text-detail-section text-palette-black mt-4.5">
              책 소개
            </h4>
            <p className="text-detail-body text-palette-black mt-3 whitespace-pre-line">
              {book.contents}
            </p>
          </>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-10 xl:ml-12">
        {toggleButton}

        <div className="flex w-full flex-col items-end gap-7">
          <BookPrice price={book.price} salePrice={book.salePrice} />
          <ActionLink href={book.url} className="w-full">
            구매하기
          </ActionLink>
        </div>
      </div>
    </div>
  );
};
