import { PageTitle } from '@/components/common/page-title';
import { ResultCount } from '@/components/common/result-count';
import { PageContainer } from '@/components/layout/page-container';

const FavoritesPage = () => {
  return (
    <main>
      <PageContainer className="pt-26 pb-20">
        <PageTitle>내가 찜한 책</PageTitle>
        {/* TODO(#9): 찜한 책 목록과 실제 개수를 연결한다. */}
        <div className="mt-8.75">
          <ResultCount label="찜한 책" count={0} />
        </div>
      </PageContainer>
    </main>
  );
};

export default FavoritesPage;
