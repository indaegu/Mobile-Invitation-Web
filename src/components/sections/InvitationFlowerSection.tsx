"use client";

import { useState } from "react";
import type { FlowerOption } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationFlowerSectionProps {
  flowerMessage: string[];
  flowerOptions: FlowerOption[];
}

export default function InvitationFlowerSection({
  flowerMessage,
  flowerOptions,
}: InvitationFlowerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="bg-white px-6 py-14">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center">
            <p className="section-kicker">Flower</p>
            <h2 className="font-serif mt-2 text-[1.55rem]">축하 화환</h2>
            <div className="mt-6 space-y-2">
              {flowerMessage.map((line) => (
                <p
                  key={line}
                  className="font-serif text-[0.95rem] leading-[1.9] text-[rgba(23,20,18,0.68)]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-full bg-[#111111] px-7 py-3 text-sm text-white shadow-[0_16px_30px_rgba(17,17,17,0.2)]"
            >
              화환 보내기
            </button>
          </div>
        </AnimateOnScroll>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-[rgba(17,17,17,0.45)] p-3 sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="화환 주문 안내"
        >
          <div className="w-full max-w-sm rounded-[1.8rem] bg-white p-5 shadow-[0_30px_80px_rgba(17,17,17,0.24)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Flower</p>
                <h3 className="font-serif mt-1 text-[1.3rem]">화환 보내기</h3>
                <p className="mt-2 text-sm leading-[1.8] text-[rgba(23,20,18,0.62)]">
                  축하해주셔서 감사드립니다. 편한 구성을 골라 마음을 전해주세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="화환 안내 닫기"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(23,20,18,0.06)] text-lg text-[rgba(23,20,18,0.6)]"
              >
                ×
              </button>
            </div>

            <ul className="space-y-3">
              {flowerOptions.map((option) => (
                <li
                  key={option.name}
                  className="rounded-[1.25rem] border border-[rgba(23,20,18,0.08)] px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-[1rem] text-[rgba(23,20,18,0.9)]">
                        {option.name}
                      </p>
                      <p className="mt-1 text-sm text-[rgba(23,20,18,0.46)]">
                        {option.price}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-[1.7] text-[rgba(23,20,18,0.62)]">
                    {option.description}
                  </p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-5 w-full rounded-full bg-[#111111] px-5 py-3 text-sm text-white"
            >
              주문하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
