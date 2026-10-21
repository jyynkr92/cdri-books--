import Image from 'next/image';

interface Props {
  message: string;
}

export const BookEmpty = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <Image
        src="/images/book-empty.png"
        alt=""
        width={80}
        height={80}
        className="size-20 object-contain"
      />
      <p className="text-caption text-text-secondary">{message}</p>
    </div>
  );
};
