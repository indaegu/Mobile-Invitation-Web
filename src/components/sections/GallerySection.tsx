import { useRef, useState } from 'react';
import { uploadImages } from '@/api/gallery';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = {
  images: string[];
  onAddImages: (urls: string[]) => void;
};

type Delay = 0 | 100 | 200 | 300 | 400 | 500 | 600;
const STAGGER: Delay[] = [0, 100, 200, 300, 400, 500, 600];

function UploadArea({
  onSelect,
  loading,
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  onSelect: () => void;
  loading: boolean;
  dragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <div
      className={`mx-8 border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
        dragging
          ? 'border-rose-300 bg-rose-50 scale-[1.01]'
          : loading
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
          : 'border-gray-200 bg-gray-50 active:bg-rose-50 active:border-rose-200'
      }`}
      onClick={!loading ? onSelect : undefined}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">업로드 중...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-500">사진을 추가해주세요</p>
            <p className="text-xs text-gray-400 mt-1">탭하거나 드래그하여 업로드</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GallerySection({ images, onAddImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || loading) return;
    setError(null);
    setLoading(true);
    try {
      const results = await uploadImages(Array.from(files));
      onAddImages(results.map(r => r.url));
    } catch {
      setError('업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
      // input 초기화 (같은 파일 재선택 허용)
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <section
      id="gallery"
      className="snap-section min-h-svh flex flex-col justify-center py-20 bg-stone-50"
    >
      <AnimateOnScroll animation="fade-up" className="px-8">
        <SectionTitle en="Gallery" ko="갤러리" />
      </AnimateOnScroll>

      {images.length === 0 ? (
        /* ── 사진 없음 → 업로드 유도 ── */
        <AnimateOnScroll animation="scale" delay={200}>
          <UploadArea
            onSelect={() => inputRef.current?.click()}
            loading={loading}
            dragging={dragging}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          />
        </AnimateOnScroll>
      ) : (
        /* ── 사진 있음 → 가로 스크롤 갤러리 ── */
        <>
          <div className="flex gap-4 overflow-x-auto px-8 pb-3 snap-x snap-mandatory no-scrollbar">
            {images.map((src, index) => (
              <AnimateOnScroll
                key={index}
                animation="scale"
                delay={STAGGER[index % STAGGER.length]}
                className="flex-none w-[260px] h-[340px] snap-center"
              >
                <div className="gallery-card w-full h-full rounded-3xl overflow-hidden shadow-sm">
                  <img
                    src={src}
                    alt={`웨딩 사진 ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </AnimateOnScroll>
            ))}

            {/* 사진 추가 버튼 (갤러리 끝) */}
            <div className="flex-none w-[260px] h-[340px] snap-center flex items-center justify-center">
              <button
                onClick={() => !loading && inputRef.current?.click()}
                disabled={loading}
                className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 transition-all active:scale-95 active:border-rose-300"
                aria-label="사진 추가"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
                  : <span className="text-2xl font-light leading-none">+</span>
                }
              </button>
            </div>
          </div>

          {/* 인디케이터 */}
          {images.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {images.map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-300" />
              ))}
            </div>
          )}
        </>
      )}

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-4 text-center text-xs text-rose-400 px-8">{error}</p>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => processFiles(e.target.files)}
      />
    </section>
  );
}
