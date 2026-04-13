'use client'

import { useEffect, useState } from 'react';

type SectionDef = { id: string; label: string };

const SECTIONS: SectionDef[] = [
  { id: 'cover',     label: '커버'   },
  { id: 'greeting',  label: '인사말' },
  { id: 'gallery',   label: '갤러리' },
  { id: 'calendar',  label: '날짜'   },
  { id: 'location',  label: '위치'   },
  { id: 'contact',   label: '연락처' },
  { id: 'rsvp',      label: 'RSVP'  },
  { id: 'guestbook', label: '방명록' },
  { id: 'account',   label: '계좌'   },
];

export default function SectionNav() {
  const [active, setActive] = useState('cover');

  useEffect(() => {
    // 스크롤 위치 기준으로 뷰포트 중앙에 가장 가까운 섹션을 활성화
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let nearest = SECTIONS[0].id;
      let minDist = Infinity;

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - mid);
        if (dist < minDist) { minDist = dist; nearest = id; }
      });

      setActive(nearest);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      aria-label="섹션 네비게이션"
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={label}
          className="group relative flex items-center justify-center"
        >
          {/* 닷 */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? 'w-2 h-2 bg-rose-400'
                : 'w-1.5 h-1.5 bg-gray-300 group-hover:bg-gray-400'
            }`}
          />
          {/* 툴팁 */}
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 bg-white border border-gray-100 shadow-sm rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
