import { generateGoogleCalendarUrl, generateICSContent } from "./calendarUtils";

const PARAMS = {
  title: "홍길동 ♥ 김영희 결혼식",
  date: "2026-06-07",
  time: "14:00",
  location: "서울신라호텔 영빈관",
  description: "함께 자리를 빛내 주세요.",
  durationMinutes: 120,
};

describe("generateGoogleCalendarUrl", () => {
  it("google calendar render URL을 반환한다", () => {
    const url = generateGoogleCalendarUrl(PARAMS);
    expect(url).toContain("https://calendar.google.com/calendar/render");
  });

  it("URL에 action=TEMPLATE이 포함된다", () => {
    const url = generateGoogleCalendarUrl(PARAMS);
    expect(url).toContain("action=TEMPLATE");
  });

  it("URL에 날짜가 포함된다", () => {
    const url = generateGoogleCalendarUrl(PARAMS);
    expect(url).toContain("20260607T140000");
  });

  it("URL에 장소가 인코딩되어 포함된다", () => {
    const url = generateGoogleCalendarUrl(PARAMS);
    // URLSearchParams는 공백을 '+' 로 인코딩하므로 '+' 형태로 확인
    expect(url).toContain(
      encodeURIComponent("서울신라호텔").replace(/%20/g, "+"),
    );
  });
});

describe("generateICSContent", () => {
  it("VCALENDAR 형식으로 시작한다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toMatch(/^BEGIN:VCALENDAR/);
  });

  it("VCALENDAR 형식으로 끝난다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toMatch(/END:VCALENDAR$/);
  });

  it("DTSTART가 올바르게 생성된다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toContain("DTSTART:20260607T140000");
  });

  it("DTEND가 durationMinutes 기준으로 계산된다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toContain("DTEND:20260607T160000");
  });

  it("SUMMARY에 제목이 포함된다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toContain(`SUMMARY:${PARAMS.title}`);
  });

  it("LOCATION에 장소가 포함된다", () => {
    const ics = generateICSContent(PARAMS);
    expect(ics).toContain(`LOCATION:${PARAMS.location}`);
  });

  it("description이 없으면 DESCRIPTION 줄이 생략된다", () => {
    const ics = generateICSContent({ ...PARAMS, description: undefined });
    expect(ics).not.toContain("DESCRIPTION");
  });
});
