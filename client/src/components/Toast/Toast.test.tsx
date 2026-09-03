import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  it("renders the message text", () => {
    render(<Toast message="Recipe deleted" />);
    expect(screen.getByText("Recipe deleted")).toBeInTheDocument();
  });

  it("renders nothing when message is empty", () => {
    const { container } = render(<Toast message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
