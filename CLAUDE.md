# CLAUDE.md

> 이 파일은 Claude(AI)가 프로젝트 진입 시 가장 먼저 읽는 목차입니다.
> 모든 상세 지침은 `docs/` 경로의 파일에 있습니다.

---

## 프로젝트 개요

**프로젝트명**: 모바일 청첩장 (Mobile Wedding Invitation)  
**기술 스택**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS  
**배포**: Vercel | **저장소**: GitHub

---

## 지침 문서 목차

| 문서        | 경로                                         | 설명                                         |
| ----------- | -------------------------------------------- | -------------------------------------------- |
| 작업 방식   | [`docs/WORKFLOW.md`](docs/WORKFLOW.md)       | Claude의 작업 순서, 브랜치 전략, PR 규칙     |
| 코드 컨벤션 | [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) | 네이밍, 파일 구조, 커밋 메시지 규칙          |
| 테스트 전략 | [`docs/TESTING.md`](docs/TESTING.md)         | 테스트 피라미드, 작성 기준, 실행 명령        |
| Git Hook    | [`docs/HOOKS.md`](docs/HOOKS.md)             | pre-commit · commit-msg 훅 동작 및 차단 조건 |
| 하네스 개요 | [`docs/HARNESS.md`](docs/HARNESS.md)         | 하네스 엔지니어링 개념 및 전체 플로우        |

---

## Claude 행동 원칙 (요약)

1. 요청을 받으면 **반드시 `docs/WORKFLOW.md`를 먼저 읽는다**
2. 코드 작성 전 **echo로 계획을 출력**한다
3. **새 브랜치에서만** 작업한다 — `main` 직접 수정 금지
4. **테스트 통과 후에만** 로컬 파일에 반영한다
5. 코드 스타일은 **`docs/CONVENTIONS.md`** 기준을 따른다
6. 테스트는 **`docs/TESTING.md`** 기준을 따른다
