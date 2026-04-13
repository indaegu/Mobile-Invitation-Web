import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 허용 타입 목록 (docs/CONVENTIONS.md와 동일하게 유지)
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새 기능
        "fix", // 버그 수정
        "refactor", // 리팩토링
        "style", // 포맷팅 (기능 변경 없음)
        "test", // 테스트 추가/수정
        "docs", // 문서 변경
        "chore", // 빌드, 의존성 설정
        "perf", // 성능 개선
        "ci", // CI/CD 설정 변경
        "revert", // 커밋 되돌리기
      ],
    ],

    // subject 규칙
    "subject-max-length": [2, "always", 50], // 50자 이내
    "subject-full-stop": [2, "never", "."], // 마침표 금지
    "subject-empty": [2, "never"], // 빈 subject 금지
    "subject-case": [0], // 대소문자 제한 없음 (한국어 허용)

    // type/scope 규칙
    "type-empty": [2, "never"], // type 필수
    "type-case": [2, "always", "lower-case"], // type 소문자 강제
    "scope-case": [2, "always", "lower-case"], // scope 소문자 강제

    // body 규칙
    "body-max-line-length": [2, "always", 100], // body 줄당 100자 이내

    // footer 규칙
    "footer-max-line-length": [2, "always", 100],
  },
  // 커밋 메시지 파싱 설정
  parserPreset: {
    parserOpts: {
      // scope에 한국어 허용
      headerPattern: /^(\w+)(?:\(([^)]*)\))?!?: (.+)$/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
};

export default config;
