import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../shared.types";

const recipe: Recipe = {
  _id: "1",
  title: "Chickpea Stew",
  description: "A hearty stew.",
  image: "https://example.com/stew.jpg",
  ingredients: [],
  instructions: [],
  tags: ["vegan", "healthy"],
  ownerId: "owner1",
  createdAt: "",
  updatedAt: "",
};

describe("RecipeCard", () => {
  it("renders the title, tags, and a link to the recipe detail page", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Chickpea Stew")).toBeInTheDocument();
    expect(screen.getByText("vegan")).toBeInTheDocument();
    expect(screen.getByText("healthy")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/recipes/1");
  });
});
