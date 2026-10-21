import { Skeleton } from '@/components/common/skeleton';
import { BOOK_SEARCH_PAGE_SIZE } from '@/constants/book';

interface Props {
  /** 그릴 자리 수. 기본값은 한 페이지 분량이다. */
  count?: number;
}

// 실제 리스트 아이템과 같은 자리를 차지해 레이아웃이 튀지 않게 한다.
const BookListItemSkeleton = () => {
  return (
    <li className="border-palette-line border-b">
      <div className="flex gap-6 p-4 xl:items-center xl:gap-0 xl:pr-4 xl:pl-12">
        <Skeleton className="h-17 w-12 shrink-0" />

        <div className="flex min-w-0 flex-1 flex-col gap-3 xl:flex-row xl:items-center xl:gap-0">
          <Skeleton className="h-4.5 w-full max-w-100 xl:ml-12 xl:flex-1" />
          <Skeleton className="h-3.5 w-24 xl:ml-4 xl:shrink-0" />
          <Skeleton className="h-4.5 w-20 xl:ml-5.5 xl:shrink-0" />

          <div className="flex items-center gap-2 xl:ml-14">
            <Skeleton className="h-11.5 w-25" />
            <Skeleton className="h-11.5 w-25" />
          </div>
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
