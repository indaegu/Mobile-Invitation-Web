"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationGallerySectionProps {
  images: string[];
}

export default function InvitationGallerySection({
  images,
}: InvitationGallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">Gallery</p>
          <h2 className="font-serif mt-2 text-[1.55rem]">웨딩 갤러리</h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale" delay={100}>
        <div className="soft-card rounded-[2rem] p-3">
          <div className="overflow-hidden rounded-[1.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={`웨딩 갤러리 대표 이미지 ${activeIndex + 1}`}
              className="h-[27rem] w-full object-cover"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`갤러리 이미지 ${index + 1} 보기`}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-7 bg-[#171412]"
                    : "w-1.5 bg-[rgba(23,20,18,0.22)]"
                }`}
              />
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-[0.9rem] border ${
                activeIndex === index
                  ? "border-[rgba(23,20,18,0.75)]"
                  : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`웨딩 갤러리 썸네일 ${index + 1}`}
                className="h-16 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
