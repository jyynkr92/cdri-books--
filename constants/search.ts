import type { BookSearchTarget } from '@/types/book';

/** 검색 기록 최대 보관 개수. 초과하면 오래된 것부터 지운다. */
export const SEARCH_HISTORY_MAX = 8;

/** 검색 기록 localStorage 키 */
export const SEARCH_HISTORY_STORAGE_KEY = 'cdri-books:search-history';

export const SEARCH_INPUT_PLACEHOLDER = '검색어를 입력하세요';

/** 검색어를 담는 URL 쿼리 파라미터 이름 */
export const SEARCH_QUERY_PARAM = 'q';

/** 상세검색 대상을 담는 URL 쿼리 파라미터 이름 */
export const SEARCH_TARGET_PARAM = 'target';

/** 상세검색 조건 select 옵션 */
export const DETAIL_SEARCH_OPTIONS = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
] as const satisfies readonly { value: BookSearchTarget; label: string }[];

export const DETAIL_SEARCH_INPUT_PLACEHOLDER = '검색어 입력';
