import { type NextRequest, NextResponse } from 'next/server';
import { API_ERROR_MESSAGE } from '@/constants/api-error-message';
import {
  BOOK_SEARCH_MAX_PAGE,
  BOOK_SEARCH_PAGE_SIZE,
  KAKAO_BOOK_SEARCH_URL,
} from '@/constants/book';
import { isBookSearchTarget } from '@/lib/book/is-book-search-target';
import {
  isKakaoBookSearchResponse,
  toBookSearchResult,
} from '@/lib/book/to-book-search-result';

const parsePage = (raw: string | null) => {
  const page = Number(raw ?? 1);
  if (!Number.isInteger(page) || page < 1) return 1;

  return Math.min(page, BOOK_SEARCH_MAX_PAGE);
};

/**
 * 카카오의 상태 코드를 그대로 내보내면 내부 사정(키 오류 등)이 노출되고
 * 브라우저가 인증 UI 를 띄울 수 있어, 상류 장애는 502 로 정규화한다.
 */
const toUpstreamError = (status: number) => {
  if (status === 401 || status === 403) {
    return { message: API_ERROR_MESSAGE.UNAUTHORIZED, status: 502 };
  }

  if (status === 429) {
    return { message: API_ERROR_MESSAGE.TOO_MANY_REQUESTS, status: 429 };
  }

  return { message: API_ERROR_MESSAGE.INTERNAL_SERVER_ERROR, status: 502 };
};

export const GET = async (request: NextRequest) => {
  const apiKey = process.env.KAKAO_REST_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: API_ERROR_MESSAGE.INTERNAL_SERVER_ERROR },
      { status: 500 },
    );
  }

  const { searchParams } = request.nextUrl;
  const query = searchParams.get('query')?.trim();

  if (!query) {
    return NextResponse.json(
      { message: API_ERROR_MESSAGE.BAD_REQUEST },
      { status: 400 },
    );
  }

  const target = searchParams.get('target');
  const kakaoParams = new URLSearchParams({
    query,
    page: String(parsePage(searchParams.get('page'))),
    size: String(BOOK_SEARCH_PAGE_SIZE),
  });

  if (target && isBookSearchTarget(target)) kakaoParams.set('target', target);

  let response: Response;

  try {
    response = await fetch(
      `${KAKAO_BOOK_SEARCH_URL}?${kakaoParams.toString()}`,
      {
        headers: { Authorization: `KakaoAK ${apiKey}` },
        // 같은 검색어는 잠시 캐시해 중복 호출을 줄인다.
        next: { revalidate: 60 },
      },
    );
  } catch {
    return NextResponse.json(
      { message: API_ERROR_MESSAGE.NETWORK },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const { message, status } = toUpstreamError(response.status);

    return NextResponse.json({ message }, { status });
  }

  const data: unknown = await response.json().catch(() => null);

  if (!isKakaoBookSearchResponse(data)) {
    return NextResponse.json(
      { message: API_ERROR_MESSAGE.INTERNAL_SERVER_ERROR },
      { status: 502 },
    );
  }

  return NextResponse.json(toBookSearchResult(data));
};
