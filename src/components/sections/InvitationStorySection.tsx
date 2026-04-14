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

/** 문장 단위로 분리 (마침표+공백 기준) */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=합니다|습니다|겠습니다|드립니다|니다|세요|어요|아요|요)\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 제목에서 "가을," 이후 줄바꿈 */
function renderTitleWithBreak(title: string) {
  const breakPoint = title.indexOf("가을,");
  if (breakPoint === -1) return title;
  const before = title.slice(0, breakPoint + 3); // "다섯 번째 가을,"
  const after = title.slice(breakPoint + 3).trimStart(); // "우리는 '우리'가 됩니다."
  return (
    <>
      {before}
      <br />
      {after}
    </>
  );
}

function FamilyLine({
  parents,
  suffix,
  name,
}: {
  parents: ParentInfo | undefined;
  suffix: string;
  name: string;
}) {
  if (!parents) return null;
  return (
    <p className="font-serif text-sm leading-[1.9] text-[rgba(23,20,18,0.78)]">
      <span className="font-semibold">{parents.father}</span>
      {"·"}
      <span className="font-semibold">{parents.mother}</span>
      {suffix} <span className="font-semibold">{name}</span>
    </p>
  );
}

export default function InvitationStorySection({
  groomName,
  brideName,
  groomParents,
  brideParents,
  invitationTitle,
  invitationBody,
  storyImages: _storyImages,
}: InvitationStorySectionProps) {
  return (
    <section className="bg-white px-6 py-14">
      <AnimateOnScroll animation="fade-up">
        <div className="mb-8 text-center">
          <p className="section-kicker">We become who we are</p>
          <h2 className="font-serif mt-2 text-[1.5rem] leading-[1.55] text-[rgba(23,20,18,0.96)] font-semibold">
            {renderTitleWithBreak(invitationTitle)}
          </h2>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={100}>
        <div className="space-y-5 text-center">
          {invitationBody.map((paragraph) => (
            <p
              key={paragraph}
              className="font-serif text-[0.94rem] leading-loose text-[rgba(23,20,18,0.72)]"
            >
              {splitSentences(paragraph).map((sentence, i, arr) => (
                <span key={i}>
                  {sentence}
                  {i < arr.length - 1 ? (
                    <>
                      {"."}
                      <br />
                    </>
                  ) : (
                    "."
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
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
          <FamilyLine
            parents={groomParents}
            suffix="의 아들"
            name={groomName}
          />
          <FamilyLine parents={brideParents} suffix="의 딸" name={brideName} />
        </div>
      </AnimateOnScroll>
    </section>
  );
}
