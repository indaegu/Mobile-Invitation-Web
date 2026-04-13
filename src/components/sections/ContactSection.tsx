"use client";

import { useState } from "react";
import type { ContactPerson, InvitationData } from "@/types/invitation.type";
import { toTelHref } from "@/lib/formatPhone";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type Props = Pick<InvitationData, "contacts">;
type Delay = 0 | 100 | 200 | 300 | 400 | 500 | 600;
const PARENT_STAGGER: Delay[] = [0, 100, 200, 300, 400, 500, 600];

const COUPLE_ROLES = ["신랑", "신부"];

function ContactItem({ person }: { person: ContactPerson }) {
  return (
    <a
      href={toTelHref(person.phone)}
      className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-transform"
      aria-label={`${person.role} ${person.name}에게 전화`}
    >
      <div className="space-y-0.5">
        <p className="text-[11px] text-gray-400 tracking-wide">{person.role}</p>
        <p className="text-sm font-medium text-gray-700">{person.name}</p>
        <p className="text-xs text-gray-400 tabular-nums tracking-wider">
          {person.phone}
        </p>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-50 border border-rose-100">
        <svg
          className="w-4 h-4 text-rose-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </div>
    </a>
  );
}

export default function ContactSection({ contacts }: Props) {
  const [showParents, setShowParents] = useState(false);

  const coupleContacts = contacts.filter((c) => COUPLE_ROLES.includes(c.role));
  const parentContacts = contacts.filter((c) => !COUPLE_ROLES.includes(c.role));

  return (
    <section
      id="contact"
      className="snap-section min-h-svh flex flex-col justify-center px-8 py-20 bg-stone-50"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="Contact" ko="연락처" />
      </AnimateOnScroll>

      {/* 신랑·신부 */}
      <div className="space-y-3 mb-4">
        {coupleContacts.map((person, i) => (
          <AnimateOnScroll
            key={person.role}
            animation="fade-right"
            delay={i === 0 ? 0 : 100}
          >
            <ContactItem person={person} />
          </AnimateOnScroll>
        ))}
      </div>

      {/* 혼주 토글 */}
      {parentContacts.length > 0 && (
        <AnimateOnScroll animation="fade-up" delay={200}>
          <button
            onClick={() => setShowParents((prev) => !prev)}
            className="w-full py-3 text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
            aria-expanded={showParents}
            aria-controls="parent-contacts"
          >
            <span>{showParents ? "혼주 연락처 닫기" : "혼주 연락처 보기"}</span>
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${showParents ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 혼주 목록 */}
          {showParents && (
            <div id="parent-contacts" className="mt-3 space-y-3">
              {parentContacts.map((person, i) => (
                <AnimateOnScroll
                  key={person.role}
                  animation="fade-up"
                  delay={PARENT_STAGGER[Math.min(i, PARENT_STAGGER.length - 1)]}
                >
                  <ContactItem person={person} />
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </AnimateOnScroll>
      )}
    </section>
  );
}
