import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// NOTE: shadcn Button 의 기본 높이/패딩과 디자인 스펙이 달라 전용 컴포넌트로 둔다.
export const actionButton = cva(
  'text-caption focus-visible:outline-palette-primary inline-flex h-12 cursor-pointer items-center justify-center gap-1.25 rounded-lg px-4 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-palette-primary text-palette-white',
        secondary: 'bg-palette-light-gray text-text-secondary',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export type ActionVariant = VariantProps<typeof actionButton>;

interface Props extends React.ComponentPropsWithRef<'button'>, ActionVariant {}

export const ActionButton = ({
  variant,
  className,
  type = 'button',
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={cn(actionButton({ variant }), className)}
      {...props}
    />
  );
};
