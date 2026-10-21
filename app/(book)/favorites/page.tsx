import { FavoriteBookSection } from '@/components/book/favorite-book-section';
import { PageTitle } from '@/components/common/page-title';
import { PageContainer } from '@/components/layout/page-container';

const FavoritesPage = () => {
  return (
    <main>
      <PageContainer className="pt-26 pb-20">
        <PageTitle>내가 찜한 책</PageTitle>
        <FavoriteBookSection />
      </PageContainer>
    </main>
  );
};

export default FavoritesPage;
