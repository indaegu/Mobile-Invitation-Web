# CONVENTIONS.md — 코드 컨벤션

> 이 프로젝트의 모든 코드는 아래 규칙을 따릅니다.
> Claude가 코드를 생성할 때, 개발자가 PR을 리뷰할 때 동일한 기준을 공유합니다.

---

## 1. 네이밍 컨벤션

### 파일 · 디렉토리

| 종류          | 규칙                    | 예시                    |
| ------------- | ----------------------- | ----------------------- |
| 컴포넌트 파일 | PascalCase              | `WeddingCard.tsx`       |
| 훅 파일       | camelCase, use 접두사   | `useScrollAnimation.ts` |
| 유틸 파일     | camelCase               | `formatDate.ts`         |
| 타입 파일     | camelCase               | `weddingTypes.ts`       |
| 상수 파일     | camelCase               | `weddingConstants.ts`   |
| 테스트 파일   | 원본과 동일, .test 추가 | `WeddingCard.test.tsx`  |

### 변수 · 함수

```ts
// 변수: camelCase
const guestCount = 100;

// 불리언: is/has/can/should 접두사
const isLoading = false;
const hasRsvp = true;

// 이벤트 핸들러: handle 접두사
const handleRsvpSubmit = () => {};

// 비동기 함수: 동사 + 명사
const fetchGuestList = async () => {};

// 상수: SCREAMING_SNAKE_CASE
const MAX_GUEST_COUNT = 200;
const KAKAO_MAP_LEVEL = 3;
```

### 타입 · 인터페이스

```ts
// 인터페이스: PascalCase, I 접두사 없음
interface WeddingInfo {
  groomName: string;
  brideName: string;
  date: Date;
}

// 타입 별칭: PascalCase
type RsvpStatus = "attending" | "not-attending" | "pending";

// 제네릭: 의미 있는 이름 사용
type ApiResponse<TData> = {
  data: TData;
  error: string | null;
};
```

---

## 2. 컴포넌트 구조

### 파일 내 순서

```tsx
// 1. 외부 라이브러리 import
import { useState } from "react";

// 2. 내부 모듈 import (절대 경로 @/ 사용)
import { WeddingCard } from "@/components/wedding/WeddingCard";
import { formatDate } from "@/lib/formatDate";
import type { WeddingInfo } from "@/types/weddingTypes";

// 3. 상수 (파일 스코프)
const ANIMATION_DURATION = 300;

// 4. 타입 정의
interface Props {
  info: WeddingInfo;
  onRsvp: (status: RsvpStatus) => void;
}

// 5. 컴포넌트 본문
export function ComponentName({ info, onRsvp }: Props) {
  // 5-1. 훅
  const [isOpen, setIsOpen] = useState(false);

  // 5-2. 파생 상태 · 메모
  const formattedDate = formatDate(info.date);

  // 5-3. 이펙트

  // 5-4. 이벤트 핸들러
  const handleOpen = () => setIsOpen(true);

  // 5-5. 렌더
  return <div>...</div>;
}
```

---

## 3. Tailwind CSS 규칙

### 클래스 순서 (Prettier 플러그인이 자동 정렬)

```
레이아웃 → 위치 → 크기 → 간격 → 배경 → 테두리 → 텍스트 → 애니메이션
```

### 반응형: 모바일 우선

```tsx
// ✅ 모바일 기본, 큰 화면 확장
<div className="text-sm sm:text-base lg:text-lg" />

// ❌ 데스크톱 기본, 모바일 축소 (금지)
<div className="text-lg sm:text-base" />
```

### 커스텀 색상은 `tailwind.config.ts`에서만 정의

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      wedding: {
        primary: '#D4A4A4',   // 웨딩 핑크
        secondary: '#8B7355', // 골드 브라운
        cream: '#FAF6F0',     // 크림
      }
    }
  }
}
```

---

## 4. Import 경로

```ts
// ✅ 절대 경로 사용 (@/ = src/)
import { Button } from "@/components/ui/Button";

// ❌ 상대 경로 금지 (단, 같은 디렉토리 내 index 제외)
import { Button } from "../../../components/ui/Button";
```

`tsconfig.json`에 경로 별칭 설정:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 5. 커밋 메시지 (Conventional Commits)

### 형식

```
<type>(<scope>): <subject>

[body - 선택]

[footer - 선택]
```

### 타입 목록

| 타입       | 사용 상황                            |
| ---------- | ------------------------------------ |
| `feat`     | 새 기능 추가                         |
| `fix`      | 버그 수정                            |
| `refactor` | 기능 변경 없는 코드 개선             |
| `style`    | 포맷팅, 세미콜론 등 (로직 변경 없음) |
| `test`     | 테스트 추가 · 수정                   |
| `docs`     | 문서 변경                            |
| `chore`    | 빌드 설정, 의존성 업데이트           |
| `perf`     | 성능 개선                            |
| `ci`       | CI/CD 설정 변경                      |

### 예시

```
feat(rsvp): 참석 여부 제출 폼 추가

- 이름, 연락처, 참석 인원 입력 필드
- 카카오 알림톡 발송 연동
- 폼 유효성 검사 포함

Closes #12
```

### 규칙

- subject는 50자 이내, 현재형 동사로 시작
- 마침표 없음
- scope는 영문 소문자 (예: `rsvp`, `gallery`, `map`, `invite`)

---

## 6. 브랜치 전략 (GitHub Flow)

```
main          ← 프로덕션 (Vercel 자동 배포)
  └── feat/rsvp-form
  └── fix/map-loading-error
  └── refactor/gallery-component
  └── docs/update-readme
```

### 브랜치 네이밍

```
<type>/<이슈번호-or-짧은설명>

feat/12-rsvp-form
fix/map-loading-error
refactor/gallery-component
chore/update-dependencies
```

### 규칙

- `main`에 직접 push 금지 (브랜치 보호 규칙으로 강제)
- PR을 통해서만 머지
- 머지 후 브랜치 즉시 삭제

---

## 7. 환경변수

```bash
# .env.local (로컬 개발, Git 제외)
NEXT_PUBLIC_KAKAO_MAP_KEY=...
NEXT_PUBLIC_WEDDING_DATE=2024-10-05

# Vercel 대시보드에서 직접 설정 (프로덕션)
KAKAO_API_KEY=...         # 서버 전용 (NEXT_PUBLIC_ 없음)
```

### 규칙

- 클라이언트 노출 필요: `NEXT_PUBLIC_` 접두사
- 서버 전용 시크릿: 접두사 없음
- `.env.local`은 반드시 `.gitignore`에 포함
- `.env.example`에 키 이름만 기록 (값 없이)

---

_이 문서는 팀 합의로 변경하며, 변경 시 CHANGELOG에 기록합니다._
