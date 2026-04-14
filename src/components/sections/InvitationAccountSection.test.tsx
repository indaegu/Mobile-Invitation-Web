import { fireEvent, render, screen } from "@testing-library/react";
import InvitationAccountSection from "./InvitationAccountSection";
import type { AccountGroup } from "@/types/invitation.type";

const ACCOUNT_GROUPS: AccountGroup[] = [
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
        accountNumber: "407-911073-00000",
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
    ],
  },
];

describe("InvitationAccountSection", () => {
  it("'마음 전하는 곳' 헤더를 렌더링한다", () => {
    render(<InvitationAccountSection accountGroups={ACCOUNT_GROUPS} />);

    expect(screen.getByText("마음 전하는 곳")).toBeInTheDocument();
    expect(screen.getByText(/비대면으로 축하를 전하고자/)).toBeInTheDocument();
  });

  it("기본적으로 모든 토글이 닫혀 있다", () => {
    render(<InvitationAccountSection accountGroups={ACCOUNT_GROUPS} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) =>
      expect(btn).toHaveAttribute("aria-expanded", "false"),
    );
    expect(screen.queryByText("하나은행")).not.toBeInTheDocument();
  });

  it("신랑측 토글을 누르면 계좌 목록이 열린다", () => {
    render(<InvitationAccountSection accountGroups={ACCOUNT_GROUPS} />);

    fireEvent.click(screen.getByRole("button", { name: /신랑측 계좌번호/i }));

    // 신랑 성창민·신랑 아버님 모두 하나은행이므로 getAllByText 사용
    expect(screen.getAllByText("하나은행").length).toBeGreaterThan(0);
    expect(screen.getByText("407-911073-41107")).toBeInTheDocument();
  });

  it("열린 토글을 다시 누르면 닫힌다", () => {
    render(<InvitationAccountSection accountGroups={ACCOUNT_GROUPS} />);

    const btn = screen.getByRole("button", { name: /신랑측 계좌번호/i });
    fireEvent.click(btn);
    expect(screen.getAllByText("하나은행").length).toBeGreaterThan(0);

    fireEvent.click(btn);
    expect(screen.queryAllByText("하나은행")).toHaveLength(0);
  });

  it("한 토글을 열면 다른 토글은 닫힌다", () => {
    render(<InvitationAccountSection accountGroups={ACCOUNT_GROUPS} />);

    fireEvent.click(screen.getByRole("button", { name: /신랑측 계좌번호/i }));
    expect(screen.getAllByText("하나은행").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /신부측 계좌번호/i }));
    expect(screen.queryAllByText("하나은행")).toHaveLength(0);
    expect(screen.getByText("카카오뱅크")).toBeInTheDocument();
  });
});
