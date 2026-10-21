# AI Instructions

## Tech Stack

- Next.js 16.4 (`next` 16.4.2), React 19.3 (`react` / `react-dom` ^19.3.1), TypeScript 7.0 (`typescript` ^7.0.2)
- TanStack Query v5 (`@tanstack/react-query` ^5.104) — 서버 상태
- Tailwind CSS v4 (`tailwindcss` ^4, `@tailwindcss/turbopack`) + shadcn/ui (`shadcn` ^4.22, `radix-ui`, `lucide-react`, `cn`)
- Biome ^2.6 (`@biomejs/biome`) — lint + format + import 정렬을 하나로 통합. ESLint / Prettier 를 사용하지 않는다

> **Tailwind 설정**: `tailwind.config.mjs` 파일을 생성하지 않는다. v4는 CSS-first 설정을 사용한다. 모든 토큰은 `app/globals.css`에서 정의한다.
>
> **전역 상태 라이브러리 없음**: 서버 상태는 TanStack Query, 나머지는 React 내장 상태(`useState`, `useReducer`, Context)로 처리한다. 전역 상태 라이브러리를 새로 도입하려면 사전 승인을 받는다.
>
> **다국어(i18n) 미적용**: 번역 레이어를 두지 않는다. 사용자-facing 텍스트는 한국어로 직접 작성한다.
>
> **린터/포매터는 Biome 단일**: `eslint`, `prettier` 및 그 플러그인을 설치하지 않는다. `eslint.config.*`, `.prettierrc` 를 만들지 않는다. 설정은 `biome.json` 하나다.
>
> **TypeScript 7.0 주의**: `typescript-eslint` 는 TS 7 에서 하드 throw 하므로 ESLint 기반 도구를 되돌릴 수 없다. ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940))

---

## 작업 분류 체계

작업을 받으면, 실행 전에 반드시 분류를 먼저 선언한다.

> 이 작업을 [Fast / Standard / Critical]으로 분류했습니다.
> 이유: [한 줄 설명]

### Fast

다음 조건을 **모두** 만족하는 경우: 1~2개 파일 변경, 로직 변경 없음, Breaking Change 없음.
텍스트/주석/스타일 변경은 테스트 조건에서 제외한다.
- 즉시 실행한다. 완료 후 결과만 보고한다.

### Standard

기능 개발, 버그 수정, 리팩터링, 의존성 업데이트 등 일반적인 작업.
- 분류 후 사용자 확인을 받고 진행한다.

### Critical

DB 스키마, 공개 API 계약, 인증/권한, 인프라 변경 등 영향 범위가 큰 작업.
- 분류 후 사용자 확인을 받고, 변경 계획을 제시한 뒤 한 번 더 승인을 받는다. (2단계 승인)

### 브랜치 네이밍

| 상황           | 규칙                       | 예시                                                    |
| -------------- | -------------------------- | ------------------------------------------------------- |
| 이슈 번호 있음 | `ISSUE-NUMBER` (기존 유지) | `HAHK-337`, `SCT-637`                                   |
| 이슈 번호 없음 | `type/description`         | `feat/add-tooltip`, `fix/audit`, `refactor/search-form` |

이슈 번호 없을 때 사용하는 type prefix: `feat/`, `fix/`, `refactor/`, `hotfix/`, `perf/`, `chore/`, `docs/`

### 작업 유형별 워크플로우

분류 후 작업 유형에 따라 아래 워크플로우를 따른다.

#### New Feature

1. **파악** — 요구사항이 모호하면 질문으로 명확화한다
2. **설계** — 영향받는 파일/컴포넌트 구조, API 연동 방식을 정리하여 plan을 작성한다
3. **planning 리뷰** — 작성한 plan을 사용자에게 제시하고 승인을 받은 뒤 구현에 착수한다
4. **구현** — UI가 포함되면 컴포넌트 → 훅 → API 순서로 작업
5. **검증** — 빌드 확인, 기존 기능 회귀 체크
6. **리뷰** — 변경 사항 요약 보고

#### Bug Fix

1. **원인 파악** — 재현 경로와 근본 원인 특정
2. **계획** — 수정 방향 + 회귀 방지 방안 제시 → 사용자 확인
3. **수정** — 최소 범위로 수정, 관련 없는 코드 변경 금지
4. **검증** — 빌드 확인, 원래 버그가 해결되었는지 확인
5. **보고** — 근본 원인 / 수정 내용 / 재발 방지 방안 명시

#### Refactor

1. **현행 분석** — 현재 동작을 먼저 파악한다
2. **범위 확인** — 변경 범위를 사용자와 합의한다
3. **구현** — 기존 동작을 유지하며 구조만 개선한다
4. **검증** — 빌드 확인, 기능적 변화 없음을 확인
5. **보고** — "기능적 변화 없음. 내부 구조만 개선." 명시

#### Hotfix — Critical

1. **긴급 파악** — 원인 특정을 병행하며 최소 수정안 도출
2. **축약 승인** — 사용자 확인 (간략화 가능)
3. **최소 수정** — 문제 해결에 필요한 최소한의 변경만 적용
4. **검증** — 핵심 경로만 빠르게 확인
5. **사후 조치** — 정식 버그 티켓 생성 + 근본 원인 조사 필요성 안내

#### UI/UX 개선

1. **현상 진단** — 개선 전 현재 문제점 정리 (레이아웃, 접근성 등)
2. **방향 제시** — 개선 방안을 제시 → 사용자 확인
3. **구현** — 접근성(a11y)을 구현 단계에서 함께 반영
4. **검증** — 빌드 확인, 브라우저에서 시각적 확인
5. **보고** — 변경된 화면/컴포넌트, UX 개선 포인트, a11y 변경사항 명시

#### Performance

1. **측정** — 최적화 전 기준값(baseline)을 먼저 측정한다. 추측 금지
2. **계획** — 측정된 병목 기반으로 접근 방식 제시 → 사용자 확인
3. **구현** — 정확성 회귀 없이 최적화 적용
4. **검증** — 개선 전/후 수치 비교 필수
5. **보고** — 지표명 / Before / After / 개선율(%) 포함

#### Dependency Update

1. **기준선** — 변경 전 빌드 상태 확인
2. **계획** — patch(일괄), minor(개별), major(별도 커밋)로 분리
3. **업데이트** — 의존성 업데이트 및 충돌 해결
4. **검증** — 빌드 확인, 기준선 대비 새로운 에러 여부 확인
5. **보고** — 업데이트 패키지 목록 (이름: old → new), Breaking Change 여부

#### Docs — Fast or Standard

1. 변경된 내용과 관련된 문서를 갱신한다
2. 1~2개 파일이면 Fast, 구조 변경이면 Standard

---

## 안전 규칙

### 모호함 처리

- 해석이 2가지 이상이면 둘 다 제시하고, 어느 쪽인지 질문한다.
- 조용히 가정하지 않는다.

### 범위 제한

- 요청받은 것만 수정한다.
- 작업 중 인접한 이슈를 발견하면: "작업 중 [이슈] 발견. 이번 PR에 포함할까요, 별도 처리할까요?"
- 조용히 범위를 확장하지 않는다.

### Breaking Change — 반드시 사전 확인

아래 항목은 모든 분류(Fast/Standard/Critical)에서 **변경 전 반드시 확인**한다:
- 공개 API 계약 / DB 스키마 / 인증·권한 로직 / 환경 변수
- 외부 서비스 연동 / 되돌릴 수 없는 마이그레이션
- 새로운 major 의존성 추가 또는 기존 의존성 교체

### 승인 없이 금지

- 프로젝트 디렉토리 밖 파일 수정
- 요청하지 않은 리팩터링이나 코드 정리
- API 엔드포인트나 응답 형태 변경
- 환경 변수 추가/변경/삭제
- 비임시 파일 삭제
- 의존성 설치 (계획 단계에서 합의된 것만 허용)

### 환경 변수 / 시크릿

- `.env`는 커밋하지 않는다. `.gitignore`의 `.env*`로 차단되어 있다.
- 새 환경 변수를 추가하면 `.env.example`에 **값 없이** 키와 설명만 함께 추가한다.
- 시크릿에는 `NEXT_PUBLIC_` 접두어를 붙이지 않는다. 브라우저로 노출된다.
- 외부 API 키는 서버(Route Handler, Server Component, Server Action)에서만 읽는다.

---

## 라이브러리 선택 기준

새 패키지를 도입하기 전에 아래 절차를 따른다.

### 평가 흐름

1. "잘 관리되는 라이브러리가 이 문제를 해결하는가?" 먼저 확인
2. npm trends, GitHub stars, 마지막 커밋 날짜, 번들 사이즈, 의존성 수, 라이선스 확인
3. 기존 스택과의 호환성, 버전 충돌, 번들 영향도 확인
4. 추천안 + 대안을 제시

### 라이브러리 사용

- 성숙한 솔루션 존재 (활발한 유지보수, 최근 커밋)
- 구현 시간 2시간 이상 절약
- 직접 구현 시 놓치기 쉬운 엣지 케이스 처리 (날짜, a11y, 암호화 등)

### 직접 구현

- 핵심 비즈니스 로직 (경쟁 우위)
- 단순 유틸리티 (20줄 미만)
- 적절한 라이브러리가 없는 경우
- 최소한의 기능에 비해 번들 사이즈가 과도한 경우

### 규칙

- 새 의존성 추가는 계획 단계에서 사용자 승인을 받는다.
- 기존 의존성 교체는 Breaking Change — 별도로 확인한다.
- 버전은 설치 시점의 최신 안정 버전을 기준으로 하고, `package.json`에 캐럿(`^`) 범위로 고정한다.

---

## General Principles

- 읽기 쉬운 코드를 우선한다. 영리함보다 가독성.
- 불필요한 추상화를 피한다.
- 기존 유틸리티가 있으면 재사용한다.
- 조기 최적화하지 않는다. memoization은 필요할 때만 사용한다.
- 불필요한 리렌더링을 방지한다.
- early return을 사용한다.
- `any` 타입 사용 불가. strict typing을 사용한다.

---

## 함수 작성 규칙

- 모든 함수는 **함수 표현식**으로 작성한다.

```ts
// ✅
const fetchUserData = async () => { ... };
const handleButtonClick = () => { ... };

// ❌
function fetchUserData() { ... }
function handleButtonClick() { ... }
```

- 동일한 조건에서 return 하는 if문은 하나로 합친다.

```ts
// ✅
if (!value || !user) return null;

// ❌
if (!value) return null;
if (!user) return null;
```

---

## 파일 / 폴더 네이밍

- 모든 파일명과 폴더명은 **kebab-case**를 사용한다.

```
components/book/book-list-item.tsx
hooks/use-search-books.ts
lib/format-date.ts
```

---

## 함수 / 변수 네이밍

| 대상                | 규칙                                                                  |
| ------------------- | --------------------------------------------------------------------- |
| 이벤트 핸들러       | `handle + Target + Action` (`handleButtonClick`, `handleEmailChange`) |
| boolean 변수        | `is`, `has`, `can`, `should` 접두어 (`isLoading`, `hasPermission`)    |
| 상태 변수           | `const [value, setValue]` 형식 유지                                   |
| useEffect 내부 함수 | `fetch`, `load`, `init` 접두어 (`fetchUserData`, `initMap`)           |

### 긍정 네이밍 우선

부정형/이중 부정은 한 번 더 해석을 요구한다. 의미를 담은 긍정형 네이밍을 사용한다.

```ts
// ✅
const groupsWithChats = groups.filter((g) => g.chats.length > 0);
const visibleItems = items.filter((i) => i.isVisible);
const activeUsers = users.filter((u) => !u.isDeleted);

// ❌
const nonEmptyGroups = groups.filter((g) => g.chats.length > 0);
const notHiddenItems = items.filter((i) => i.isVisible);
```

boolean 변수는 예외: `is`/`has`/`can`/`should` 접두어가 이미 긍정형 prefix이므로 `isEmpty`, `hasError` 등은 허용된다. 단 `isNotXxx` 처럼 접두어 안에 부정이 들어가는 건 피한다.

---

## 파일 / 폴더 구조

| 대상        | 규칙                                     | 예시                                      |
| ----------- | ---------------------------------------- | ----------------------------------------- |
| 컴포넌트    | `/components/feature/component-name.tsx` | `components/book/book-list.tsx`           |
| shadcn/ui   | `components/ui/`                         | `components/ui/button.tsx`                |
| 아이콘      | `components/icon/`                       | `components/icon/like-icon.tsx`           |
| Provider    | `components/providers/`                  | `components/providers/query-provider.tsx` |
| hook        | `hooks/use-xxx.ts`                       | `hooks/use-search-books.ts`               |
| 페이지      | `/app/(feature)/page.tsx`                | `app/(book)/page.tsx`                     |
| 공통 유틸   | `lib/`                                   | `lib/format-date.ts`                      |
| 도메인 유틸 | `lib/feature/`                           | `lib/book/parse-authors.ts`               |
| API         | `api/feature/`                           | `api/book/get-book-list.ts`               |
| 타입        | `types/feature/`                         | `types/book/index.ts`                     |
| 상수        | `constants/`                             | `constants/api-error-message.ts`          |

> **Note**: `utils/` 디렉토리를 만들지 않는다. 공통 유틸 함수는 `lib/`에 통합한다.
> 도메인 유틸은 `lib/feature/` 아래에 둔다. (예: `lib/book/`)
>
> `lib/utils.ts`는 shadcn/ui가 요구하는 `cn()` 재노출 파일이므로 예외로 유지한다.

---

## 컴포넌트 작성 규칙

- 컴포넌트는 **화살표 함수 표현식**으로 선언한다.
- Props 타입은 **`interface`**로 정의한다.
- `displayName`은 **Compound 컴포넌트, HOC, 동적 export**에만 명시한다. 일반 컴포넌트에는 붙이지 않는다.
- 300줄 이상이거나 복잡한 컴포넌트는 `component + hook + types + styles`로 분리한다.
- 최상위 return 요소는 의미 있는 semantic 태그를 사용한다. (`<section>`, `<main>`, `<dialog>`)

```tsx
interface Props {
  label: string;
  onClick: () => void;
}

const SubmitButton = ({ label, onClick }: Props) => {
  return (
    <button
      className="bg-palette-primary text-palette-white w-full"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
```

---

## 상태 관리

전역 상태 라이브러리를 사용하지 않는다.

| 상태 종류                    | 처리 방식                                       |
| ---------------------------- | ----------------------------------------------- |
| 서버 데이터 (API 응답, 캐시) | TanStack Query (`useQuery`, `useInfiniteQuery`) |
| 컴포넌트 로컬 UI 상태        | `useState`, `useReducer`                        |
| 좁은 범위 공유 상태          | props 전달 → 깊어지면 Context                   |
| URL로 표현 가능한 상태       | `useSearchParams` (검색어, 페이지, 필터)        |
| 브라우저 영속 상태           | `localStorage` + 커스텀 훅 (`hooks/use-xxx.ts`) |
- 검색어·페이지·필터처럼 공유 가능하고 뒤로가기가 동작해야 하는 상태는 URL에 둔다.
- TanStack Query로 처리 가능한 데이터를 별도 상태에 복제하지 않는다.
- 전역 상태 라이브러리가 필요하다고 판단되면 먼저 사용자에게 제안한다.

---

## 스타일링

| 대상            | 규칙                                                                               |
| --------------- | ---------------------------------------------------------------------------------- |
| 기본 방식       | Tailwind CSS 클래스 기반 스타일                                                    |
| 커스텀 CSS      | `app/globals.css`, `component.module.css`로 한정                                   |
| shadcn/ui       | 커스텀 스타일은 `className` override 방식 사용 (`cn()` 활용)                       |
| 설정            | Tailwind v4 CSS-first 설정 사용. `tailwind.config.mjs` 생성 금지                   |
| 토큰            | 아래 디자인 토큰 유틸리티를 사용한다. 임의값(`text-[24px]`, `text-[#4880ee]`) 금지 |
| arbitrary value | Tailwind 기본 spacing scale 클래스를 우선 사용한다. `w-[400px]` 대신 `w-100` 사용. |

---

## 디자인 토큰

모든 토큰은 `app/globals.css`의 `@theme` 블록에 정의되어 있다. 값을 바꿀 때는 그 파일만 수정한다.

### 폰트

`Noto Sans KR` (`next/font/google`, weight 500 / 700)을 `--font-sans`로 연결해 전역 기본 폰트로 사용한다.

### Typography

size / line-height / font-weight / letter-spacing이 토큰에 모두 포함되어 있다.
**`text-title-1` 한 클래스로 끝난다. `font-bold`를 덧붙이지 않는다.**

| 유틸리티           | size | line-height | font-weight |
| ------------------ | ---- | ----------- | ----------- |
| `text-title-1`     | 24px | 24px        | 700         |
| `text-title-2`     | 22px | 24px        | 700         |
| `text-title-3`     | 18px | 18px        | 700         |
| `text-body-1`      | 20px | 20px        | 500         |
| `text-body-2`      | 14px | 14px        | 500         |
| `text-body-2-bold` | 14px | 14px        | 700         |
| `text-caption`     | 16px | 16px        | 500         |
| `text-small`       | 10px | 10px        | 500         |

### Color — palette

| 유틸리티 접미어      | 값        |
| -------------------- | --------- |
| `palette-primary`    | `#4880ee` |
| `palette-red`        | `#e84118` |
| `palette-gray`       | `#dadada` |
| `palette-light-gray` | `#f2f4f6` |
| `palette-white`      | `#ffffff` |
| `palette-black`      | `#222222` |

### Color — text

| 유틸리티              | 값        | 용도       |
| --------------------- | --------- | ---------- |
| `text-text-primary`   | `#353c49` | 본문 기본  |
| `text-text-secondary` | `#6d7582` | 보조 설명  |
| `text-text-subtitle`  | `#8d94a0` | 서브타이틀 |

사용 예: `bg-palette-primary text-palette-white`, `text-text-secondary`, `border-palette-gray`

### shadcn/ui semantic 토큰

shadcn의 `--background` / `--primary` / `--border` 등은 위 팔레트에 매핑되어 있다.
따라서 shadcn 컴포넌트는 별도 설정 없이 디자인 시스템 색을 따른다. 매핑을 바꿀 때는 `globals.css`의 `:root` 블록을 수정한다.

다크 테마는 정의하지 않았다. 토큰 명세에 다크 팔레트가 없기 때문이다.

### 아이콘

- 위치: `components/icon/`, 파일명 kebab-case (`like-icon.tsx`)
- SVG의 `fill` / `stroke`는 `currentColor`로 치환하고, 색은 Tailwind `text-*` 토큰으로 제어한다
- 장식용 아이콘에는 `aria-hidden="true"`를 붙인다. 의미를 가지면 `aria-label`을 쓴다
- SVG 원본 파일을 `public/`에 따로 보관하지 않는다. 컴포넌트가 유일한 소스다

---

## 기타 규칙

### import 순서

1. react
2. 외부 라이브러리
3. alias (`@/`)
4. 상대경로

각 그룹 사이에 빈 줄로 구분한다.

```ts
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { formatDate } from './lib/format-date';
```

### 타입

- Props 타입은 `interface`를 사용한다.
- 그 외 타입 정의는 `type`을 사용한다.
- 외부 API 응답은 명확히 분리한다.
- `any` 타입 사용 불가.

```ts
// Props → interface
interface Props {
  label: string;
  onClick: () => void;
}

// 그 외 → type
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

### null / undefined 체크

- 명시적 분기를 선호한다.
- `??`, `?.`는 단순 할당이나 접근에서 사용 가능하지만, 복잡한 로직에서는 명시적 분기를 사용한다.

```ts
// ✅ 단순 할당 — nullish coalescing 허용
const name = user.name ?? 'Unknown';
const count = response?.data?.length ?? 0;

// ✅ 로직 분기 — 명시적 if문 사용
if (!value) return null;

if (user == null) {
  handleMissingUser();
  return;
}

// ❌ 복잡한 로직을 ?? 체이닝으로 처리
const result = getValue() ?? computeFallback() ?? defaultValue;
```

### 상수 / 타입 정의

- 하드코딩을 지양하고 `constants/`, `types/`에 정의하여 사용한다.

### 주석

- `// TODO`, `// NOTE`, `// HACK` 형식을 일관되게 사용한다.

### Performance

- 불필요한 리렌더링을 방지한다.
- memoization(`useMemo`, `useCallback`, `React.memo`)은 측정 가능한 성능 문제가 있을 때만 사용한다.
- 조기 최적화하지 않는다.

---

## 검증 명령어

작업 완료 전 아래를 통과해야 한다.

```bash
npm run check      # biome check .          — lint + format + import 정렬 검사
npm run check:fix  # biome check --write .  — 자동 수정 적용
npm run typecheck  # next typegen && tsc --noEmit
npm run build      # next build
```

### CI

`.github/workflows/ci.yml`이 `main` push 와 모든 PR 에서 위 검증을 실행한다.

| 단계                       | 명령어                                    | 실패 시 |
| -------------------------- | ----------------------------------------- | ------- |
| Biome check                | `npm run check`                           | 차단    |
| Type check                 | `npm run typecheck`                       | 차단    |
| Build                      | `npm run build`                           | 차단    |
| Audit (production)         | `npm audit --omit=dev --audit-level=high` | 차단    |
| Audit (all, informational) | `npm audit --audit-level=high`            | 경고만  |
- 프로덕션 의존성 감사만 차단 기준으로 삼는다. devDependencies 는 런타임에 포함되지 않기 때문이다.
- CI 를 통과하지 못하는 변경은 push 하지 않는다. 로컬에서 `npm run check && npm run typecheck && npm run build` 를 먼저 돌린다.
- `LayoutProps`, `PageProps` 등은 Next 가 `.next/types/` 에 생성하는 전역 타입이다. `.next/` 는 gitignore 되므로 `typecheck` 는 `next typegen` 을 먼저 실행한다. 이 순서를 바꾸면 clean checkout 에서 `TS2304: Cannot find name 'LayoutProps'` 로 깨진다.

---

## 커밋 컨벤션

### 커밋 메시지 구조

```
type(scope): (ticket num)메시지 제목
본문 (선택)
꼬리말 (선택)
```

- 제목은 50자 이내로 작성하며, 마침표 등 특수문자는 사용하지 않는다.
- `scope`는 선택 항목이며, 관련된 기능이나 모듈명을 괄호로 작성한다.
- 영어 커밋인 경우, 동사 원형으로 시작하며 첫 글자는 대문자로 작성한다.
- 한글 커밋인 경우, "추가", "수정", "변경" 등의 동사로 시작한다.
- 본문에는 변경 이유나 목적을 간단히 설명한다.
- 관련 이슈가 있을 경우, 꼬리말에 `Resolves:`, `Related to:` 등으로 연결한다.

### 커밋 타입

| 타입                | 설명                                                |
| ------------------- | --------------------------------------------------- |
| ✨ Feat             | 새로운 기능을 추가한 경우                           |
| 🐛 Fix              | 버그를 수정한 경우                                  |
| 🎨 Design           | UI 스타일이나 레이아웃 등 시각적 요소를 수정한 경우 |
| 💥 !BREAKING CHANGE | 기존 기능과 호환되지 않는 큰 변경이 있는 경우       |
| 🔥 !HOTFIX          | 긴급하게 치명적인 문제를 수정한 경우                |
| 🎯 Style            | 포맷팅, 세미콜론 등 기능에 영향을 주지 않는 수정    |
| ♻️ Refactor         | 기능 변경 없이 코드 구조를 개선한 경우              |
| 💬 Comment          | 주석을 추가하거나 수정한 경우                       |
| 📚 Docs             | 문서만 수정한 경우                                  |
| ✅ Test             | 테스트 코드를 추가하거나 수정한 경우                |
| 🛠 Chore             | 패키지, 설정 등 기능과 직접 관계 없는 작업          |
| 🔄 Rename           | 파일/폴더명을 변경한 경우                           |
| 🗑 Remove            | 파일/폴더를 삭제한 경우                             |

### 예시

```
✨ Feat(search): #12 도서 검색 기능 추가
카카오 책 검색 API 연동과 무한 스크롤을 구현했어요.
Resolves: #12
```
