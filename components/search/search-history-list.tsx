import { CloseIcon } from '@/components/icon/close-icon';

interface Props {
  history: string[];
  onSelect: (keyword: string) => void;
  onRemove: (keyword: string) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
}

// 마우스로 눌러도 input 의 포커스를 잃지 않게 해 popover 가 먼저 닫히는 것을 막는다.
const keepFocus = (event: React.MouseEvent) => event.preventDefault();

export const SearchHistoryList = ({
  history,
  onSelect,
  onRemove,
  onBlur,
}: Props) => {
  if (history.length === 0) return null;

  return (
    <div
      // 아래 요소를 밀어내지 않도록 떠 있게 한다.
      className="bg-palette-light-gray shadow-popover motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 absolute inset-x-0 top-full z-20 rounded-b-2xl px-2.5 pb-2.5 motion-safe:duration-150"
    >
      <ul aria-label="최근 검색어" className="flex flex-col gap-4">
        {history.map((keyword) => (
          <li key={keyword} className="flex items-center gap-4">
            <button
              type="button"
              onMouseDown={keepFocus}
              onClick={() => onSelect(keyword)}
              onBlur={onBlur}
              className="text-body-2 text-text-subtitle focus-visible:outline-palette-primary flex-1 cursor-pointer truncate py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {keyword}
            </button>
            <button
              type="button"
              aria-label={`검색 기록 ${keyword} 삭제`}
              onMouseDown={keepFocus}
              onClick={() => onRemove(keyword)}
              onBlur={onBlur}
              className="focus-visible:outline-palette-primary shrink-0 cursor-pointer rounded-xs p-1 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <CloseIcon className="text-text-subtitle size-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
