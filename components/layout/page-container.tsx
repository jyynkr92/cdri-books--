import type { ReactNode } from 'react';
import { cn } from 'cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: Props) => {
  return (
    <div className={cn('max-w-page mx-auto w-full px-4 md:px-6', className)}>
      {children}
    </div>
  );
};
