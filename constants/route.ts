import { BOOK_LABEL } from '@/constants/book';

export const ROUTE = {
  SEARCH: '/',
  FAVORITES: '/favorites',
} as const;

export type RoutePath = (typeof ROUTE)[keyof typeof ROUTE];

export const HEADER_MENU = [
  { href: ROUTE.SEARCH, label: BOOK_LABEL.SEARCH },
  { href: ROUTE.FAVORITES, label: BOOK_LABEL.FAVORITES },
] as const satisfies readonly { href: RoutePath; label: string }[];
