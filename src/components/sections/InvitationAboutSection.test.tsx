import { fireEvent, render, screen } from "@testing-library/react";
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
  {
    question: "결혼을 결심한 계기",
    answers: [
      { speaker: "신랑 성창민", answer: "평범한 날이 더 편안했습니다." },
      { speaker: "신부 장인영", answer: "확신이 오래 남았어요." },
    ],
  },
];

describe("InvitationAboutSection", () => {
  it("프로필 카드와 첫 번째 인터뷰를 렌더링한다", () => {
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

  it("'Interview / 우리에게 물었습니다' 헤더를 렌더링한다", () => {
    render(
      <InvitationAboutSection
        coupleSince="2025년 4월 13일부터 함께하고 있습니다."
        profiles={PROFILES}
        interviews={INTERVIEWS}
      />,
    );

    expect(screen.getByText("우리에게 물었습니다")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
  });

  it("다음 버튼을 누르면 두 번째 질문으로 이동한다", () => {
    render(
      <InvitationAboutSection
        coupleSince="2025년 4월 13일부터 함께하고 있습니다."
        profiles={PROFILES}
        interviews={INTERVIEWS}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "다음 질문" }));

    expect(screen.getByText("결혼을 결심한 계기")).toBeInTheDocument();
    expect(screen.queryByText("첫인상은 어땠나요?")).not.toBeInTheDocument();
  });

  it("이전 버튼을 누르면 마지막 질문으로 순환한다", () => {
    render(
      <InvitationAboutSection
        coupleSince="2025년 4월 13일부터 함께하고 있습니다."
        profiles={PROFILES}
        interviews={INTERVIEWS}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "이전 질문" }));

    expect(screen.getByText("결혼을 결심한 계기")).toBeInTheDocument();
  });

  it("인디케이터 버튼으로 특정 질문으로 이동한다", () => {
    render(
      <InvitationAboutSection
        coupleSince="2025년 4월 13일부터 함께하고 있습니다."
        profiles={PROFILES}
        interviews={INTERVIEWS}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "2번 질문" }));

    expect(screen.getByText("결혼을 결심한 계기")).toBeInTheDocument();
  });
});
