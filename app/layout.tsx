import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import { QueryProvider } from '@/components/providers/query-provider';

import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'certicos Books',
  description: '카카오 책 검색 기반 도서 검색 서비스',
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    // 일부 브라우저 확장이 <html> 에 속성을 주입해 hydration 경고가 난다.
    // 우리 렌더 결과와 무관하므로 이 요소에 한해 경고를 억제한다.
    <html lang="ko" className={notoSansKr.variable} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <SiteHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
