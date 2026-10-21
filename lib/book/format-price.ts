/** 가격을 `16,000원` 형태로 표기한다. */
export const formatPrice = (price: number) =>
  `${price.toLocaleString('ko-KR')}원`;
