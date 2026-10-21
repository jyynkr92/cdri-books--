import { decodeHtmlEntities } from '@/lib/book/decode-html-entities';
import type {
  Book,
  BookSearchResult,
  KakaoBookDocument,
  KakaoBookSearchResponse,
} from '@/types/book';

const toBook = (document: KakaoBookDocument): Book => {
  // 카카오는 할인이 없을 때 sale_price 를 -1 로 내려준다.
  const hasSalePrice =
    typeof document.sale_price === 'number' && document.sale_price > 0;

  return {
    id: document.isbn || document.url,
    title: decodeHtmlEntities(document.title ?? ''),
    contents: decodeHtmlEntities(document.contents ?? ''),
    url: document.url,
    isbn: document.isbn,
    authors: Array.isArray(document.authors) ? document.authors : [],
    publisher: document.publisher,
    thumbnail: document.thumbnail,
    price: document.price,
    salePrice: hasSalePrice ? document.sale_price : null,
  };
};

/** 외부 응답을 신뢰하지 않고 필요한 모양인지 먼저 확인한다. */
export const isKakaoBookSearchResponse = (
  value: unknown,
): value is KakaoBookSearchResponse => {
  if (value === null || typeof value !== 'object') return false;

  const { meta, documents } = value as Record<string, unknown>;

  return (
    Array.isArray(documents) &&
    meta !== null &&
    typeof meta === 'object' &&
    typeof (meta as Record<string, unknown>).total_count === 'number'
  );
};

export const toBookSearchResult = (
  response: KakaoBookSearchResponse,
): BookSearchResult => ({
  books: response.documents.map(toBook),
  totalCount: response.meta.total_count,
  isEnd: Boolean(response.meta.is_end),
});
