"use client";

import { useState } from "react";
import type { ContactPerson } from "@/types/invitation.type";
import { toTelHref } from "@/lib/formatPhone";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationContactSectionProps {
  contacts: ContactPerson[];
}

function ContactLink({ person }: { person: ContactPerson }) {
  return (
    <a
      href={toTelHref(person.phone)}
      className="flex items-center justify-between border-b border-[rgba(23,20,18,0.08)] py-3 last:border-b-0"
      aria-label={`${person.role} ${person.name}에게 전화`}
    >
      <div>
        <p className="text-[0.72rem] tracking-[0.18em] text-[rgba(23,20,18,0.38)] uppercase">
          {person.role}
        </p>
        <p className="mt-1 font-serif text-[1rem] text-[rgba(23,20,18,0.88)]">
          {person.name}
        </p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(23,20,18,0.06)]">
        <svg
          className="h-4 w-4 text-[rgba(23,20,18,0.72)]"
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

export default function InvitationContactSection({
  contacts,
}: InvitationContactSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const groomContacts = contacts.filter((person) =>
    person.role.startsWith("신랑"),
  );
  const brideContacts = contacts.filter((person) =>
    person.role.startsWith("신부"),
  );

  return (
    <section className="bg-white px-6 pb-6">
      <AnimateOnScroll animation="fade-up">
        <div className="soft-card overflow-hidden rounded-[1.6rem]">
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-controls="invitation-contact-panel"
            className="flex w-full items-center justify-between px-5 py-4"
          >
            <div className="text-left">
              <p className="section-kicker">Contact</p>
              <p className="font-serif mt-1 text-[1.2rem] text-[rgba(23,20,18,0.92)]">
                연락하기
              </p>
            </div>
            <span
              className={`text-lg text-[rgba(23,20,18,0.45)] transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {isOpen && (
            <div
              id="invitation-contact-panel"
              className="grid grid-cols-2 border-t border-[rgba(23,20,18,0.08)]"
            >
              <div className="border-r border-[rgba(23,20,18,0.08)] px-4 py-3">
                {groomContacts.map((person) => (
                  <ContactLink
                    key={`${person.role}-${person.phone}`}
                    person={person}
                  />
                ))}
              </div>
              <div className="px-4 py-3">
                {brideContacts.map((person) => (
                  <ContactLink
                    key={`${person.role}-${person.phone}`}
                    person={person}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
