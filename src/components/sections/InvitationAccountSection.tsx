"use client";

import { useState } from "react";
import type { AccountGroup } from "@/types/invitation.type";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface InvitationAccountSectionProps {
  accountGroups: AccountGroup[];
}

function AccountItem({
  owner,
  bank,
  accountNumber,
}: AccountGroup["items"][number]) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${bank} ${accountNumber}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <li className="flex items-center justify-between gap-4 border-b border-[rgba(23,20,18,0.08)] py-3 last:border-b-0">
      <div>
        <p className="text-[0.74rem] uppercase tracking-[0.2em] text-[rgba(23,20,18,0.32)]">
          {owner}
        </p>
        <p className="mt-1 font-serif text-[1rem] text-[rgba(23,20,18,0.88)]">
          {bank}
        </p>
        <p className="mt-1 text-sm tracking-[0.08em] text-[rgba(23,20,18,0.62)]">
          {accountNumber}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`min-w-[4.25rem] rounded-full px-4 py-2 text-xs transition-colors ${
          copied
            ? "bg-[#171412] text-white"
            : "bg-[rgba(23,20,18,0.06)] text-[rgba(23,20,18,0.72)]"
        }`}
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </li>
  );
}

export default function InvitationAccountSection({
  accountGroups,
}: InvitationAccountSectionProps) {
  // 기본값 null = 모두 닫힘
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f7f4ef] px-6 py-14">
      {/* 헤더 */}
      <AnimateOnScroll animation="fade-up">
        <div className="mb-10 text-center">
          <p className="section-kicker">Account</p>
          <h2 className="font-serif mt-2 text-[1.55rem]">마음 전하는 곳</h2>
          <p className="font-serif mt-5 text-[0.94rem] leading-[2.1] text-[rgba(23,20,18,0.62)]">
            비대면으로 축하를 전하고자
            <br />
            하시는 분들을 위해 기재하였습니다.
            <br />
            너그러운 마음으로 양해 부탁드립니다.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="space-y-3">
        {accountGroups.map((group, index) => {
          const isOpen = openIndex === index;

          return (
            <AnimateOnScroll
              key={group.title}
              animation="fade-up"
              delay={index === 0 ? 0 : 100}
            >
              <div className="soft-card overflow-hidden rounded-[1.5rem]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex((previous) =>
                      previous === index ? null : index,
                    )
                  }
                >
                  <div>
                    <p className="section-kicker">Account</p>
                    <p className="font-serif mt-1 text-[1.18rem] text-[rgba(23,20,18,0.92)]">
                      {group.title}
                    </p>
                  </div>
                  <span
                    className={`text-lg text-[rgba(23,20,18,0.42)] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[rgba(23,20,18,0.08)] px-5 py-2">
                    <ul>
                      {group.items.map((item) => (
                        <AccountItem
                          key={`${group.title}-${item.owner}`}
                          {...item}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}
