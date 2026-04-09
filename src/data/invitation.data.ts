import type { InvitationData } from '@/types/invitation.type';

export const invitationData: InvitationData = {
  groomName: '홍길동',
  brideName: '김영희',
  groomParents: {
    father: '홍판서',
    mother: '임씨',
  },
  brideParents: {
    father: '김철수',
    mother: '박씨',
  },
  weddingDate: '2026-06-07',
  weddingTime: '14:00',
  greetingMessage: `서로가 서로의 이유가 되어\n함께 걸어가려 합니다.\n\n소중한 분들을 모시고\n저희 두 사람이 하나가 되는 날,\n함께 자리를 빛내 주시면\n감사하겠습니다.`,
  accounts: [
    { owner: '신랑 홍길동', bank: '카카오뱅크', accountNumber: '3333-00-0000000' },
    { owner: '신부 김영희', bank: '국민은행', accountNumber: '000000-00-000000' },
    { owner: '신랑 아버지 홍판서', bank: '신한은행', accountNumber: '000-000-000000' },
    { owner: '신부 아버지 김철수', bank: '우리은행', accountNumber: '000-000000-00-000' },
  ],
  location: {
    name: '서울신라호텔 영빈관',
    address: '서울특별시 중구 동호로 249',
    lat: 37.5571,
    lng: 127.0046,
    transport: '지하철 3호선 동대입구역 5번 출구 도보 5분\n지하철 6호선 한남역 2번 출구 도보 10분\n버스 간선 420, 지선 2412 신라호텔 하차',
  },
  images: [],
};
