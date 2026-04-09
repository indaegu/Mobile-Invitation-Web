/**
 * 갤러리 이미지 업로드 API
 *
 * 현재는 브라우저 로컬 처리(FileReader → data URL)로 동작합니다.
 * 서버 준비 완료 시:
 *   1. API_BASE 환경변수 설정
 *   2. uploadLocally → uploadToServer 로 교체
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export type UploadedImage = {
  id: string;
  url: string;
};

// ── 실제 서버 업로드 (서버 준비 시 아래 주석 해제) ──────────────────────────
// async function uploadToServer(file: File): Promise<UploadedImage> {
//   const formData = new FormData();
//   formData.append('image', file);
//
//   const res = await fetch(`${API_BASE}/api/gallery/upload`, {
//     method: 'POST',
//     body: formData,
//   });
//   if (!res.ok) throw new Error(`업로드 실패: ${res.status} ${res.statusText}`);
//   return res.json() as Promise<UploadedImage>;
// }

// ── 임시: 브라우저 로컬 처리 ────────────────────────────────────────────────
function uploadLocally(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e =>
      resolve({
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: e.target?.result as string,
      });
    reader.onerror = () => reject(new Error('파일 읽기에 실패했습니다'));
    reader.readAsDataURL(file);
  });
}

export async function uploadImage(file: File): Promise<UploadedImage> {
  // 서버 준비 완료 시 아래로 교체:
  // return uploadToServer(file);
  return uploadLocally(file);
}

export async function uploadImages(files: File[]): Promise<UploadedImage[]> {
  const imageFiles = files.filter(f => f.type.startsWith('image/'));
  // 병렬 업로드
  return Promise.all(imageFiles.map(uploadImage));
}

// void로 API_BASE 참조 (lint 경고 방지, 서버 전환 후 실제 사용됨)
void API_BASE;
