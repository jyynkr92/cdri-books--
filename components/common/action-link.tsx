import {
  type ActionVariant,
  actionButton,
} from '@/components/common/action-button';
import { cn } from '@/lib/utils';

interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ActionVariant {
  href: string;
}

/**
 * 새 탭으로 여는 외부 링크. window.open 대신 앵커를 써서
 * 가운데 클릭 / 새 창에서 열기 / 스크린리더 링크 인식이 모두 동작한다.
 */
export const ActionLink = ({ variant, className, ...props }: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(actionButton({ variant }), className)}
      {...props}
    />
  );
};
