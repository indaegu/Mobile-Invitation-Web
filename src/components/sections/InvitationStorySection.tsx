"use client";

import type { ParentInfo } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationStorySectionProps {
  groomName: string;
  brideName: string;
  groomParents?: ParentInfo;
  brideParents?: ParentInfo;
  invitationTitle: string;
  invitationBody: string[];
  storyImages: string[];
}

function formatFamilyLine(
  parents: ParentInfo | undefined,
  suffix: string,
  name: string,
) {
  if (!parents) return "";
  return `${parents.father}·${parents.mother}${suffix} ${name}`;
}

export default function InvitationStorySection({
  groomName,
  brideName,
  groomParents,
  brideParents,
  invitationTitle,
  invitationBody,
  storyImages,
}: InvitationStorySectionProps) {
  const groomLine = formatFamilyLine(groomParents, "의 아들", groomName);
  const brideLine = formatFamilyLine(brideParents, "의 딸", brideName);

  return (
    <section className="bg-white px-6 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">We become who we are</p>
          <h2 className="font-serif mt-2 text-[1.55rem] leading-[1.55] text-[rgba(23,20,18,0.96)]">
            {invitationTitle}
          </h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={100}>
        <div className="paper-panel rounded-[1.75rem] px-6 py-8">
          <div className="space-y-5 text-center">
            {invitationBody.map((paragraph) => (
              <p
                key={paragraph}
                className="font-serif text-[0.94rem] leading-[2] text-[rgba(23,20,18,0.72)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="my-8 flex items-center justify-center">
            <div className="section-divider w-20" />
            <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(23,20,18,0.08)] bg-white">
              <span className="font-display text-[1.4rem] text-[rgba(23,20,18,0.78)]">
                ♥
              </span>
            </div>
            <div className="section-divider w-20" />
          </div>

          <div className="space-y-2 text-center">
            <p className="font-serif text-sm leading-[1.9] text-[rgba(23,20,18,0.78)]">
              {groomLine}
            </p>
            <p className="font-serif text-sm leading-[1.9] text-[rgba(23,20,18,0.78)]">
              {brideLine}
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <div className="mt-10 grid grid-cols-2 gap-4">
          {storyImages.map((image, index) => (
            <article
              key={image}
              className="soft-card overflow-hidden rounded-[1.4rem] p-2"
            >
              <div className="image-mask h-48 bg-[#e8e0d3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={
                    index === 0
                      ? `${groomName} 프로필 이미지`
                      : `${brideName} 프로필 이미지`
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
