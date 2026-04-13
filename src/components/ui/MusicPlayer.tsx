'use client'

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
};

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.4;

    const onCanPlay = () => setReady(true);
    audio.addEventListener('canplay', onCanPlay);
    return () => audio.removeEventListener('canplay', onCanPlay);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {
        // 브라우저 autoplay 정책으로 실패하는 경우 무시
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={toggle}
        aria-label={playing ? '음악 일시정지' : '음악 재생'}
        aria-pressed={playing}
        className={`fixed bottom-6 left-4 z-50 w-11 h-11 rounded-full border shadow-md flex items-center justify-center transition-all duration-300 active:scale-95 ${
          playing
            ? 'bg-rose-400 border-rose-300 text-white'
            : 'bg-white border-gray-200 text-gray-400'
        } ${!ready ? 'opacity-40 cursor-not-allowed' : ''}`}
        disabled={!ready}
      >
        {playing ? (
          /* 일시정지 아이콘 — 두 개 세로 바 */
          <span className="flex gap-0.5 items-end h-4" aria-hidden="true">
            <span className={`w-0.5 rounded-sm bg-white music-bar-1`} />
            <span className={`w-0.5 rounded-sm bg-white music-bar-2`} />
            <span className={`w-0.5 rounded-sm bg-white music-bar-3`} />
          </span>
        ) : (
          /* 재생 아이콘 — 음표 */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
      </button>
    </>
  );
}
