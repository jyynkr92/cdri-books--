import { FavoriteBookSection } from '@/components/book/favorite-book-section';
import { PageTitle } from '@/components/common/page-title';
import { PageContainer } from '@/components/layout/page-container';
import { BOOK_LABEL } from '@/constants/book';

const FavoritesPage = () => {
  return (
    <main>
      <PageContainer className="pt-26 pb-20">
        <PageTitle>{BOOK_LABEL.FAVORITES}</PageTitle>
        <FavoriteBookSection />
      </PageContainer>
    </main>
  );
};

export default FavoritesPage;
