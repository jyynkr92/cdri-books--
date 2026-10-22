import { BookListItem } from '@/components/book/book-list-item';
import type { Book } from '@/types/book';

interface Props {
  books: readonly Book[];
}

export const BookList = ({ books }: Props) => {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
