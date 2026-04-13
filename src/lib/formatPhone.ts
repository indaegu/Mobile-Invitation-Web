/**
 * 한국 전화번호 포맷터
 * 입력: 숫자만 or 하이픈 포함 문자열
 * 출력: 010-XXXX-XXXX / 02-XXX-XXXX 형태
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  // 휴대폰 11자리: 010-XXXX-XXXX
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  // 휴대폰 10자리: 010-XXX-XXXX (구형) or 서울 지역번호 02-XXXX-XXXX
  if (digits.length === 10) {
    if (digits.startsWith("02")) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  // 서울 8자리: 02-XXX-XXXX
  if (digits.length === 9 && digits.startsWith("02")) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }

  return phone;
}

/** tel: 링크용 — 하이픈 제거한 순수 숫자 반환 */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}
