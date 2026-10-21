'use client';

import { BookEmpty } from '@/components/book/book-empty';
import { BookList } from '@/components/book/book-list';
import { BookListSkeleton } from '@/components/book/book-list-skeleton';
import { ResultCount } from '@/components/common/result-count';
import { FAVORITE_BOOKS_EMPTY_MESSAGE } from '@/constants/book';
import { useFavorites, useIsFavoritesReady } from '@/hooks/use-favorites';

export const FavoriteBookSection = () => {
  const { favoriteBooks } = useFavorites();
  const isReady = useIsFavoritesReady();

  const hasBooks = favoriteBooks.length > 0;

  return (
    <section aria-label="내가 찜한 책">
      <div className="mt-8.75">
        <ResultCount
          label="찜한 책"
          count={favoriteBooks.length}
          isLoading={!isReady}
        />
      </div>

      {/*
        서버 스냅샷은 항상 빈 목록이다. 준비되기 전에 빈 상태를 그리면
        찜한 책이 있는 사용자에게 "없습니다" 가 잠깐 보였다가 사라진다.
      */}
      <div className="mt-9" aria-busy={!isReady}>
        {!isReady && <BookListSkeleton count={3} />}

        {isReady && !hasBooks && (
          <BookEmpty message={FAVORITE_BOOKS_EMPTY_MESSAGE} />
        )}

        {hasBooks && <BookList books={favoriteBooks} />}
      </div>
    </section>
  );
};
