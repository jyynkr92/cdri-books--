export const ROUTE = {
  SEARCH: '/',
  FAVORITES: '/favorites',
} as const;

export type RoutePath = (typeof ROUTE)[keyof typeof ROUTE];

export const HEADER_MENU = [
  { href: ROUTE.SEARCH, label: '도서 검색' },
  { href: ROUTE.FAVORITES, label: '내가 찜한 책' },
] as const satisfies readonly { href: RoutePath; label: string }[];
