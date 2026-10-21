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
