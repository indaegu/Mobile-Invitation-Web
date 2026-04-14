"use client";

import { useState } from "react";
import type { InterviewCard, PersonProfile } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationAboutSectionProps {
  coupleSince: string;
  profiles: PersonProfile[];
  interviews: InterviewCard[];
}

export default function InvitationAboutSection({
  coupleSince,
  profiles,
  interviews,
}: InvitationAboutSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + interviews.length) % interviews.length);
  const handleNext = () => setActiveIndex((i) => (i + 1) % interviews.length);

  const current = interviews[activeIndex];

  return (
    <section className="bg-[#f7f4ef] px-6 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-10 text-center">
          <p className="section-kicker">About Us</p>
          <h2 className="font-serif mt-2 text-[1.55rem]">저희를 소개합니다</h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={100}>
        <div className="grid grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <article
              key={profile.name}
              className="soft-card rounded-[1.55rem] p-2"
            >
              <div className="overflow-hidden rounded-[1.1rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.image}
                  alt={`${profile.role} ${profile.name} 프로필 이미지`}
                  className="h-44 w-full object-cover"
                />
              </div>
              <div className="px-3 pb-3 pt-4 text-center">
                <p className="font-serif text-[1rem] text-[rgba(23,20,18,0.94)]">
                  {profile.role} {profile.name}
                </p>
                <p className="mt-2 text-[0.78rem] leading-[1.7] text-[rgba(23,20,18,0.52)]">
                  {profile.summary}
                </p>
                <p className="mt-3 text-[0.74rem] tracking-[0.12em] text-[rgba(23,20,18,0.44)]">
                  {profile.tags.join(" ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <p className="mt-5 text-center text-sm leading-[1.9] text-[rgba(23,20,18,0.58)]">
          {coupleSince}
        </p>
      </AnimateOnScroll>

      {/* 인터뷰 섹션 */}
      {interviews.length > 0 && (
        <AnimateOnScroll animation="fade-up" delay={300}>
          <div className="mt-10 text-center">
            <p className="section-kicker">Interview</p>
            <h3 className="font-serif mt-2 text-[1.3rem] text-[rgba(23,20,18,0.92)]">
              우리에게 물었습니다
            </h3>
          </div>

          {/* 캐러셀 */}
          <div className="relative mt-6">
            <article className="min-h-48 rounded-[1.4rem] border border-[rgba(23,20,18,0.12)] bg-white p-5">
              <p className="font-serif text-[1rem] text-[rgba(23,20,18,0.92)]">
                {current?.question}
              </p>
              <div className="mt-4 space-y-4">
                {current?.answers.map((answer) => (
                  <div key={`${current.question}-${answer.speaker}`}>
                    <p className="text-[0.76rem] uppercase tracking-[0.22em] text-[rgba(23,20,18,0.36)]">
                      {answer.speaker}
                    </p>
                    <p className="mt-2 text-sm leading-[1.8] text-[rgba(23,20,18,0.68)]">
                      {answer.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* 좌우 버튼 */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="이전 질문"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[rgba(23,20,18,0.56)] shadow-[0_4px_12px_rgba(23,20,18,0.08)] transition-opacity active:opacity-70"
              >
                ‹
              </button>

              {/* 인디케이터 */}
              <div className="flex gap-2">
                {interviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`${i + 1}번 질문`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-6 bg-[#171412]"
                        : "w-1.5 bg-[rgba(23,20,18,0.22)]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="다음 질문"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[rgba(23,20,18,0.56)] shadow-[0_4px_12px_rgba(23,20,18,0.08)] transition-opacity active:opacity-70"
              >
                ›
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      )}
    </section>
  );
}
