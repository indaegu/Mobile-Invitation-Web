import { render, screen } from "@testing-library/react";
import InvitationAboutSection from "./InvitationAboutSection";
import type { InterviewCard, PersonProfile } from "@/types/invitation.type";

const PROFILES: PersonProfile[] = [
  {
    role: "신랑",
    name: "성창민",
    summary: "1999년 3월 25일 / ISTJ",
    tags: ["#위스키", "#코딩"],
    image: "https://example.com/groom.jpg",
  },
  {
    role: "신부",
    name: "장인영",
    summary: "2001년 2월 14일 / ISFP",
    tags: ["#하치와레", "#요리"],
    image: "https://example.com/bride.jpg",
  },
];

const INTERVIEWS: InterviewCard[] = [
  {
    question: "첫인상은 어땠나요?",
    answers: [
      { speaker: "신랑 성창민", answer: "따뜻한 사람 같았습니다." },
      { speaker: "신부 장인영", answer: "차분하고 다정했어요." },
    ],
  },
];

describe("InvitationAboutSection", () => {
  it("프로필 카드와 인터뷰 내용을 렌더링한다", () => {
    render(
      <InvitationAboutSection
        coupleSince="2025년 4월 13일부터 함께하고 있습니다."
        profiles={PROFILES}
        interviews={INTERVIEWS}
      />,
    );

    expect(
      screen.getByAltText("신랑 성창민 프로필 이미지"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("신부 장인영 프로필 이미지"),
    ).toBeInTheDocument();
    expect(screen.getByText("첫인상은 어땠나요?")).toBeInTheDocument();
    expect(screen.getByText("따뜻한 사람 같았습니다.")).toBeInTheDocument();
  });
});
