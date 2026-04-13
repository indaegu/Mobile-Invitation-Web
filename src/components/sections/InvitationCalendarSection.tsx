"use client";

import { downloadICS, generateGoogleCalendarUrl } from "@/lib/calendarUtils";
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

function buildCalendarCells(weddingDate: string) {
  const currentDate = new Date(`${weddingDate}T00:00:00`);
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: lastDate }, (_, index) => index + 1),
  ];
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
  const countdown = getCountdown(weddingDate, weddingTime);
  const eventDate = new Date(`${weddingDate}T${weddingTime}:00`);
  const weddingDay = eventDate.getDate();
  const calendarCells = buildCalendarCells(weddingDate);

  return (
    <section className="bg-[#f7f4ef] px-4 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">Wedding Day</p>
          <h2 className="font-serif mt-2 text-[1.55rem] leading-none">
            {formatWeddingText(weddingDate, weddingTime)}
          </h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale" delay={100}>
        <div className="paper-panel rounded-[2rem] px-4 py-5">
          <div className="mb-6 grid grid-cols-4 gap-2">
            {[
              { label: "DAYS", value: countdown.days },
              { label: "HOUR", value: countdown.hours },
              { label: "MIN", value: countdown.minutes },
              { label: "SEC", value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="soft-card rounded-[1.3rem] px-2 py-4 text-center"
              >
                <p className="text-[0.62rem] tracking-[0.22em] text-[rgba(23,20,18,0.38)]">
                  {item.label}
                </p>
                <p className="font-display mt-2 text-[1.9rem] leading-none">
                  {String(item.value).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-[1.4rem] bg-white px-4 py-3 text-center">
            <p className="font-serif text-sm leading-[1.8] text-[rgba(23,20,18,0.82)]">
              {brideName} ♥ {groomName}의 결혼식이{" "}
              <span className="font-bold text-[#f04d23]">
                {countdown.days}일
              </span>{" "}
              남았습니다.
            </p>
          </div>

          <div className="rounded-[1.6rem] bg-white px-4 py-5">
            <div className="mb-4 grid grid-cols-7 gap-y-3 text-center text-xs text-[rgba(23,20,18,0.38)]">
              {DAY_NAMES.map((dayName) => (
                <span key={dayName}>{dayName}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-3 text-center">
              {calendarCells.map((value, index) => (
                <div key={`${value}-${index}`} className="flex justify-center">
                  {value ? (
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                        value === weddingDay
                          ? "bg-[#f04d23] text-white shadow-[0_10px_22px_rgba(240,77,35,0.28)]"
                          : "text-[rgba(23,20,18,0.68)]"
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    <span className="h-9 w-9" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={generateGoogleCalendarUrl({
                title: `${groomName} ♥ ${brideName} 결혼식`,
                date: weddingDate,
                time: weddingTime,
                location: locationName,
                durationMinutes: 120,
              })}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full border border-[rgba(23,20,18,0.08)] bg-white px-5 py-3 text-center text-sm text-[rgba(23,20,18,0.82)]"
            >
              구글 캘린더에 추가
            </a>
            <button
              type="button"
              onClick={() =>
                downloadICS(
                  {
                    title: `${groomName} ♥ ${brideName} 결혼식`,
                    date: weddingDate,
                    time: weddingTime,
                    location: locationName,
                    durationMinutes: 120,
                  },
                  "wedding-day.ics",
                )
              }
              className="flex-1 rounded-full bg-[#111111] px-5 py-3 text-sm text-white"
            >
              일정 저장하기
            </button>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
