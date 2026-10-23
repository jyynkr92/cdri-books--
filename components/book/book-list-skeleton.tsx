import { Skeleton } from '@/components/common/skeleton';
import { BOOK_SEARCH_PAGE_SIZE } from '@/constants/book';

interface Props {
  /** 그릴 자리 수. 기본값은 한 페이지 분량이다. */
  count?: number;
}

// BookSummaryRow 와 같은 자리를 차지해 로딩이 끝나도 레이아웃이 튀지 않게 한다.
const BookListItemSkeleton = () => {
  return (
    <li className="border-palette-line border-b">
      <div className="flex items-center gap-4 py-4 pr-4 pl-12">
        {/* 썸네일 48x68 */}
        <Skeleton className="h-17 w-12 shrink-0" />

        {/* 제목 (title-3, 18px) */}
        <Skeleton className="h-4.5 w-60 max-w-full" />

        {/* 저자 (body-2, 14px) */}
        <Skeleton className="h-3.5 w-24 shrink-0" />

        {/* 가격 — 오른쪽 끝으로 밀린다 */}
        <Skeleton className="ml-auto h-4.5 w-20 shrink-0" />

        {/* 구매하기 / 상세보기 — height 48px */}
        <div className="flex shrink-0 items-center gap-2">
          <Skeleton className="h-12 w-25" />
          <Skeleton className="h-12 w-28" />
        </div>
      </div>
    </li>
  );
};

export const BookListSkeleton = ({ count = BOOK_SEARCH_PAGE_SIZE }: Props) => {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 자리표시자라 순서 외에 식별자가 없다
        <BookListItemSkeleton key={index} />
      ))}
    </ul>
  );
};
