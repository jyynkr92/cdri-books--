'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';
import { HEADER_MENU, ROUTE, type RoutePath } from '@/constants/route';
import { useLastSearch } from '@/hooks/use-last-search';
import { cn } from '@/lib/cn';

// 루트는 정확히 일치할 때만 active, 그 외에는 하위 경로도 active 로 본다.
const getIsActive = (pathname: string, href: RoutePath) => {
  if (href === ROUTE.SEARCH) return pathname === ROUTE.SEARCH;

  return pathname === href || pathname.startsWith(`${href}/`);
};

const focusRing =
  'focus-visible:outline-palette-primary rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4';

export const SiteHeader = () => {
  const pathname = usePathname();
  // 찜한 책에 다녀와도 직전 검색 결과로 돌아올 수 있게 메뉴에만 조건을 붙인다.
  // 로고는 통상 "처음으로" 의 의미라 깨끗한 검색 화면으로 보낸다.
  const lastSearch = useLastSearch();

  const toMenuHref = (href: RoutePath) =>
    href === ROUTE.SEARCH && lastSearch ? `${href}?${lastSearch}` : href;

  return (
    <header className="w-full">
      <PageContainer className="flex flex-col items-center gap-4 p-6 md:grid md:grid-cols-3 md:gap-6">
        <Link
          href={ROUTE.SEARCH}
          className={cn(
            'text-title-1 text-text-primary shrink-0 md:justify-self-start',
            focusRing,
          )}
        >
          CERTICOS BOOKS
        </Link>

        <nav aria-label="주요 메뉴" className="md:justify-self-center">
          <ul className="flex items-center gap-8">
            {HEADER_MENU.map(({ href, label }) => {
              const isActive = getIsActive(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={toMenuHref(href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'text-menu text-text-primary flex items-center border-b border-transparent pb-2 whitespace-nowrap',
                      focusRing,
                      isActive && 'border-palette-primary',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageContainer>
    </header>
  );
};
