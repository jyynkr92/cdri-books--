# certicos Books

카카오 책 검색 API 기반 도서 검색 서비스입니다.

도서를 검색하고, 상세 정보를 펼쳐 보고, 관심 있는 책을 찜해 따로 모아볼 수 있습니다.

## 주요 기능

| 기능      | 설명                                                     |
| --------- | -------------------------------------------------------- |
| 도서 검색 | 카카오 책 검색 API 연동, 페이지당 10개 무한 스크롤       |
| 검색 기록 | 최근 8개 저장, 브라우저 재시작 후에도 유지               |
| 상세 검색 | 제목 / 저자명 / 출판사 조건 검색 (전체 검색과 상호 배타) |
| 상세 보기 | 리스트 항목이 아코디언으로 펼쳐지며 구성이 전환          |
| 찜하기    | 찜한 시점의 데이터를 보관, 재시작 후에도 유지            |

---

## 실행 방법

### 요구 환경

- Node.js 22 이상
- npm 10 이상 (`packageManager` 로 고정)

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수

`.env.example` 을 복사해 `.env` 를 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

| 변수                 | 설명                           |
| -------------------- | ------------------------------ |
| `KAKAO_REST_API_KEY` | 카카오 REST API 요청을 위한 키 |

> 이 키는 **서버에서만** 읽습니다. `NEXT_PUBLIC_` 접두어를 붙이지 않습니다.

### 3. 개발 서버

```bash
npm run dev    # http://localhost:3000
```

### 스크립트

| 명령어              | 설명                                     |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | 개발 서버                                |
| `npm run build`     | 프로덕션 빌드                            |
| `npm run check`     | Biome 검사 (lint + format + import 정렬) |
| `npm run check:fix` | Biome 자동 수정                          |
| `npm run typecheck` | 라우트 타입 생성 + `tsc --noEmit`        |

---

## 기술 스택과 선택 이유

| 영역        | 선택                            | 이유                                                                                                                                             |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 프레임워크  | **Next.js 16** (App Router)     | API 키를 서버에만 두기 위해 Route Handler 가 필요했습니다. 클라이언트에서 카카오 API 를 직접 호출하면 키가 노출됩니다                            |
| 언어        | **TypeScript**                  | 외부 API 응답과 화면 모델을 타입으로 분리해, 변환 지점을 컴파일 단계에서 강제합니다                                                              |
| 서버 상태   | **TanStack Query v5**           | 무한 스크롤(`useInfiniteQuery`), 캐싱, 로딩·에러 상태를 한 번에 해결합니다. 직접 구현하면 페이지 병합·중복 요청·캐시 무효화를 모두 다뤄야 합니다 |
| 전역 상태   | **Zustand + persist**           | 전역이 필요한 건 찜 목록뿐이고, `persist` 미들웨어가 localStorage 저장·복원·탭 동기화를 대신합니다                                               |
| 스타일링    | **Tailwind CSS v4** (CSS-first) | 아래 설명                                                                                                                                        |
| UI 컴포넌트 | **shadcn/ui + Radix**           | 드롭다운의 키보드 조작·포커스 트랩·ARIA 를 직접 만들면 놓치기 쉽습니다. 코드를 복사해 오는 방식이라 디자인 커스터마이징이 자유롭습니다           |
| 린트·포맷   | **Biome**                       | ESLint + Prettier 두 도구를 하나로 합쳐 설정 파일이 `biome.json` 하나입니다. Rust 기반이라 빠릅니다                                              |

### 스타일링에 CSS-in-JS 대신 Tailwind 를 쓴 이유

**1. 런타임 비용이 없습니다.** emotion·styled-components 같은 CSS-in-JS 는 브라우저에서 스타일 객체를 직렬화하고 `<style>` 태그를 주입합니다. Tailwind 는 빌드 시점에 CSS 파일 하나로 끝나 런타임에 하는 일이 없습니다.

**2. App Router 의 서버 컴포넌트와 잘 맞습니다.** 대부분의 CSS-in-JS 라이브러리는 React Context 에 의존해 `'use client'` 경계를 요구합니다. 스타일을 쓰려고 서버 컴포넌트를 클라이언트로 내려야 하는 구조가 됩니다. Tailwind 는 클래스 문자열이라 서버 컴포넌트에서 그대로 쓸 수 있습니다.

**3. 디자인 토큰을 CSS 변수 한 곳에서 관리합니다.** Tailwind v4 는 `@theme` 블록에 CSS 변수로 토큰을 정의하고, 그 값이 곧 유틸리티가 됩니다. JS 테마 객체를 거치지 않아 **값이 있는 곳과 쓰이는 곳이 하나**입니다.

```css
/* app/globals.css — 이 한 줄이 text-title-1 유틸리티가 된다 */
--text-title-1: 24px;
--text-title-1--line-height: 24px;
--text-title-1--font-weight: 700;
```

**4. 스타일이 마크업 옆에 있습니다.** 컴포넌트를 읽을 때 별도 파일이나 `styled` 선언을 오가지 않아도 됩니다.

---

## 폴더 구조

```
app/
  (book)/            도서 검색 / 찜한 책 페이지
  api/books/search/  카카오 API 프록시 (키를 서버에만 보관)
  globals.css        디자인 토큰 전체 (@theme)
components/
  book/              도서 리스트·상세·찜하기
  search/            검색 input·기록·상세검색
  ui/                shadcn/ui 컴포넌트
  icon/              SVG 아이콘 컴포넌트
  common/            페이지 타이틀·결과 개수·스켈레톤
  layout/            헤더·페이지 컨테이너
hooks/               use-book-search, use-favorites, use-collapsible 등
store/               Zustand store
lib/                 cn 설정, 도메인 유틸 (lib/book/)
api/                 API 호출 함수
types/               타입 정의
constants/           상수
```

### 주요 코드

**`app/api/books/search/route.ts`** — 카카오 API 프록시

키를 서버에만 두고, 응답 형식을 검증한 뒤 화면용 모델로 변환합니다. 상류 장애는 502 로 정규화해 내부 사정(키 오류 등)이 상태 코드로 노출되지 않게 했습니다.

**`hooks/use-book-search.ts`** — 무한 스크롤

`useInfiniteQuery` 의 반환 객체를 **spread 하지 않고** 필요한 필드만 꺼내 씁니다. spread 하면 TanStack Query v5 의 tracked properties 최적화가 무력화돼 불필요한 리렌더가 쌓입니다.

**`hooks/use-favorites.ts`** — 선택자 분리

`useIsFavorite(id)` 는 boolean 만 구독합니다. 다른 책을 찜해도 이 컴포넌트는 리렌더되지 않습니다.

**`lib/cn.ts`** — tailwind-merge 설정

커스텀 폰트 토큰을 font-size 그룹으로 등록합니다. 등록하지 않으면 tailwind-merge 가 `text-caption` 같은 토큰을 **색상 클래스로 오인해 `text-palette-white` 를 조용히 지웁니다.**

---

## 강조하고 싶은 부분

### 1. API 키를 클라이언트에 노출하지 않음

Route Handler 를 프록시로 두어 `KAKAO_REST_API_KEY` 가 번들에 들어가지 않습니다. 응답 형식 검증, 네트워크 실패 처리, 상류 에러 502 정규화까지 서버에서 끝냅니다.

### 2. 접근성을 기능과 함께 구현

- 아코디언: 접힌 영역에 `inert` 를 적용해 키보드·스크린리더에서 제외하고, 토글 시 **드러난 쪽 버튼으로 포커스를 이동**합니다 (안 하면 포커스가 `<body>` 로 떨어집니다)
- 검색 기록: `relatedTarget` 을 검사해 Tab 으로 목록에 진입할 수 있습니다
- 모든 애니메이션이 `prefers-reduced-motion` 을 따릅니다

### 3. 디자인 토큰 단일 소스

`globals.css` 의 `@theme` 한 곳에서 타이포·색상·그림자를 정의하고, 화면에서는 임의값 없이 토큰 유틸리티만 씁니다.

### 4. CI 와 문서로 규칙을 강제

- `main` 직접 push 를 GitHub ruleset 으로 차단, PR + CI 통과만 머지 가능
- CI: Biome check / 타입 검사 / 빌드 / `npm audit`
- 코딩 규칙을 [CLAUDE.md](./CLAUDE.md) 한 파일로 관리

---

## 코딩 규칙

[CLAUDE.md](./CLAUDE.md) 에 정리되어 있습니다.
