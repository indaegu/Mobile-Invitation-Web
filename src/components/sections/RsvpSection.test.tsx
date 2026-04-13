import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RsvpSection from "./RsvpSection";

describe("RsvpSection", () => {
  it("폼 필드가 렌더링된다", () => {
    render(<RsvpSection />);
    expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/연락처/i)).toBeInTheDocument();
  });

  it("이름 미입력 시 에러 메시지를 표시한다", async () => {
    render(<RsvpSection />);
    fireEvent.click(screen.getByRole("button", { name: /참석 확인 전송/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/이름을 2자 이상 입력해주세요/i),
      ).toBeInTheDocument();
    });
  });

  it("연락처 미입력 시 에러 메시지를 표시한다", async () => {
    render(<RsvpSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.click(screen.getByRole("button", { name: /참석 확인 전송/i }));
    await waitFor(() => {
      expect(screen.getByText(/연락처를 입력해주세요/i)).toBeInTheDocument();
    });
  });

  it("잘못된 전화번호 형식 시 에러 메시지를 표시한다", async () => {
    render(<RsvpSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByLabelText(/연락처/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /참석 확인 전송/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/올바른 전화번호를 입력해주세요/i),
      ).toBeInTheDocument();
    });
  });

  it("참석 여부 미선택 시 에러 메시지를 표시한다", async () => {
    render(<RsvpSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByLabelText(/연락처/i), {
      target: { value: "010-1234-5678" },
    });
    fireEvent.click(screen.getByRole("button", { name: /참석 확인 전송/i }));
    await waitFor(() => {
      expect(screen.getByText(/참석 여부를 선택해주세요/i)).toBeInTheDocument();
    });
  });

  it("참석합니다 선택 시 인원 입력 폼이 표시된다", () => {
    render(<RsvpSection />);
    fireEvent.click(screen.getByRole("button", { name: "참석합니다" }));
    expect(screen.getByLabelText(/성인 인원 증가/i)).toBeInTheDocument();
  });

  it("정상 입력 후 제출하면 성공 메시지가 표시된다", async () => {
    render(<RsvpSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByLabelText(/연락처/i), {
      target: { value: "010-1234-5678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "불참합니다" }));
    fireEvent.click(screen.getByRole("button", { name: /참석 확인 전송/i }));
    await waitFor(
      () => {
        expect(screen.getByRole("status")).toHaveTextContent(
          /참석 의사가 전달되었습니다/i,
        );
      },
      { timeout: 2000 },
    );
  });
});
