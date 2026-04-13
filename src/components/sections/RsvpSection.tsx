"use client";

import { useState } from "react";
import type { RsvpEntry } from "@/types/invitation.type";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type FieldErrors = Partial<Record<keyof RsvpEntry, string>>;

function validateRsvp(form: Partial<RsvpEntry>): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = "이름을 2자 이상 입력해주세요";
  }
  if (!form.phone) {
    errors.phone = "연락처를 입력해주세요";
  } else if (
    !/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(form.phone.replace(/\s/g, ""))
  ) {
    errors.phone = "올바른 전화번호를 입력해주세요 (예: 010-1234-5678)";
  }
  if (!form.attendance) {
    errors.attendance = "참석 여부를 선택해주세요";
  }
  if (
    form.attendance === "attending" &&
    (!form.adultCount || form.adultCount < 1)
  ) {
    errors.adultCount = "참석 인원(성인)을 입력해주세요";
  }

  return errors;
}

const INITIAL: Partial<RsvpEntry> = {
  name: "",
  phone: "",
  attendance: undefined,
  adultCount: 1,
  childCount: 0,
  mealOption: true,
};

export default function RsvpSection() {
  const [form, setForm] = useState<Partial<RsvpEntry>>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof RsvpEntry>(
    key: K,
    value: RsvpEntry[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRsvp(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // 실제 서버 연동 전까지 UI 전용 처리
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="snap-section min-h-svh flex flex-col items-center justify-center px-8 py-20 bg-white"
      >
        <div className="text-center space-y-4" role="status">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-rose-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-base text-gray-700 font-medium">
            참석 의사가 전달되었습니다
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {form.attendance === "attending"
              ? `${form.name}님, 소중한 자리에 함께해 주셔서 감사합니다 ♥`
              : `${form.name}님의 마음만으로도 충분합니다. 감사합니다.`}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(INITIAL);
            }}
            className="mt-4 text-xs text-gray-400 underline underline-offset-4"
          >
            다시 제출하기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="snap-section min-h-svh flex flex-col justify-center px-8 py-20 bg-white"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="RSVP" ko="참석 여부" />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={100}>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* 이름 */}
          <div>
            <label
              htmlFor="rsvp-name"
              className="block text-xs text-gray-500 mb-1.5"
            >
              이름 <span className="text-rose-400">*</span>
            </label>
            <input
              id="rsvp-name"
              type="text"
              name="name"
              value={form.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="홍길동"
              className={`w-full px-4 py-3 text-sm rounded-2xl border bg-white outline-none transition-colors ${
                errors.name
                  ? "border-rose-300 focus:border-rose-400"
                  : "border-gray-200 focus:border-rose-300"
              }`}
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
            )}
          </div>

          {/* 연락처 */}
          <div>
            <label
              htmlFor="rsvp-phone"
              className="block text-xs text-gray-500 mb-1.5"
            >
              연락처 <span className="text-rose-400">*</span>
            </label>
            <input
              id="rsvp-phone"
              type="tel"
              name="phone"
              value={form.phone ?? ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="010-1234-5678"
              className={`w-full px-4 py-3 text-sm rounded-2xl border bg-white outline-none transition-colors ${
                errors.phone
                  ? "border-rose-300 focus:border-rose-400"
                  : "border-gray-200 focus:border-rose-300"
              }`}
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
            )}
          </div>

          {/* 참석 여부 */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">
              참석 여부 <span className="text-rose-400">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["attending", "not-attending"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleChange("attendance", opt)}
                  className={`py-3 rounded-2xl text-sm border transition-all duration-200 ${
                    form.attendance === opt
                      ? "bg-rose-400 border-rose-400 text-white"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                  aria-pressed={form.attendance === opt}
                >
                  {opt === "attending" ? "참석합니다" : "불참합니다"}
                </button>
              ))}
            </div>
            {errors.attendance && (
              <p className="mt-1 text-xs text-rose-400">{errors.attendance}</p>
            )}
          </div>

          {/* 참석 인원 (참석 시만 표시) */}
          {form.attendance === "attending" && (
            <div className="space-y-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100/50">
              {/* 성인 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">성인</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "adultCount",
                        Math.max(1, (form.adultCount ?? 1) - 1),
                      )
                    }
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center text-lg leading-none active:bg-gray-50"
                    aria-label="성인 인원 감소"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-gray-700">
                    {form.adultCount ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("adultCount", (form.adultCount ?? 1) + 1)
                    }
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center text-lg leading-none active:bg-gray-50"
                    aria-label="성인 인원 증가"
                  >
                    +
                  </button>
                </div>
              </div>
              {errors.adultCount && (
                <p className="text-xs text-rose-400">{errors.adultCount}</p>
              )}

              {/* 어린이 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">어린이</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "childCount",
                        Math.max(0, (form.childCount ?? 0) - 1),
                      )
                    }
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center text-lg leading-none active:bg-gray-50"
                    aria-label="어린이 인원 감소"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-gray-700">
                    {form.childCount ?? 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("childCount", (form.childCount ?? 0) + 1)
                    }
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center text-lg leading-none active:bg-gray-50"
                    aria-label="어린이 인원 증가"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 식사 여부 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">식사 참여</span>
                <button
                  type="button"
                  onClick={() => handleChange("mealOption", !form.mealOption)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                    form.mealOption ? "bg-rose-400" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={form.mealOption ?? true}
                  aria-label="식사 참여 여부"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                      form.mealOption ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* 제출 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-rose-400 text-white text-sm font-medium tracking-wide active:opacity-80 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                전송 중...
              </span>
            ) : (
              "참석 확인 전송"
            )}
          </button>
        </form>
      </AnimateOnScroll>
    </section>
  );
}
