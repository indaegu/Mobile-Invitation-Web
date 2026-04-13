import type { InvitationData } from "@/types/invitation.type";

const storyImageGroom =
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80";
const storyImageBride =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80";
const heroImage =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80";
const galleryImages = [
  heroImage,
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
];

export const invitationData: InvitationData = {
  groomName: "성창민",
  brideName: "장인영",
  groomParents: {
    father: "성아빠",
    mother: "김엄마",
  },
  brideParents: {
    father: "장아빠",
    mother: "김엄마",
  },
  weddingDate: "2030-10-19",
  weddingTime: "11:30",
  heroMessage: "평생은 먼 말 같았는데,\n당신을 만나 가까워졌습니다.",
  invitationTitle: "다섯 번째 가을, 우리는 ‘우리’가 됩니다.",
  invitationBody: [
    "함께한 다섯 번째 가을, 앞으로의 약속에 초대합니다. 서로의 청춘을 나란히 걸어오며 마음을 포개 왔습니다. 이제 같은 내일을 향해 손을 맞잡으려 합니다.",
    "어느 날은 친구처럼, 어느 날은 연인처럼 곁을 지켰습니다. 같은 풍경을 바라보며 작은 행복을 오래도록 모았습니다. 그 시간이 오늘, ‘평생’이라는 말로 조용히 이어집니다.",
    "수많은 계절의 첫 장을 여는 자리입니다. 우리의 시작이 따뜻하게 기억될 수 있도록 함께해 주세요. 소중한 걸음과 축복으로 채워주시면 감사하겠습니다.",
  ],
  coupleSince: "2025년 4월 13일부터 함께하고 있습니다.",
  greetingMessage:
    "같은 풍경을 오래 바라본 두 사람이\n같은 내일을 향해 걸어가려 합니다.\n\n다섯 번째 가을의 문턱에서\n소중한 분들과 이 마음을 나누고 싶습니다.",
  heroImage,
  storyImages: [storyImageGroom, storyImageBride],
  accounts: [
    {
      owner: "신랑 성창민",
      bank: "하나은행",
      accountNumber: "407-911073-41107",
    },
    {
      owner: "신랑 아버님",
      bank: "하나은행",
      accountNumber: "407-911073-41107",
    },
    {
      owner: "신랑 어머님",
      bank: "하나은행",
      accountNumber: "407-911073-41107",
    },
    {
      owner: "신부 장인영",
      bank: "카카오뱅크",
      accountNumber: "3333-10-2611221",
    },
    {
      owner: "신부 아버님",
      bank: "카카오뱅크",
      accountNumber: "3333-10-2611221",
    },
    {
      owner: "신부 어머님",
      bank: "카카오뱅크",
      accountNumber: "3333-10-2611221",
    },
  ],
  accountGroups: [
    {
      title: "신랑측 계좌번호",
      items: [
        {
          owner: "신랑 성창민",
          bank: "하나은행",
          accountNumber: "407-911073-41107",
        },
        {
          owner: "신랑 아버님",
          bank: "하나은행",
          accountNumber: "407-911073-41107",
        },
        {
          owner: "신랑 어머님",
          bank: "하나은행",
          accountNumber: "407-911073-41107",
        },
      ],
    },
    {
      title: "신부측 계좌번호",
      items: [
        {
          owner: "신부 장인영",
          bank: "카카오뱅크",
          accountNumber: "3333-10-2611221",
        },
        {
          owner: "신부 아버님",
          bank: "카카오뱅크",
          accountNumber: "3333-10-2611221",
        },
        {
          owner: "신부 어머님",
          bank: "카카오뱅크",
          accountNumber: "3333-10-2611221",
        },
      ],
    },
  ],
  location: {
    name: "신라호텔 영빈관",
    address: "서울 중구 동호로 249",
    lat: 37.55691,
    lng: 127.00512,
    transport:
      "지하철 3호선 동대입구역 5번 출구 도보 5분\n지하철 6호선 버티고개역 3번 출구 도보 10분\n발렛 및 주차 안내는 예식장 안내 데스크에서 도와드립니다.",
  },
  images: galleryImages,
  contacts: [
    { role: "신랑", name: "성창민", phone: "010-1234-5678" },
    { role: "신랑 아버님", name: "성아빠", phone: "010-2222-1234" },
    { role: "신랑 어머님", name: "김엄마", phone: "010-3333-1234" },
    { role: "신부", name: "장인영", phone: "010-5678-1234" },
    { role: "신부 아버님", name: "장아빠", phone: "010-4444-1234" },
    { role: "신부 어머님", name: "김엄마", phone: "010-5555-1234" },
  ],
  profiles: [
    {
      role: "신랑",
      name: "성창민",
      summary: "1999년 3월 25일 / ISTJ",
      tags: ["#위스키", "#코딩"],
      image: storyImageGroom,
    },
    {
      role: "신부",
      name: "장인영",
      summary: "2001년 2월 14일 / ISFP",
      tags: ["#하치와레", "#요리"],
      image: storyImageBride,
    },
  ],
  interviews: [
    {
      question: "첫인상은 어땠나요?",
      answers: [
        {
          speaker: "신랑 성창민",
          answer:
            "햇살이 먼저 들어오는 사람 같았습니다. 말보다 분위기가 먼저 마음에 남았어요.",
        },
        {
          speaker: "신부 장인영",
          answer:
            "묵직하게 다정한 사람이라고 느꼈어요. 시간이 갈수록 더 선명해졌습니다.",
        },
      ],
    },
    {
      question: "결혼을 결심한 계기",
      answers: [
        {
          speaker: "신랑 성창민",
          answer:
            "기쁜 날보다 평범한 날이 더 편안했습니다. 함께라면 일상이 가장 좋은 순간이 되더라고요.",
        },
        {
          speaker: "신부 장인영",
          answer:
            "가장 솔직한 모습일 때도 안심이 되는 사람이었습니다. 그 확신이 오래 남았어요.",
        },
      ],
    },
    {
      question: "하객 분들께 전하고 싶은 말",
      answers: [
        {
          speaker: "신랑 성창민",
          answer:
            "저희의 첫 장을 함께 봐주셔서 감사합니다. 오래 기억되는 하루가 되도록 준비하겠습니다.",
        },
        {
          speaker: "신부 장인영",
          answer:
            "멀리서도 가까이서도 마음 보내주셔서 감사합니다. 따뜻한 축복 오래 간직할게요.",
        },
      ],
    },
  ],
  flowerMessage: [
    "소중한 시간을 내어 축하해 주시는 마음에 진심으로 감사드립니다.",
    "축하의 마음을 화환으로 전해주셔도 감사한 마음으로 받겠습니다.",
  ],
  flowerOptions: [
    {
      name: "축하 3단 기본형",
      price: "59,000원",
      description:
        "가장 깔끔하고 단정한 구성으로 부담 없이 축하의 마음을 전하기 좋아요.",
    },
    {
      name: "축하 3단 고급형",
      price: "85,000원",
      description:
        "기본형보다 한층 풍성한 구성으로 정성 어린 축하를 전하기 좋습니다.",
    },
    {
      name: "축하 3단 최고급형",
      price: "115,000원",
      description:
        "고급스러운 꽃과 넉넉한 볼륨으로 중요한 자리에 깊은 마음을 담아 보낼 수 있어요.",
    },
    {
      name: "쌀화환 10kg",
      price: "120,000원",
      description: "축하와 실용성을 함께 전하고 싶은 분께 어울리는 선택입니다.",
    },
  ],
};
