"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationHeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationName: string;
  heroMessage: string;
  heroImage: string;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

function formatWeddingLabel(weddingDate: string, weddingTime: string) {
  const date = new Date(`${weddingDate}T${weddingTime}:00`);
  const dayName = DAY_NAMES[date.getDay()];

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")} (${dayName}) ${weddingTime}`;
}

export default function InvitationHeroSection({
  groomName,
  brideName,
  weddingDate,
  weddingTime,
  locationName,
  heroMessage,
  heroImage,
}: InvitationHeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden rounded-[2rem_2rem_0_0] bg-[#f4efe8]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={`${groomName} ${brideName} 메인 이미지`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.64)_0%,rgba(17,17,17,0.16)_32%,rgba(255,255,255,0)_52%,rgba(255,255,255,0.92)_78%,#fff_100%)]" />
      </div>

      <div className="relative flex min-h-[100svh] flex-col justify-between px-7 pb-14 pt-10 text-white">
        <div className="mt-32 pl-3 text-left">
          <AnimateOnScroll animation="fade">
            <p className="font-serif whitespace-pre-line text-[1.18rem] leading-[1.65] drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)]">
              {heroMessage}
            </p>
          </AnimateOnScroll>
        </div>

        <div className="text-[#171412]">
          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="mb-5">
              <p className="font-serif text-[1.5rem] leading-[1.45] font-semibold">
                신랑 {groomName} 신부 {brideName}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={400}>
            <p className="font-serif text-[0.98rem] leading-[1.8] text-[rgba(23,20,18,0.72)] font-semibold">
              {formatWeddingLabel(weddingDate, weddingTime)}
              <br />
              {locationName}
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
