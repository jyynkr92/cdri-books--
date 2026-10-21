'use client';

interface Props {
  onClick?: () => void;
}

// NOTE: 팝오버 동작은 #6 에서 구현한다. 여기서는 레이아웃과 스타일만 잡는다.
export const DetailSearchButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-palette-gray text-text-secondary text-caption focus-visible:outline-palette-primary shrink-0 cursor-pointer rounded-lg border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      상세검색
    </button>
  );
};
