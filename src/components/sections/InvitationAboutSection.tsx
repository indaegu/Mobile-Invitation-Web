"use client";

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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {interviews.map((interview, index) => (
          <AnimateOnScroll
            key={interview.question}
            animation="fade-up"
            delay={index === 0 ? 0 : index === 1 ? 100 : 200}
          >
            <article className="rounded-[1.4rem] border border-[rgba(23,20,18,0.12)] bg-white p-5">
              <p className="font-serif text-[1rem] text-[rgba(23,20,18,0.92)]">
                {interview.question}
              </p>
              <div className="mt-4 space-y-4">
                {interview.answers.map((answer) => (
                  <div key={`${interview.question}-${answer.speaker}`}>
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
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
