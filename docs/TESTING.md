# TESTING.md — 테스트 전략

> 이 문서는 하네스 엔지니어링의 핵심인 "테스트 안전망"을 정의합니다.
> Claude가 코드를 생성할 때 어떤 테스트를 함께 제안해야 하는지 기준이 됩니다.

---

## 테스트 피라미드

```
       /\
      /E2E\          Playwright — 핵심 사용자 시나리오
     /------\
    /통합 테스트\      React Testing Library — 컴포넌트 상호작용
   /------------\
  /  단위 테스트  \    Jest — 순수 함수, 유틸리티
 /________________\
```

---

## 1. 단위 테스트 (Jest)

### 대상

- `lib/` 내 유틸리티 함수
- 커스텀 훅 (단독 로직)
- 타입 가드 함수

### 파일 위치

```
src/lib/formatDate.ts
src/lib/formatDate.test.ts    ← 같은 위치에 배치
```

### 예시

```ts
// src/lib/formatDate.test.ts
import { formatWeddingDate } from "./formatDate";

describe("formatWeddingDate", () => {
  it("날짜를 한국어 형식으로 반환한다", () => {
    const date = new Date("2024-10-05");
    expect(formatWeddingDate(date)).toBe("2024년 10월 5일 토요일");
  });

  it("잘못된 날짜 입력 시 빈 문자열을 반환한다", () => {
    expect(formatWeddingDate(new Date("invalid"))).toBe("");
  });
});
```

### 커버리지 기준

- 유틸리티 함수: **80% 이상**
- 분기 로직이 있는 함수: **모든 분기 커버**

---

## 2. 컴포넌트 테스트 (React Testing Library)

### 대상

- 사용자 인터랙션이 있는 컴포넌트
- 조건부 렌더링 컴포넌트
- 폼 컴포넌트

### 파일 위치

```
src/components/wedding/RsvpForm.tsx
src/components/wedding/RsvpForm.test.tsx
```

### 예시

```tsx
// src/components/wedding/RsvpForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RsvpForm } from "./RsvpForm";

describe("RsvpForm", () => {
  it("필수 필드 미입력 시 에러 메시지를 표시한다", async () => {
    render(<RsvpForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /참석 확인/i }));

    await waitFor(() => {
      expect(screen.getByText(/이름을 입력해주세요/i)).toBeInTheDocument();
    });
  });

  it("정상 입력 후 onSubmit이 호출된다", async () => {
    const mockSubmit = jest.fn();
    render(<RsvpForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.click(screen.getByRole("button", { name: /참석 확인/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ name: "홍길동" });
    });
  });
});
```

### 원칙

- 구현 세부사항 테스트 금지 (내부 state, 클래스명 등)
- 사용자 관점: "화면에 무엇이 보이는가", "클릭하면 무슨 일이 일어나는가"
- `data-testid`는 최후 수단 (role, label, text 우선)

---

## 3. E2E 테스트 (Playwright)

### 대상: 핵심 사용자 여정

1. 청첩장 페이지 전체 로딩
2. RSVP 제출 플로우
3. 지도 섹션 렌더링
4. 갤러리 이미지 뷰어

### 파일 위치

```
e2e/
├── wedding-page.spec.ts
└── rsvp.spec.ts
```

### 예시

```ts
// e2e/rsvp.spec.ts
import { test, expect } from "@playwright/test";

test("RSVP 제출 플로우", async ({ page }) => {
  await page.goto("/");

  // RSVP 섹션으로 스크롤
  await page.locator('[data-section="rsvp"]').scrollIntoViewIfNeeded();

  // 폼 작성
  await page.fill('[name="guestName"]', "홍길동");
  await page.selectOption('[name="attendance"]', "attending");
  await page.fill('[name="phone"]', "010-1234-5678");

  // 제출
  await page.click('button[type="submit"]');

  // 성공 메시지 확인
  await expect(page.locator('[role="status"]')).toContainText(
    "참석 의사가 전달되었습니다",
  );
});
```

### 실행 환경

- CI: GitHub Actions에서 Vercel Preview URL 대상으로 실행
- 로컬: `npx playwright test`

---

## 4. 테스트 실행 명령

```bash
# 단위 + 컴포넌트 테스트
pnpm test

# 커버리지 포함
pnpm test:coverage

# 감시 모드 (개발 중)
pnpm test:watch

# E2E 테스트 (로컬)
pnpm test:e2e

# E2E 테스트 UI 모드
pnpm test:e2e:ui
```

---

## 5. CI에서의 테스트 게이트

PR 머지 조건:

1. `pnpm test` 통과 (단위 + 컴포넌트)
2. `pnpm build` 통과 (TypeScript 컴파일 포함)
3. ESLint 오류 없음
4. E2E는 `main` 머지 후 Preview 배포 대상으로 실행

---

## 6. Claude에게 테스트 요청하는 방법

```
// 이렇게 요청하면 테스트까지 함께 받을 수 있습니다:

"[컴포넌트명] 컴포넌트를 만들어줘.
테스트 파일도 TESTING.md 기준에 맞게 함께 작성해줘."
```

---

_테스트가 통과하지 않으면 PR을 머지하지 않습니다._
_"일단 배포하고 나중에 테스트"는 이 프로젝트에서 허용되지 않습니다._
