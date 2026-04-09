import { useState } from 'react';
import { invitationData as data } from '@/data/invitation.data';
import CoverSection    from '@/components/sections/CoverSection';
import GreetingSection from '@/components/sections/GreetingSection';
import GallerySection  from '@/components/sections/GallerySection';
import CalendarSection from '@/components/sections/CalendarSection';
import LocationSection from '@/components/sections/LocationSection';
import AccountSection  from '@/components/sections/AccountSection';
import ScrollProgress  from '@/components/ui/ScrollProgress';
import ScrollToTop     from '@/components/ui/ScrollToTop';
import SectionNav      from '@/components/ui/SectionNav';

export default function InvitationPage() {
  const [images, setImages] = useState<string[]>(data.images);

  return (
    <>
      {/* 상단 스크롤 진행 바 */}
      <ScrollProgress />

      {/* 우측 섹션 네비게이션 도트 */}
      <SectionNav />

      {/* 맨 위로 버튼 */}
      <ScrollToTop />

      {/* 본문 컨테이너 — max-w-[430px]: 가장 큰 모바일 기준, 데스크탑에서는 중앙 정렬 */}
      <div className="max-w-[430px] mx-auto min-h-svh bg-white">
        <CoverSection
          groomName={data.groomName}
          brideName={data.brideName}
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
          location={data.location}
        />

        <GreetingSection
          greetingMessage={data.greetingMessage}
          groomName={data.groomName}
          brideName={data.brideName}
          groomParents={data.groomParents}
          brideParents={data.brideParents}
        />

        <GallerySection
          images={images}
          onAddImages={urls => setImages(prev => [...prev, ...urls])}
        />

        <CalendarSection
          weddingDate={data.weddingDate}
          weddingTime={data.weddingTime}
        />

        <LocationSection location={data.location} />

        <AccountSection accounts={data.accounts} />

        {/* 푸터 */}
        <footer className="py-12 text-center safe-area bg-stone-50">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-gray-200" />
            <span className="text-gray-300 text-xs">♥</span>
            <div className="w-8 h-px bg-gray-200" />
          </div>
          <p className="text-[10px] tracking-[0.4em] text-gray-300 uppercase">
            {data.groomName} &amp; {data.brideName}
          </p>
        </footer>
      </div>
    </>
  );
}
