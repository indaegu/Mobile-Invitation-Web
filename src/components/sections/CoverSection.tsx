import type { InvitationData } from '@/types/invitation.type';

type Props = Pick<InvitationData, 'groomName' | 'brideName' | 'weddingDate' | 'weddingTime' | 'location'>;

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default function CoverSection({ groomName, brideName, weddingDate, weddingTime, location }: Props) {
  const date    = new Date(weddingDate);
  const year    = date.getFullYear();
  const month   = String(date.getMonth() + 1).padStart(2, '0');
  const day     = String(date.getDate()).padStart(2, '0');
  const dayName = DAY_NAMES[date.getDay()];

  return (
    <section
      id="cover"
      className="snap-section relative h-svh flex flex-col items-center justify-center text-center overflow-hidden bg-stone-50"
    >
      {/* ── 배경 장식 구체 (floating) ── */}
      <div className="cover-orb absolute -top-20 -right-20 w-72 h-72 rounded-full bg-rose-100/40 pointer-events-none" />
      <div className="cover-orb absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-pink-100/40 pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-6 w-16 h-16 rounded-full bg-rose-50 pointer-events-none" />

      {/* ── 상단 장식 라인 ── */}
      <div className="cover-line absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gray-300" />

      {/* ── 메인 콘텐츠 ── */}
      <div className="relative z-10 flex flex-col items-center px-8">

        {/* 레이블 */}
        <p className="cover-enter-1 text-[9px] tracking-[0.65em] text-gray-400 uppercase mb-10">
          Wedding Invitation
        </p>

        {/* 이름 블록 */}
        <div className="cover-enter-2 flex items-stretch gap-6 mb-10">
          {/* 신랑 */}
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[11px] tracking-[0.4em] text-gray-400">신랑</span>
            <span className="text-3xl font-light text-gray-800 tracking-widest">{groomName}</span>
          </div>

          {/* 구분 (세로선 + 하트) */}
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="w-px h-5 bg-gray-200" />
            <span className="cover-heart text-rose-400 text-sm">♥</span>
            <div className="w-px h-5 bg-gray-200" />
          </div>

          {/* 신부 */}
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[11px] tracking-[0.4em] text-gray-400">신부</span>
            <span className="text-3xl font-light text-gray-800 tracking-widest">{brideName}</span>
          </div>
        </div>

        {/* 날짜·장소 */}
        <div className="cover-enter-3 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>{year}</span>
            <span className="text-gray-300">·</span>
            <span>{month}</span>
            <span className="text-gray-300">·</span>
            <span>{day}</span>
            <span className="text-gray-300">·</span>
            <span>{dayName}요일</span>
            <span className="text-gray-300">·</span>
            <span>{weddingTime}</span>
          </div>
          <p className="text-sm text-gray-500 tracking-wide">{location.name}</p>
        </div>
      </div>

      {/* ── 하단 장식 라인 ── */}
      <div className="cover-line absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-gray-300" />

      {/* ── 스크롤 유도 ── */}
      <div className="cover-enter-4 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
        <p className="text-[9px] tracking-[0.5em] text-gray-400 uppercase">Scroll</p>
      </div>
    </section>
  );
}
