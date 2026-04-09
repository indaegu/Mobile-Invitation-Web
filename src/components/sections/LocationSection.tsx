import type { InvitationData } from '@/types/invitation.type';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = Pick<InvitationData, 'location'>;

export default function LocationSection({ location }: Props) {
  // 실제 카카오맵 · 네이버지도 딥링크
  const kakaoUrl = `https://map.kakao.com/link/map/${encodeURIComponent(location.name)},${location.lat},${location.lng}`;
  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(location.name)}`;

  return (
    <section
      id="location"
      className="snap-section min-h-svh flex flex-col justify-center py-20 bg-stone-50"
    >
      <AnimateOnScroll animation="fade-up" className="px-8">
        <SectionTitle en="Location" ko="오시는 길" />
        <div className="text-center mb-6">
          <p className="text-base font-medium text-gray-700 tracking-wide">{location.name}</p>
          <p className="text-xs text-gray-400 mt-1.5">{location.address}</p>
        </div>
      </AnimateOnScroll>

      {/* 지도 플레이스홀더 (추후 카카오맵 SDK 연동) */}
      <AnimateOnScroll animation="scale" delay={100} className="mx-8 mb-5">
        <div className="h-52 bg-gray-100 rounded-3xl flex flex-col items-center justify-center gap-2 border border-gray-100">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <p className="text-xs text-gray-400">지도가 표시됩니다</p>
        </div>
      </AnimateOnScroll>

      {/* 지도 앱 버튼 */}
      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="flex gap-3 px-8 mb-8">
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 text-sm text-center rounded-2xl border border-yellow-300 text-yellow-700 bg-yellow-50 font-medium active:opacity-70 transition-opacity"
          >
            카카오맵
          </a>
          <a
            href={naverUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 text-sm text-center rounded-2xl border border-green-300 text-green-700 bg-green-50 font-medium active:opacity-70 transition-opacity"
          >
            네이버지도
          </a>
        </div>
      </AnimateOnScroll>

      {/* 교통편 */}
      {location.transport && (
        <AnimateOnScroll animation="fade-up" delay={300} className="px-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-3 text-center">
              Transportation
            </p>
            {location.transport.split('\n').map((line, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
                <span className="mt-1 w-1 h-1 rounded-full bg-rose-300 flex-none" />
                <p className="text-xs leading-5 text-gray-500">{line}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      )}
    </section>
  );
}
