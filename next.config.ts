import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 카카오 책 검색 API 가 내려주는 썸네일 도메인
    remotePatterns: [
      { protocol: 'https', hostname: '**.kakaocdn.net' },
      { protocol: 'http', hostname: '**.kakaocdn.net' },
    ],
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
