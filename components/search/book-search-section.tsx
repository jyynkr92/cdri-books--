'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ResultCount } from '@/components/common/result-count';
import { DetailSearchButton } from '@/components/search/detail-search-button';
import { SearchInput } from '@/components/search/search-input';
import { ROUTE } from '@/constants/route';
import { SEARCH_QUERY_PARAM } from '@/constants/search';

export const BookSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get(SEARCH_QUERY_PARAM) ?? '';

  // 검색어는 공유와 뒤로가기가 가능해야 하므로 URL 쿼리로 관리한다.
  const handleSearch = (next: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_QUERY_PARAM, next);
    router.replace(`${ROUTE.SEARCH}?${params.toString()}`, { scroll: false });
  };

  return (
    <section aria-label="도서 검색">
      <div className="mt-6 flex items-start gap-4">
        <SearchInput defaultKeyword={keyword} onSearch={handleSearch} />
        <DetailSearchButton />
      </div>

      <div className="mt-8.75">
        {/* TODO(#5): 카카오 책 검색 API 연동 후 실제 총 개수로 교체한다. */}
        <ResultCount label="도서 검색" count={0} />
      </div>
    </section>
  );
};
