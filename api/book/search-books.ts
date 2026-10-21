import { API_ERROR_MESSAGE } from '@/constants/api-error-message';
import { BOOK_SEARCH_API_PATH } from '@/constants/book';
import type { BookSearchParams, BookSearchResult } from '@/types/book';

export const searchBooks = async ({
  query,
  page,
  target,
}: BookSearchParams): Promise<BookSearchResult> => {
  const params = new URLSearchParams({ query, page: String(page) });
  if (target) params.set('target', target);

  const response = await fetch(`${BOOK_SEARCH_API_PATH}?${params.toString()}`);

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      body !== null &&
      typeof body === 'object' &&
      'message' in body &&
      typeof body.message === 'string'
        ? body.message
        : API_ERROR_MESSAGE.INTERNAL_SERVER_ERROR;

    throw new Error(message);
  }

  return response.json();
};
