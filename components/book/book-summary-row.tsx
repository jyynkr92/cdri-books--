import { BookLikeButton } from '@/components/book/book-like-button';
import { BookThumbnail } from '@/components/book/book-thumbnail';
import { Button } from '@/components/ui/button';
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
    <div className="flex items-center gap-4 py-4 pr-4 pl-12">
      <div className="relative shrink-0">
        <BookThumbnail
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          width={48}
          height={68}
        />
        <BookLikeButton book={book} className="absolute top-0 right-0" />
      </div>

      <h3 className="text-title-3 text-text-primary min-w-0 truncate">
        {book.title}
      </h3>

      <p className="text-body-2 text-text-secondary min-w-0 truncate">
        {formatAuthors(book.authors)}
      </p>

      {/* 남는 공간을 흡수해 가격과 버튼을 오른쪽 끝으로 민다. */}
      <p className="text-title-3 text-text-primary ml-auto shrink-0">
        {formatPrice(displayPrice)}
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <Button asChild variant="action" size="action">
          <a href={book.url} target="_blank" rel="noopener noreferrer">
            구매하기
          </a>
        </Button>
        {toggleButton}
      </div>
    </div>
  );
};
