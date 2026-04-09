import type { InvitationData } from '@/types/invitation.type';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = Pick<InvitationData, 'weddingDate' | 'weddingTime'>;

const DAY_NAMES   = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const hour   = h % 12 === 0 ? 12 : h % 12;
  return m > 0 ? `${period} ${hour}시 ${m}분` : `${period} ${hour}시`;
}

function daysUntil(weddingDate: string): number {
  const today   = new Date();
  today.setHours(0, 0, 0, 0);
  const wedding = new Date(weddingDate);
  wedding.setHours(0, 0, 0, 0);
  return Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CalendarSection({ weddingDate, weddingTime }: Props) {
  const date       = new Date(weddingDate);
  const year       = date.getFullYear();
  const month      = date.getMonth();
  const weddingDay = date.getDate();
  const dayName    = DAY_NAMES[date.getDay()];
  const remaining  = daysUntil(weddingDate);

  const firstDow = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  return (
    <section
      id="calendar"
      className="snap-section min-h-svh flex flex-col items-center justify-center px-8 py-20 text-center bg-white"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="Calendar" ko="날짜" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale" delay={100} className="w-full max-w-xs">
        {/* 연·월 */}
        <p className="text-base text-gray-600 mb-5 tracking-wider">
          {year}년 {MONTH_NAMES[month]}
        </p>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1.5">
          {DAY_NAMES.map((d, i) => (
            <span
              key={d}
              className={`text-[11px] font-medium py-1 ${
                i === 0 ? 'text-rose-400' : i === 6 ? 'text-sky-400' : 'text-gray-400'
              }`}
            >
              {d}
            </span>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const col        = idx % 7;
            const isWedding  = day === weddingDay;
            return (
              <div key={idx} className="flex items-center justify-center py-1">
                {day !== null && (
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                      isWedding
                        ? 'bg-rose-400 text-white font-semibold shadow-md ring-4 ring-rose-100'
                        : col === 0 ? 'text-rose-400'
                        : col === 6 ? 'text-sky-400'
                        : 'text-gray-600'
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </AnimateOnScroll>

      {/* 날짜 정보 */}
      <AnimateOnScroll animation="fade-up" delay={300}>
        <p className="mt-7 text-sm text-gray-500 tracking-wide">
          {year}년 {MONTH_NAMES[month]} {weddingDay}일 {dayName}요일&ensp;{formatTime(weddingTime)}
        </p>

        {/* D-day 카운터 */}
        {remaining >= 0 && (
          <div className="mt-5 inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-5 py-2">
            <span className="text-[11px] tracking-widest text-rose-400 uppercase">D-day</span>
            <span className="text-lg font-light text-rose-500">
              {remaining === 0 ? '오늘 ♥' : `-${remaining}`}
            </span>
          </div>
        )}
      </AnimateOnScroll>
    </section>
  );
}
