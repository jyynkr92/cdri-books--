import { BookLikeButton } from '@/components/book/book-like-button';
import { BookPrice } from '@/components/book/book-price';
import { BookThumbnail } from '@/components/book/book-thumbnail';
import { Button } from '@/components/ui/button';
import { formatAuthors } from '@/lib/book/format-authors';
import type { Book } from '@/types/book';

interface Props {
  book: Book;
  /** 우상단 상세보기 토글 버튼. 접힘 상태에서는 요약 행 쪽 버튼이 쓰인다. */
  toggleButton: React.ReactNode;
}

export const BookDetailPanel = ({ book, toggleButton }: Props) => {
  return (
    <div className="flex gap-8 pt-6 pr-4 pb-10 pl-13.5">
      <div className="relative shrink-0 self-start">
        <BookThumbnail
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          width={210}
          height={280}
        />
        <BookLikeButton
          book={book}
          iconClassName="size-6"
          className="absolute top-2 right-2"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-detail-title text-text-primary">{book.title}</h3>
          <p className="text-detail-author text-text-subtitle">
            {formatAuthors(book.authors)}
          </p>
        </div>

        {book.contents && (
          <div>
            <h4 className="text-detail-section text-text-primary">책 소개</h4>
            <p className="text-detail-body text-text-primary mt-3 whitespace-pre-line">
              {book.contents}
            </p>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-10">
        {toggleButton}

        <div className="flex flex-col items-end gap-7">
          <BookPrice price={book.price} salePrice={book.salePrice} />
          <Button asChild variant="action" size="action" className="w-60">
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              구매하기
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
