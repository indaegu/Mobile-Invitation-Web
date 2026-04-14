"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { LocationInfo } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationLocationSectionProps {
  location: LocationInfo;
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "";

// 신라호텔 영빈관 고정 좌표
const VENUE_LAT = 37.55691;
const VENUE_LNG = 127.00512;
// 근처 역이 보이는 줌 레벨 (16 = 약 500m 반경)
const MAP_ZOOM = 16;

export default function InvitationLocationSection({
  location,
}: InvitationLocationSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);

  const initMap = () => {
    if (mapInitialized.current || !mapRef.current) return;
    if (typeof window === "undefined" || !window.naver) return;

    mapInitialized.current = true;
    const center = new window.naver.maps.LatLng(VENUE_LAT, VENUE_LNG);

    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: MAP_ZOOM,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
      logoControl: false,
      draggable: false,
      pinchZoom: false,
      scrollWheel: false,
      keyboardShortcuts: false,
      disableDoubleClickZoom: true,
    });

    new window.naver.maps.Marker({ position: center, map });
  };

  // 스크립트가 이미 로드된 경우(CSR 재방문)에도 지도 초기화
  useEffect(() => {
    if (window.naver) {
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(location.name)}`;
  const kakaoUrl = `https://map.kakao.com/link/map/${encodeURIComponent(location.name)},${location.lat},${location.lng}`;

  return (
    <>
      {NAVER_CLIENT_ID && (
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
          strategy="afterInteractive"
          onLoad={initMap}
        />
      )}

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
            {NAVER_CLIENT_ID ? (
              <div ref={mapRef} className="h-84 w-full" />
            ) : (
              <div className="flex h-84 w-full items-center justify-center bg-[#f7f4ef] text-sm text-[rgba(23,20,18,0.42)]">
                지도를 표시하려면 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID를
                설정해주세요.
              </div>
            )}
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
          <div className="mt-6 px-1">
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
    </>
  );
}
