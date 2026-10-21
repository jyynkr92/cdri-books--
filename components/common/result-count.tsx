interface Props {
  label: string;
  count: number;
}

export const ResultCount = ({ label, count }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-title-2 text-palette-black">{label}</h2>
      <p className="text-count text-palette-black">
        총{' '}
        <span className="text-palette-primary">
          {count.toLocaleString('ko-KR')}
        </span>
        건
      </p>
    </div>
  );
};
