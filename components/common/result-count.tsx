import { Skeleton } from '@/components/common/skeleton';

interface Props {
  label: string;
  count: number;
  /** 첫 검색 로딩 중이면 개수 대신 자리표시자를 보여준다. */
  isLoading?: boolean;
}

export const ResultCount = ({ label, count, isLoading = false }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-title-2 text-palette-black">{label}</h2>

      {isLoading ? (
        <Skeleton className="h-6 w-16" />
      ) : (
        <p className="text-count text-palette-black">
          총{' '}
          <span className="text-palette-primary">
            {count.toLocaleString('ko-KR')}
          </span>
          건
        </p>
      )}
    </div>
  );
};
