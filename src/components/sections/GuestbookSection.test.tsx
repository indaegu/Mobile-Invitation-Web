import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GuestbookSection from "./GuestbookSection";

describe("GuestbookSection", () => {
  it("폼과 샘플 메시지가 렌더링된다", () => {
    render(<GuestbookSection />);
    expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/메시지/i)).toBeInTheDocument();
    // 샘플 메시지 표시 확인
    expect(screen.getByText("이민준")).toBeInTheDocument();
  });

  it("이름 미입력 시 에러 메시지를 표시한다", async () => {
    render(<GuestbookSection />);
    fireEvent.click(screen.getByRole("button", { name: /메시지 남기기/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/이름을 2자 이상 입력해주세요/i),
      ).toBeInTheDocument();
    });
  });

  it("메시지 미입력 시 에러 메시지를 표시한다", async () => {
    render(<GuestbookSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.click(screen.getByRole("button", { name: /메시지 남기기/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/메시지를 5자 이상 입력해주세요/i),
      ).toBeInTheDocument();
    });
  });

  it("정상 입력 후 제출하면 메시지가 목록에 추가된다", async () => {
    render(<GuestbookSection />);
    fireEvent.change(screen.getByLabelText(/이름/i), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByLabelText(/메시지/i), {
      target: { value: "두 분 결혼을 축하합니다!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /메시지 남기기/i }));
    await waitFor(
      () => {
        expect(
          screen.getByText("두 분 결혼을 축하합니다!"),
        ).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("제출 후 입력 필드가 초기화된다", async () => {
    render(<GuestbookSection />);
    const nameInput = screen.getByLabelText(/이름/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /메시지/i,
    ) as HTMLTextAreaElement;
    fireEvent.change(nameInput, { target: { value: "홍길동" } });
    fireEvent.change(messageInput, {
      target: { value: "두 분 결혼을 축하합니다!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /메시지 남기기/i }));
    await waitFor(
      () => {
        expect(nameInput.value).toBe("");
        expect(messageInput.value).toBe("");
      },
      { timeout: 1000 },
    );
  });

  it("글자 수 카운터가 표시된다", () => {
    render(<GuestbookSection />);
    expect(screen.getByText(/0\/200/)).toBeInTheDocument();
  });

  it("메시지 입력 시 글자 수가 업데이트된다", () => {
    render(<GuestbookSection />);
    fireEvent.change(screen.getByLabelText(/메시지/i), {
      target: { value: "안녕하세요" },
    });
    expect(screen.getByText(/5\/200/)).toBeInTheDocument();
  });
});
