"use client";

import { useState, useEffect } from "react";
import { generateGoogleCalendarUrl } from "@/lib/calendarUtils";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationCalendarSectionProps {
  weddingDate: string;
  weddingTime: string;
  groomName: string;
  brideName: string;
  locationName: string;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

function getCountdown(weddingDate: string, weddingTime: string) {
  const eventDate = new Date(`${weddingDate}T${weddingTime}:00`);
  const diff = Math.max(eventDate.getTime() - Date.now(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function formatWeddingText(weddingDate: string, weddingTime: string) {
  const date = new Date(`${weddingDate}T${weddingTime}:00`);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${DAY_NAMES[date.getDay()]}) ${weddingTime}`;
}

export default function InvitationCalendarSection({
  weddingDate,
  weddingTime,
  groomName,
  brideName,
  locationName,
}: InvitationCalendarSectionProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setCountdown(getCountdown(weddingDate, weddingTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [weddingDate, weddingTime]);

  const eventDate = new Date(`${weddingDate}T${weddingTime}:00`);
  const weddingDay = eventDate.getDate();
  const firstDay = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    1,
  ).getDay();
  const lastDate = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth() + 1,
    0,
  ).getDate();

  const calendarCells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  const googleCalUrl = generateGoogleCalendarUrl({
    title: `${groomName} ♥ ${brideName} 결혼식`,
    date: weddingDate,
    time: weddingTime,
    location: locationName,
    durationMinutes: 120,
  });

  return (
    <section className="bg-[#f7f4ef] px-4 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">Wedding Day</p>
          <h2 className="font-serif mt-2 text-[1.55rem] leading-none font-semibold">
            {formatWeddingText(weddingDate, weddingTime)}
          </h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={100}>
        {/* 요일 헤더 */}
        <div className="mb-3 grid grid-cols-7 text-center text-xs text-[rgba(23,20,18,0.38)]">
          {DAY_NAMES.map((dayName, i) => (
            <span
              key={dayName}
              className={
                i === 0 ? "text-rose-400" : i === 6 ? "text-sky-500" : ""
              }
            >
              {dayName}
            </span>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-3 text-center">
          {calendarCells.map((value, index) => {
            const col = index % 7;

            // 첫 번째 빈 셀: "캘린더 추가하기" 말풍선으로 대체
            if (index === 0 && firstDay > 0) {
              return (
                <div
                  key="calendar-add-btn"
                  style={{ gridColumn: `span ${firstDay}` }}
                  className="flex items-center"
                >
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative flex items-center gap-1 rounded-full bg-[#3b82f6] px-3 py-2 text-[0.75rem] font-medium text-white shadow-[0_4px_14px_rgba(59,130,246,0.38)]"
                  >
                    캘린더 추가하기
                    <span className="text-[0.7rem]">›</span>
                    {/* 말풍선 꼬리 */}
                    <span className="absolute -bottom-1.5 left-5 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#3b82f6]" />
                  </a>
                </div>
              );
            }

            // 첫 번째 이후의 빈 셀(말풍선에 흡수된 null)은 건너뜀
            if (value === null) return null;

            const isWedding = value === weddingDay;
            return (
              <div key={`cell-${index}`} className="flex justify-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                    isWedding
                      ? "bg-[#f04d23] font-semibold text-white shadow-[0_10px_22px_rgba(240,77,35,0.28)]"
                      : col === 0
                        ? "text-rose-400"
                        : col === 6
                          ? "text-sky-500"
                          : "text-[rgba(23,20,18,0.68)]"
                  }`}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </AnimateOnScroll>

      {/* 카운트다운 */}
      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="mt-10 grid grid-cols-4 gap-2">
          {[
            { label: "DAYS", value: countdown.days },
            { label: "HOUR", value: countdown.hours },
            { label: "MIN", value: countdown.minutes },
            { label: "SEC", value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.3rem] bg-white px-2 py-4 text-center shadow-[0_4px_16px_rgba(23,20,18,0.06)]"
            >
              <p className="text-[0.62rem] tracking-[0.22em] text-[rgba(23,20,18,0.38)]">
                {item.label}
              </p>
              <p className="font-display mt-2 text-[1.9rem] leading-none">
                {mounted ? String(item.value).padStart(2, "0") : "--"}
              </p>
            </div>
          ))}
        </div>
      </AnimateOnScroll>

      {/* D-day 메시지 */}
      <AnimateOnScroll animation="fade-up" delay={300}>
        <p className="mt-5 text-center font-serif text-sm leading-[1.8] text-[rgba(23,20,18,0.82)]">
          {brideName} ♥ {groomName}의 결혼식이{" "}
          <span className="font-bold text-[#f04d23]">
            {mounted ? countdown.days : "--"}일
          </span>{" "}
          남았습니다.
        </p>
      </AnimateOnScroll>
    </section>
  );
}
