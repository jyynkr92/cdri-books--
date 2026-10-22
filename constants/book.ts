/** 한 페이지에 노출할 검색 결과 개수 */
export const BOOK_SEARCH_PAGE_SIZE = 10;

/** 카카오 책 검색 API 가 허용하는 최대 page 값 */
export const BOOK_SEARCH_MAX_PAGE = 50;

export const KAKAO_BOOK_SEARCH_URL = 'https://dapi.kakao.com/v3/search/book';

/** 내부 Route Handler 경로. 카카오 키를 서버에만 두기 위한 프록시다. */
export const BOOK_SEARCH_API_PATH = '/api/books/search';

export const BOOK_SEARCH_EMPTY_MESSAGE = '검색된 결과가 없습니다.';

/** 찜한 책 localStorage 키 */
export const FAVORITE_BOOKS_STORAGE_KEY = 'cdri-books:favorites';

export const FAVORITE_BOOKS_EMPTY_MESSAGE = '찜한 책이 없습니다.';

/** 도서 관련 화면에서 쓰는 라벨. 헤더 메뉴와 페이지 타이틀이 함께 참조한다. */
export const BOOK_LABEL = {
  SEARCH: '도서 검색',
  SEARCH_RESULT: '도서 검색 결과',
  FAVORITES: '내가 찜한 책',
  FAVORITE_RESULT: '찜한 책',
} as const;

/** TanStack Query 키. 문자열을 흩뿌리지 않도록 한곳에서 만든다. */
export const BOOK_QUERY_KEY = {
  all: ['books'] as const,
  search: (query: string, target: string | null) =>
    [...BOOK_QUERY_KEY.all, 'search', query, target] as const,
};
