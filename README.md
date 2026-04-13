# Mobile-Invitation-Web

디자이너 1 + 개발자 1로 구성된 모바일 청첩장 만들기 프로젝트!

# 📱 Mobile Invitation Web (React + TypeScript)

모바일 웹에서 동작하는 **모바일 청첩장 토이 프로젝트**입니다.  
실제 상용 서비스 목적이 아닌, **React와 TypeScript에 대한 이해도 향상**과  
**모바일 환경에서의 사용자 인터랙션 구현 경험**을 목표로 제작했습니다.

> 정적 웹 기반으로 설계하여 **백엔드 없이도 완결성 있는 서비스 구조**를 구성했습니다.

---

## 🔗 Demo

- Vercel 배포 URL: (배포 후 추가)

---

## 🎯 Project Goals

- React + TypeScript 기반 프로젝트 구조에 대한 이해
- 모바일 웹 환경에서의 UX 중심 인터랙션 구현
- 컴포넌트 단위 설계 및 재사용 가능한 구조 학습
- 무료 서비스(Vercel) 기반 CI/CD 경험

---

## ✨ Key Features

- 📷 이미지 갤러리 (Lazy Loading)
- 📋 계좌번호 / 연락처 복사 (Clipboard API)
- 🗺 네이버지도 / 카카오지도 열기 (딥링크 + 웹 fallback)
- 📱 모바일 퍼스트 UI
- 🎨 Tailwind CSS 기반 디자인 시스템
- ⚡ 빠른 로딩을 위한 정적 빌드

---

## 🛠 Tech Stack

### Core

- **React 18**
- **TypeScript**
- **Vite**

### Styling

- **Tailwind CSS**

### Tooling

- ESLint
- Prettier
- GitLens
- Tailwind CSS IntelliSense
- Error Lens
- Gitmoji

### Deployment

- **Vercel (Free)**

---

## 🧱 Project Structure

```text
src/
 ├─ app/            # 페이지 조합
 ├─ components/     # 공통 UI 컴포넌트
 ├─ features/       # 기능 단위 모듈 (copy, map, gallery 등)
 ├─ hooks/          # 커스텀 훅
 ├─ data/           # 청첩장 데이터 (ts/json)
 ├─ types/          # 도메인 타입 정의
 ├─ utils/          # 공통 유틸 함수
 └─ assets/         # 이미지 및 정적 리소스
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- Node.js **LTS**
- npm 또는 pnpm
- Git

---

### 2️⃣ Install

```bash
npm install
# 또는
pnpm install
```

---

### 3️⃣ Development

```bash
npm run dev
# 또는
pnpm dev
```

- Local: `http://localhost:5173`

---

### 4️⃣ Build & Preview

```bash
npm run build
npm run preview
```

---

## 📱 Mobile UX Considerations

- 모든 주요 인터랙션은 **터치 기반 UX**를 고려해 설계
- 복사 기능 수행 시 사용자 피드백 제공 (Toast)
- 지도 버튼 클릭 시:
  - 앱 설치 → 앱 실행
  - 미설치 → 웹 지도 페이지로 fallback

---

## 📐 TypeScript Design

- 도메인 중심 타입 설계
- 데이터 구조를 타입으로 명확히 정의
- 컴포넌트 props에 명확한 책임 부여

```ts
type AccountInfo = {
  owner: string;
  bankName: string;
  accountNumber: string;
};
```

---

## 🧠 What I Learned

- React 컴포넌트 분리 및 책임 설계
- TypeScript를 활용한 안정적인 UI 개발
- 모바일 웹 환경에서의 실제 사용자 행동 고려
- 정적 웹 서비스 배포 및 운영 흐름 이해

---

## 🔮 Possible Improvements

- 다크 모드 지원
- Web Share API 연동
- URL parameter 기반 데이터 분기 (여러 청첩장 템플릿화)
- 애니메이션 개선 (Intersection Observer 활용)

---

## 🧪 Development Environment

- Cursor (VS Code 기반)
- ESLint + Prettier를 통한 코드 품질 관리
- GitLens를 통한 변경 이력 추적

---

## 📄 License

MIT

```

```
