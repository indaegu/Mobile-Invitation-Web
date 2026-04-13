import type { InvitationData } from "@/types/invitation.type";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type Props = Pick<
  InvitationData,
  | "greetingMessage"
  | "groomName"
  | "brideName"
  | "groomParents"
  | "brideParents"
>;

export default function GreetingSection({
  greetingMessage,
  groomName,
  brideName,
  groomParents,
  brideParents,
}: Props) {
  return (
    <section
      id="greeting"
      className="snap-section min-h-svh flex flex-col items-center justify-center px-8 py-20 text-center bg-white"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="Greeting" ko="인사말" />
      </AnimateOnScroll>

      {/* 인사말 본문 */}
      <AnimateOnScroll animation="fade-up" delay={200}>
        <p className="text-sm leading-[2.2] text-gray-600 whitespace-pre-line tracking-wide max-w-xs">
          {greetingMessage}
        </p>
      </AnimateOnScroll>

      {/* 부모님 정보 */}
      {(groomParents || brideParents) && (
        <AnimateOnScroll animation="fade-up" delay={400}>
          <div className="mt-10 pt-8 border-t border-gray-100 space-y-2 text-xs text-gray-400">
            {groomParents && (
              <p>
                <span className="text-gray-300">
                  {groomParents.father} · {groomParents.mother}
                </span>
                &ensp;의 아들&ensp;
                <span className="text-gray-600 font-medium">{groomName}</span>
              </p>
            )}
            {brideParents && (
              <p>
                <span className="text-gray-300">
                  {brideParents.father} · {brideParents.mother}
                </span>
                &ensp;의 딸&ensp;
                <span className="text-gray-600 font-medium">{brideName}</span>
              </p>
            )}
          </div>
        </AnimateOnScroll>
      )}
    </section>
  );
}
