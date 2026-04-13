import { fireEvent, render, screen } from "@testing-library/react";
import InvitationContactSection from "./InvitationContactSection";
import type { ContactPerson } from "@/types/invitation.type";

const CONTACTS: ContactPerson[] = [
  { role: "신랑", name: "성창민", phone: "010-1234-5678" },
  { role: "신랑 아버님", name: "성아빠", phone: "010-2222-1234" },
  { role: "신부", name: "장인영", phone: "010-5678-1234" },
  { role: "신부 어머님", name: "김엄마", phone: "010-5555-1234" },
];

describe("InvitationContactSection", () => {
  it("처음에는 연락처 패널이 닫혀 있다", () => {
    render(<InvitationContactSection contacts={CONTACTS} />);

    expect(screen.getByRole("button", { name: /연락하기/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("성아빠")).not.toBeInTheDocument();
  });

  it("버튼을 누르면 양가 연락처가 열린다", () => {
    render(<InvitationContactSection contacts={CONTACTS} />);

    fireEvent.click(screen.getByRole("button", { name: /연락하기/i }));

    expect(screen.getByText("성창민")).toBeInTheDocument();
    expect(screen.getByText("김엄마")).toBeInTheDocument();
  });

  it("전화 링크는 tel 형식으로 연결된다", () => {
    render(<InvitationContactSection contacts={CONTACTS} />);

    fireEvent.click(screen.getByRole("button", { name: /연락하기/i }));

    expect(
      screen.getByRole("link", { name: "신랑 성창민에게 전화" }),
    ).toHaveAttribute("href", "tel:01012345678");
  });
});
