import { render, screen, fireEvent } from "@testing-library/react";
import ContactSection from "./ContactSection";
import type { ContactPerson } from "@/types/invitation.type";

const CONTACTS: ContactPerson[] = [
  { role: "신랑", name: "홍길동", phone: "010-1234-5678" },
  { role: "신부", name: "김영희", phone: "010-9876-5432" },
  { role: "신랑 아버지", name: "홍판서", phone: "010-1111-2222" },
  { role: "신부 아버지", name: "김철수", phone: "010-3333-4444" },
];

describe("ContactSection", () => {
  it("신랑·신부 연락처가 렌더링된다", () => {
    render(<ContactSection contacts={CONTACTS} />);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("김영희")).toBeInTheDocument();
  });

  it("전화 링크에 tel: href가 설정된다", () => {
    render(<ContactSection contacts={CONTACTS} />);
    const groomLink = screen.getByRole("link", { name: /신랑 홍길동/i });
    expect(groomLink).toHaveAttribute("href", "tel:01012345678");
  });

  it("혼주 연락처는 처음에 숨겨진다", () => {
    render(<ContactSection contacts={CONTACTS} />);
    expect(screen.queryByText("홍판서")).not.toBeInTheDocument();
  });

  it("혼주 토글 버튼 클릭 시 혼주 연락처가 표시된다", () => {
    render(<ContactSection contacts={CONTACTS} />);
    const toggleBtn = screen.getByRole("button", { name: /혼주 연락처 보기/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByText("홍판서")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
  });

  it("혼주 토글 버튼을 다시 클릭하면 혼주 연락처가 숨겨진다", () => {
    render(<ContactSection contacts={CONTACTS} />);
    const toggleBtn = screen.getByRole("button", { name: /혼주 연락처 보기/i });
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);
    expect(screen.queryByText("홍판서")).not.toBeInTheDocument();
  });

  it("혼주가 없으면 토글 버튼이 표시되지 않는다", () => {
    const coupleOnly: ContactPerson[] = [
      { role: "신랑", name: "홍길동", phone: "010-1234-5678" },
      { role: "신부", name: "김영희", phone: "010-9876-5432" },
    ];
    render(<ContactSection contacts={coupleOnly} />);
    expect(
      screen.queryByRole("button", { name: /혼주/i }),
    ).not.toBeInTheDocument();
  });
});
