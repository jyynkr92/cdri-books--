import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const BookThumbnail = ({
  src,
  alt,
  width,
  height,
  className,
}: Props) => {
  // 카카오 응답의 thumbnail 은 비어 있을 수 있다.
  if (!src) {
    return (
      <div
        aria-hidden="true"
        style={{ width, height }}
        className={cn('bg-palette-light-gray rounded-xs', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ width, height }}
      className={cn('rounded-xs object-cover', className)}
    />
  );
};
