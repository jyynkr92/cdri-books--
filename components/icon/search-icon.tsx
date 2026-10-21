import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

// NOTE: 검색 아이콘은 전달받은 에셋이 없어 디자인에 맞춰 직접 그렸다.
// 색은 text-* 토큰으로 제어한다.
export const SearchIcon = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('text-palette-black', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15.5 15.5L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
