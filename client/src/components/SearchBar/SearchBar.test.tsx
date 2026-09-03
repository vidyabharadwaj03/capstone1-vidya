import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("calls onSearch with the typed query on submit", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByLabelText("Search recipes"), "chickpea");
    await user.click(screen.getByText("Search"));

    expect(onSearch).toHaveBeenCalledWith("chickpea");
  });
});
