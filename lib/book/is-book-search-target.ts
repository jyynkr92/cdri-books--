import { BOOK_SEARCH_TARGET, type BookSearchTarget } from '@/types/book';

const TARGETS: BookSearchTarget[] = Object.values(BOOK_SEARCH_TARGET);

export const isBookSearchTarget = (
  value: string | null | undefined,
): value is BookSearchTarget =>
  value !== null &&
  value !== undefined &&
  TARGETS.some((target) => target === value);
