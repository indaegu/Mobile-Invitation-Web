# HOOKS.md — Git Hook 가이드

> 이 프로젝트는 Husky로 Git Hook을 관리합니다.
> `pnpm install` 시 자동으로 훅이 설치됩니다 (`prepare` 스크립트).

---

## 훅 구조

```
.husky/
├── pre-commit    ← git commit 실행 직전 (코드 품질)
└── commit-msg   ← 커밋 메시지 입력 직후 (메시지 형식)
```

---

## pre-commit 훅

`git commit` 명령 실행 시 **staged 파일을 대상으로** 자동 실행됩니다.

### 검사 순서

```
Step 1. ESLint + Prettier   (lint-staged — staged 파일만, 빠름)
          ↓ 실패 시 커밋 차단
Step 2. TypeScript 타입 체크 (전체 프로젝트)
          ↓ 실패 시 커밋 차단
Step 3. Jest 테스트          (변경 파일과 연관된 테스트만)
          ↓ 실패 시 커밋 차단
커밋 진행
```

### 차단 조건

| 조건                  | 예시                                |
| --------------------- | ----------------------------------- |
| ESLint 규칙 위반      | `any` 타입 사용, `console.log` 잔류 |
| Prettier 포맷 불일치  | 탭/공백 혼용, 따옴표 불일치         |
| TypeScript 타입 에러  | 없는 속성 접근, 타입 불일치         |
| 연관 Jest 테스트 실패 | 수정한 함수의 테스트가 깨진 경우    |

### lint-staged 대상 파일

```json
"lint-staged": {
  "*.{ts,tsx}":                    ["eslint --fix", "prettier --write"],
  "*.{js,jsx,mjs,cjs}":           ["eslint --fix", "prettier --write"],
  "*.{json,md,mdx,css,html,yml}": ["prettier --write"]
}
```

---

## commit-msg 훅

커밋 메시지를 입력하면 `commitlint`로 형식을 검사합니다.

### 올바른 형식

```
<type>(<scope>): <subject>

[body — 선택사항]

[footer — 선택사항, Closes #이슈번호]
```

### 허용 타입

| 타입       | 사용 상황                |
| ---------- | ------------------------ |
| `feat`     | 새 기능 추가             |
| `fix`      | 버그 수정                |
| `refactor` | 기능 변경 없는 코드 개선 |
| `style`    | 포맷팅 (로직 변경 없음)  |
| `test`     | 테스트 추가/수정         |
| `docs`     | 문서 변경                |
| `chore`    | 빌드, 의존성 설정        |
| `perf`     | 성능 개선                |
| `ci`       | CI/CD 설정 변경          |
| `revert`   | 커밋 되돌리기            |

### 차단 조건

| 조건                  | 잘못된 예                                                    | 올바른 예            |
| --------------------- | ------------------------------------------------------------ | -------------------- |
| 허용되지 않는 type    | `update: ...`                                                | `feat: ...`          |
| subject 50자 초과     | `feat: 아주 길고 자세한 설명이 들어간 커밋 메시지입니다 ...` | 50자 이내로 요약     |
| subject 마침표로 끝남 | `feat: RSVP 폼 추가.`                                        | `feat: RSVP 폼 추가` |
| type 대문자           | `Feat: ...`                                                  | `feat: ...`          |
| 빈 subject            | `feat: `                                                     | `feat: RSVP 폼 추가` |

---

## 훅 우회 방법 (비상 시에만)

```bash
# pre-commit 우회 (절대 남용 금지)
git commit --no-verify -m "..."

# 또는 환경변수로 특정 훅만 우회
HUSKY=0 git commit -m "..."
```

> ⚠️ `--no-verify`는 CI에서 차단되므로 PR 머지에는 영향을 줍니다.
> 훅 우회가 반복된다면 훅 규칙 자체를 PR로 수정하세요.

---

## 훅 재설치 방법

```bash
# 의존성 재설치 시 자동 설치됨
pnpm install

# 수동 설치
pnpm husky
```

---

## 문제 해결

### "husky: command not found"

```bash
pnpm install  # devDependencies 설치 후 prepare 스크립트 자동 실행
```

### 훅이 실행되지 않음

```bash
ls -la .husky/   # 실행 권한(+x) 확인
chmod +x .husky/pre-commit .husky/commit-msg
```

### Windows에서 실행 문제

```bash
# Git Bash 사용 권장
# 또는 WSL2 환경에서 실행
```
