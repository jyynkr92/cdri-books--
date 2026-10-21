import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-palette-light-gray rounded-sm motion-safe:animate-pulse',
        className,
      )}
    />
  );
};
