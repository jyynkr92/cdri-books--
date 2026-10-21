import Image from 'next/image';
import { BOOK_SEARCH_EMPTY_MESSAGE } from '@/constants/book';

export const BookEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <Image
        src="/images/book-empty.png"
        alt=""
        width={80}
        height={80}
        className="size-20 object-contain"
      />
      <p className="text-caption text-text-secondary">
        {BOOK_SEARCH_EMPTY_MESSAGE}
      </p>
    </div>
  );
};
