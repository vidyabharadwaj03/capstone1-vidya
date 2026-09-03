import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("calls onConfirm when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog message="Delete this?" onConfirm={onConfirm} onCancel={() => {}} />,
    );

    await user.click(screen.getByText("Delete"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onCancel when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <ConfirmDialog message="Delete this?" onConfirm={() => {}} onCancel={onCancel} />,
    );

    await user.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });
});
