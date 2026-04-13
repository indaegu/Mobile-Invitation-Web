"use client";

import type { LocationInfo } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationLocationSectionProps {
  location: LocationInfo;
}

function buildOpenStreetMapUrl(location: LocationInfo) {
  const delta = 0.005;
  const bbox = [
    location.lng - delta,
    location.lat - delta,
    location.lng + delta,
    location.lat + delta,
  ].join(",");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lng}`;
}

export default function InvitationLocationSection({
  location,
}: InvitationLocationSectionProps) {
  const kakaoUrl = `https://map.kakao.com/link/map/${encodeURIComponent(location.name)},${location.lat},${location.lng}`;
  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(location.name)}`;

  return (
    <section className="bg-white px-6 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">Location</p>
          <h2 className="font-serif mt-2 text-[1.55rem] leading-none">
            오시는 길
          </h2>
          <p className="font-serif mt-5 text-[1.08rem] leading-[1.8] text-[rgba(23,20,18,0.86)]">
            {location.name}
            <br />
            <span className="text-sm text-[rgba(23,20,18,0.56)]">
              {location.address}
            </span>
          </p>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale" delay={100}>
        <div className="overflow-hidden rounded-[1.8rem] border border-[rgba(23,20,18,0.08)] shadow-[0_20px_40px_rgba(23,20,18,0.08)]">
          <iframe
            title="예식장 위치"
            src={buildOpenStreetMapUrl(location)}
            className="h-[21rem] w-full border-0"
            loading="lazy"
          />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#f4de8d] bg-[#fff4c4] px-4 py-3 text-center text-sm text-[#5e4b02]"
          >
            카카오맵
          </a>
          <a
            href={naverUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#bde2c6] bg-[#edfff0] px-4 py-3 text-center text-sm text-[#1a6b39]"
          >
            네이버지도
          </a>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={300}>
        <div className="paper-panel mt-6 rounded-[1.6rem] px-5 py-5">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[rgba(23,20,18,0.34)]">
            Transportation
          </p>
          <div className="mt-4 space-y-3">
            {location.transport?.split("\n").map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#171412]" />
                <p className="text-sm leading-[1.8] text-[rgba(23,20,18,0.64)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
