import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { PageContainer } from '@/components/layout/page-container';
import { BookSearchSection } from '@/components/search/book-search-section';
import { BOOK_LABEL } from '@/constants/book';

const SearchPage = () => {
  return (
    <main>
      <PageContainer className="pt-26 pb-20">
        <PageTitle>{BOOK_LABEL.SEARCH}</PageTitle>
        {/* useSearchParams 를 쓰므로 정적 렌더링을 위해 경계를 둔다. */}
        <Suspense>
          <BookSearchSection />
        </Suspense>
      </PageContainer>
    </main>
  );
};

export default SearchPage;
