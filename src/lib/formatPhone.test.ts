import { formatPhoneNumber, toTelHref } from './formatPhone';

describe('formatPhoneNumber', () => {
  it('11자리 휴대폰 번호를 포맷한다', () => {
    expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678');
  });

  it('이미 포맷된 번호도 처리한다', () => {
    expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678');
  });

  it('10자리 번호를 포맷한다', () => {
    expect(formatPhoneNumber('0101234567')).toBe('010-123-4567');
  });

  it('서울 지역번호 10자리를 포맷한다', () => {
    expect(formatPhoneNumber('0212345678')).toBe('02-1234-5678');
  });

  it('서울 지역번호 9자리를 포맷한다', () => {
    expect(formatPhoneNumber('021234567')).toBe('02-123-4567');
  });

  it('알 수 없는 형식은 그대로 반환한다', () => {
    expect(formatPhoneNumber('1234')).toBe('1234');
  });
});

describe('toTelHref', () => {
  it('하이픈을 제거하고 tel: 접두사를 붙인다', () => {
    expect(toTelHref('010-1234-5678')).toBe('tel:01012345678');
  });

  it('숫자만 있는 번호도 처리한다', () => {
    expect(toTelHref('01012345678')).toBe('tel:01012345678');
  });
});
