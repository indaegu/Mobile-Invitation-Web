# WORKFLOW.md — Claude 작업 방식

> 이 파일은 Claude가 모든 요청을 처리하는 **표준 작업 절차(SOP)**입니다.
> 예외 없이 이 순서를 따릅니다.

---

## 작업 원칙

사용자는 **PR 승인 여부만 결정**합니다.
그 이전의 모든 과정 — 브랜치 생성, 코드 작성, 테스트, 커밋, Push, PR 생성 — 은 Claude가 수행합니다.

```
사용자: 요청 → PR 승인/거절
Claude: 브랜치 → 계획 → 코드 → 테스트 → 커밋 → Push → PR
```

---

## 표준 작업 순서 (모든 요청에 적용)

### Phase 0. 사전 확인

```bash
# 현재 브랜치와 상태를 반드시 확인
git status
git branch
```

- `main`이 깨끗한지 확인
- 진행 중인 작업 브랜치가 있으면 사용자에게 알리고 방향 확인

---

### Phase 1. 계획 수립 (echo 필수)

코드를 한 줄도 작성하기 전에 **반드시 echo로 계획을 출력**합니다.

```bash
echo "=== [계획 수립] ==="
echo ""
echo "요청: [사용자 요청 요약]"
echo ""
echo "브랜치명: [type]/[issue-or-description]"
echo ""
echo "작업 목록:"
echo "  1. [생성/수정할 파일 경로]"
echo "  2. [생성/수정할 파일 경로]"
echo "  ..."
echo ""
echo "테스트 계획:"
echo "  - [어떤 테스트를 작성할지]"
echo "  - [어떤 명령으로 검증할지]"
echo ""
echo "사이드 이펙트:"
echo "  - [다른 파일에 영향이 있으면 명시, 없으면 '없음']"
```

계획 출력 후 사용자의 **명시적 확인(ok, 진행해, yes 등)** 을 받은 후 다음 단계로 넘어갑니다.

> 단, 사용자가 "바로 해줘", "한 번에 해줘" 등 즉시 실행을 원하면
> 계획 출력 후 바로 진행합니다.

---

### Phase 2. 브랜치 생성

```bash
git checkout main
git pull origin main
git checkout -b [브랜치명]
```

**브랜치 네이밍 규칙** (`docs/CONVENTIONS.md` 참조):

```
feat/[이슈번호-or-설명]    # 새 기능
fix/[이슈번호-or-설명]     # 버그 수정
refactor/[설명]            # 리팩토링
docs/[설명]                # 문서 변경
chore/[설명]               # 빌드/설정
```

---

### Phase 3. 코드 작성

- `docs/CONVENTIONS.md` 규칙 준수
- 한 브랜치 = 한 관심사 (여러 기능 혼재 금지)
- 요청 범위 외의 코드 추가 금지
- 테스트 파일을 구현 파일과 **함께** 작성

---

### Phase 4. 테스트 실행 (통과 전까지 Phase 3으로 돌아감)

```bash
# 1. 타입 체크
pnpm type-check

# 2. 린트
pnpm lint

# 3. 단위/컴포넌트 테스트
pnpm test

# 4. 빌드 검증
pnpm build
```

**모든 명령이 exit 0으로 종료되어야 다음 단계로 진행합니다.**
실패하면 Phase 3으로 돌아가 코드를 수정합니다.

테스트 결과를 echo로 요약 출력합니다:

```bash
echo "=== [테스트 결과] ==="
echo "  타입 체크: ✅ PASS"
echo "  ESLint:    ✅ PASS"
echo "  Jest:      ✅ PASS (X tests)"
echo "  빌드:      ✅ PASS"
```

---

### Phase 5. 커밋

```bash
git add .
git commit -m "[type]([scope]): [subject]

[body - 무엇을 왜 변경했는지]

[footer - Closes #이슈번호]"
```

Conventional Commits 규칙은 `docs/CONVENTIONS.md` 참조.

---

### Phase 6. Push

```bash
git push origin [브랜치명]
```

---

### Phase 7. PR 생성 (GitHub CLI)

```bash
gh pr create \
  --title "[type]([scope]): [subject]" \
  --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)" \
  --base main \
  --head [브랜치명]
```

PR 생성 후 사용자에게 PR URL을 전달합니다:

```bash
echo "=== [PR 생성 완료] ==="
echo "PR URL: [URL]"
echo ""
echo "사용자가 확인 후 Merge 또는 Close 해주세요."
echo "Vercel Preview: CI 통과 후 자동으로 댓글로 달립니다."
```

---

## 중단 조건

다음 상황에서는 작업을 멈추고 사용자에게 알립니다:

| 상황                                | 대응                                            |
| ----------------------------------- | ----------------------------------------------- |
| 테스트가 3회 이상 계속 실패         | 실패 원인을 분석해 사용자에게 보고, 방향 재확인 |
| 요청 범위가 예상보다 크게 확장될 때 | 작업 범위를 분리해 제안                         |
| 기존 코드와 컨벤션 충돌 발견        | 충돌 내용 보고 후 해결 방향 확인                |
| 환경변수나 외부 API 키가 필요할 때  | 작업 중단, 필요한 값 요청                       |

---

## 요청 유형별 빠른 참조

### 새 기능 요청

```
Phase 0 → 1(계획) → 2(브랜치: feat/) → 3(구현+테스트파일) → 4(테스트) → 5(커밋) → 6(Push) → 7(PR)
```

### 버그 수정 요청

```
Phase 0 → 1(계획, 원인 분석 포함) → 2(브랜치: fix/) → 3(수정+회귀테스트) → 4(테스트) → 5(커밋) → 6(Push) → 7(PR)
```

### 리팩토링 요청

```
Phase 0 → 1(계획, 기존 테스트 목록 확인) → 2(브랜치: refactor/) → 3(리팩토링) → 4(기존 테스트 전부 통과 확인) → 5(커밋) → 6(Push) → 7(PR)
```

### 문서/설정 변경

```
Phase 0 → 1(계획) → 2(브랜치: docs/ or chore/) → 3(변경) → 4(빌드 확인) → 5(커밋) → 6(Push) → 7(PR)
```

---

_이 워크플로우를 변경하려면 PR을 통해 이 파일을 수정하고 사용자의 승인을 받습니다._
