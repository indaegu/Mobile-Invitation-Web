/**
 * 캘린더 추가 유틸리티
 * - 구글 캘린더: URL 기반
 * - 애플/아웃룩: ICS 파일 다운로드
 */

type CalendarParams = {
  title: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM" 24h
  location: string;
  description?: string;
  durationMinutes?: number;
};

/** "YYYY-MM-DD" + "HH:MM" → "YYYYMMDDTHHmmss" (ICS / Google 공통) */
function toDateTimeString(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [h, min] = time.split(":");
  return `${y}${m}${d}T${h}${min}00`;
}

/** 구글 캘린더 URL 생성 */
export function generateGoogleCalendarUrl(params: CalendarParams): string {
  const {
    title,
    date,
    time,
    location,
    description = "",
    durationMinutes = 60,
  } = params;

  const start = toDateTimeString(date, time);

  const startDate = new Date(`${date}T${time}:00`);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const endY = endDate.getFullYear();
  const endM = String(endDate.getMonth() + 1).padStart(2, "0");
  const endD = String(endDate.getDate()).padStart(2, "0");
  const endH = String(endDate.getHours()).padStart(2, "0");
  const endMin = String(endDate.getMinutes()).padStart(2, "0");
  const end = `${endY}${endM}${endD}T${endH}${endMin}00`;

  const params_ = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location,
    details: description,
  });

  return `https://calendar.google.com/calendar/render?${params_.toString()}`;
}

/** ICS 파일 콘텐츠 생성 (애플 캘린더 · 아웃룩 호환) */
export function generateICSContent(params: CalendarParams): string {
  const {
    title,
    date,
    time,
    location,
    description = "",
    durationMinutes = 60,
  } = params;

  const start = toDateTimeString(date, time);

  const startDate = new Date(`${date}T${time}:00`);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const endY = endDate.getFullYear();
  const endM = String(endDate.getMonth() + 1).padStart(2, "0");
  const endD = String(endDate.getDate()).padStart(2, "0");
  const endH = String(endDate.getHours()).padStart(2, "0");
  const endMin = String(endDate.getMinutes()).padStart(2, "0");
  const end = `${endY}${endM}${endD}T${endH}${endMin}00`;

  const uid = `wedding-${date.replace(/-/g, "")}-${Date.now()}@invitation`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    description ? `DESCRIPTION:${description}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

/** 브라우저에서 ICS 파일 다운로드 */
export function downloadICS(
  params: CalendarParams,
  filename = "wedding.ics",
): void {
  const content = generateICSContent(params);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
