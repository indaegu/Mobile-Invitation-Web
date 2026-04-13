"use client";

import { useState } from "react";
import type { GuestbookEntry } from "@/types/invitation.type";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const MAX_MESSAGE_LENGTH = 200;

function generateId(): string {
  return `gb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatEntryDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const SAMPLE_ENTRIES: GuestbookEntry[] = [
  {
    id: "sample-1",
    name: "이민준",
    message: "두 분의 결혼을 진심으로 축하합니다! 행복한 가정 이루세요 ♥",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "sample-2",
    name: "박서연",
    message: "오래오래 행복하게 사세요. 결혼 축하해요!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(SAMPLE_ENTRIES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    if (name.trim().length < 2) {
      setNameError("이름을 2자 이상 입력해주세요");
      valid = false;
    } else {
      setNameError("");
    }
    if (message.trim().length < 5) {
      setMessageError("메시지를 5자 이상 입력해주세요");
      valid = false;
    } else {
      setMessageError("");
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    const entry: GuestbookEntry = {
      id: generateId(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setName("");
    setMessage("");
    setSubmitting(false);
  };

  return (
    <section
      id="guestbook"
      className="snap-section min-h-svh flex flex-col justify-center px-8 py-20 bg-stone-50"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="Guestbook" ko="축하 메시지" />
      </AnimateOnScroll>

      {/* 작성 폼 */}
      <AnimateOnScroll animation="fade-up" delay={100}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.05)] mb-6"
        >
          {/* 이름 */}
          <div className="mb-3">
            <label
              htmlFor="gb-name"
              className="block text-xs text-gray-400 mb-1.5"
            >
              이름
            </label>
            <input
              id="gb-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder="홍길동"
              maxLength={20}
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-stone-50 outline-none transition-colors ${
                nameError
                  ? "border-rose-300"
                  : "border-gray-200 focus:border-rose-300"
              }`}
            />
            {nameError && (
              <p className="mt-1 text-xs text-rose-400">{nameError}</p>
            )}
          </div>

          {/* 메시지 */}
          <div className="mb-4">
            <label
              htmlFor="gb-message"
              className="block text-xs text-gray-400 mb-1.5"
            >
              메시지
              <span className="ml-1 text-gray-300">
                ({message.length}/{MAX_MESSAGE_LENGTH})
              </span>
            </label>
            <textarea
              id="gb-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (messageError) setMessageError("");
              }}
              placeholder="두 분의 결혼을 축하합니다 ♥"
              maxLength={MAX_MESSAGE_LENGTH}
              rows={3}
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-stone-50 outline-none resize-none transition-colors ${
                messageError
                  ? "border-rose-300"
                  : "border-gray-200 focus:border-rose-300"
              }`}
            />
            {messageError && (
              <p className="mt-1 text-xs text-rose-400">{messageError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-rose-400 text-white text-xs font-medium tracking-wide active:opacity-80 transition-opacity disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                전송 중...
              </span>
            ) : (
              "메시지 남기기"
            )}
          </button>
        </form>
      </AnimateOnScroll>

      {/* 메시지 목록 */}
      {entries.length > 0 && (
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <AnimateOnScroll
              key={entry.id}
              animation="fade-up"
              delay={
                Math.min(i * 100, 600) as 0 | 100 | 200 | 300 | 400 | 500 | 600
              }
            >
              <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    {entry.name}
                  </span>
                  <span className="text-[10px] text-gray-300">
                    {formatEntryDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-xs leading-5 text-gray-500 whitespace-pre-line">
                  {entry.message}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      )}
    </section>
  );
}
