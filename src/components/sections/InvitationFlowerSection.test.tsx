import { fireEvent, render, screen } from "@testing-library/react";
import InvitationFlowerSection from "./InvitationFlowerSection";
import type { FlowerOption } from "@/types/invitation.type";

const OPTIONS: FlowerOption[] = [
  {
    name: "축하 3단 기본형",
    price: "59,000원",
    description: "가장 깔끔하고 단정한 구성입니다.",
  },
  {
    name: "축하 3단 고급형",
    price: "85,000원",
    description: "조금 더 풍성한 구성입니다.",
  },
];

describe("InvitationFlowerSection", () => {
  it("화환 보내기 버튼을 누르면 모달이 열린다", () => {
    render(
      <InvitationFlowerSection
        flowerMessage={["축하해주셔서 감사합니다."]}
        flowerOptions={OPTIONS}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /화환 보내기/i }));

    expect(
      screen.getByRole("dialog", { name: /화환 주문 안내/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("축하 3단 기본형")).toBeInTheDocument();
  });

  it("닫기 버튼을 누르면 모달이 사라진다", () => {
    render(
      <InvitationFlowerSection
        flowerMessage={["축하해주셔서 감사합니다."]}
        flowerOptions={OPTIONS}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /화환 보내기/i }));
    fireEvent.click(screen.getByRole("button", { name: /화환 안내 닫기/i }));

    expect(
      screen.queryByRole("dialog", { name: /화환 주문 안내/i }),
    ).not.toBeInTheDocument();
  });
});
