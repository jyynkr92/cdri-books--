# certicos Books

카카오 책 검색 API 기반 도서 검색 서비스.

## Tech Stack

| 영역        | 사용 기술                                    |
| ----------- | -------------------------------------------- |
| 프레임워크  | Next.js 16.4 (App Router, Turbopack)         |
| 언어        | TypeScript 7.0                               |
| UI          | React 19.3                                   |
| 스타일링    | Tailwind CSS v4 (CSS-first), shadcn/ui       |
| 서버 상태   | TanStack Query v5                            |
| 폰트        | Noto Sans KR (`next/font/google`)            |
| 린터/포맷터 | Biome 2.6 (lint + format + import 정렬 통합) |

전역 상태 라이브러리와 i18n은 사용하지 않습니다. 린터/포맷터는 Biome 하나로 통합되어 있습니다 (ESLint / Prettier 미사용).

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사해 `.env`를 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

| 변수                 | 설명                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `KAKAO_REST_API_KEY` | [Kakao Developers](https://developers.kakao.com) → 내 애플리케이션 → 앱 키 → REST API 키 |

> `.env`는 `.gitignore`로 차단되어 있습니다. 시크릿에 `NEXT_PUBLIC_` 접두어를 붙이지 마세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000

## 스크립트

| 명령어              | 설명                       |
| ------------------- | -------------------------- |
| `npm run dev`       | 개발 서버                  |
| `npm run build`     | 프로덕션 빌드              |
| `npm run start`     | 프로덕션 서버              |
| `npm run check`     | Biome 검사 (lint + format) |
| `npm run check:fix` | Biome 자동 수정            |
| `npm run typecheck` | `tsc --noEmit` 타입 검사   |
| `npm run lint`      | Biome lint 만              |
| `npm run format`    | Biome 포맷 적용            |

## 디렉토리 구조

```
app/                    App Router 페이지, 레이아웃, globals.css (디자인 토큰)
components/
  ui/                   shadcn/ui 컴포넌트
  icon/                 아이콘 컴포넌트
  providers/            전역 Provider
hooks/                  커스텀 훅 (use-xxx.ts)
lib/                    공통 유틸 (도메인 유틸은 lib/feature/)
api/                    API 호출 함수 (api/feature/)
types/                  타입 정의 (types/feature/)
constants/              상수
```

## 디자인 토큰

모든 토큰은 `app/globals.css`의 `@theme` 블록에 있습니다. 자세한 목록은 [CLAUDE.md](./CLAUDE.md#디자인-토큰)를 참고하세요.
- Typography: `text-title-1` ~ `text-title-3`, `text-body-1`, `text-body-2`, `text-body-2-bold`, `text-caption`, `text-small`
  - size / line-height / weight가 토큰에 포함되어 있어 `font-bold`를 덧붙이지 않습니다
- Color: `palette-primary`, `palette-red`, `palette-gray`, `palette-light-gray`, `palette-white`, `palette-black`
- Text color: `text-text-primary`, `text-text-secondary`, `text-text-subtitle`

## CI

`main` push 와 모든 PR 에서 `.github/workflows/ci.yml` 이 아래를 실행합니다.
- Biome check (lint + format + import 정렬)
- `tsc --noEmit` 타입 검사
- `next build`
- `npm audit --omit=dev --audit-level=high` (프로덕션 의존성 — 실패 시 차단)
- `npm audit --audit-level=high` (전체 — 참고용, 차단하지 않음)

push 전에 로컬에서 먼저 확인하세요.

```bash
npm run check && npm run typecheck && npm run build
```

## 코딩 규칙

[CLAUDE.md](./CLAUDE.md)에 정리되어 있습니다.
동일한 내용이 `.cursor/rules/instructions.mdc`, `.github/copilot-instructions.md`에 동기화되어 있습니다.
규칙을 바꿀 때는 세 파일을 함께 갱신하세요.
