import { formatPrice } from '@/lib/book/format-price';
import { cn } from '@/lib/utils';

interface Props {
  price: number;
  salePrice: number | null;
}

/** 상세 영역의 가격 표기. 할인가가 있을 때만 원가에 취소선을 긋고 할인가를 함께 보여준다. */
export const BookPrice = ({ price, salePrice }: Props) => {
  const hasSalePrice = salePrice !== null;

  return (
    <dl className="flex flex-col items-end gap-2">
      <div className="flex items-baseline gap-2">
        <dt className="text-caption text-text-secondary">원가</dt>
        <dd
          className={cn(
            'text-title-3 text-palette-black',
            hasSalePrice && 'text-text-secondary line-through',
          )}
        >
          {formatPrice(price)}
        </dd>
      </div>

      {hasSalePrice && (
        <div className="flex items-baseline gap-2">
          <dt className="text-caption text-text-secondary">할인가</dt>
          <dd className="text-title-3 text-palette-black">
            {formatPrice(salePrice)}
          </dd>
        </div>
      )}
    </dl>
  );
};
