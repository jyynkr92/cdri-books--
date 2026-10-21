/** 카카오 책 검색 API 의 검색 대상 필드 */
export const BOOK_SEARCH_TARGET = {
  TITLE: 'title',
  PERSON: 'person',
  PUBLISHER: 'publisher',
} as const;

export type BookSearchTarget =
  (typeof BOOK_SEARCH_TARGET)[keyof typeof BOOK_SEARCH_TARGET];

/** 카카오 책 검색 API 응답의 document 항목 */
export type KakaoBookDocument = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};

export type KakaoBookSearchResponse = {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoBookDocument[];
};

/** 화면에서 사용하는 도서 모델. 외부 API 응답과 분리한다. */
export type Book = {
  /** 목록 key 로 쓰는 식별자. isbn 이 비어 있을 수 있어 url 을 보조로 쓴다. */
  id: string;
  title: string;
  contents: string;
  url: string;
  isbn: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  /** 정가 */
  price: number;
  /** 판매가. 할인이 없으면 null */
  salePrice: number | null;
};

export type BookSearchResult = {
  books: Book[];
  totalCount: number;
  isEnd: boolean;
};

export type BookSearchParams = {
  query: string;
  page: number;
  target?: BookSearchTarget;
};
