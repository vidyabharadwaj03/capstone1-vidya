import { test, expect } from "@playwright/test";

test("guest can browse and search public recipes without logging in", async ({
  page,
}) => {
  await page.goto("/recipes");
  await expect(page.getByRole("heading", { name: "Recipe List" })).toBeVisible();

  await page.getByLabel("Search recipes").fill("zzzznomatch");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("No matching recipes found.")).toBeVisible();
});

test("creator can sign up, create, edit, and delete a recipe", async ({
  page,
}) => {
  const email = `e2e-${Date.now()}@example.com`;

  await page.goto("/signup");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("password123");
  await page.getByLabel("Confirm Password").fill("password123");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("Your recipes will show up here.")).toBeVisible();

  await page.getByRole("link", { name: "Create Recipe" }).click();
  await page.getByLabel("Title").fill("E2E Test Recipe");
  await page.getByLabel("Ingredient Name").fill("Flour");
  await page.getByLabel("Ingredient Quantity").fill("1 cup");
  await page.getByLabel("Instruction Step").fill("Mix it all together.");
  await page.getByRole("button", { name: "Create Recipe" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("E2E Test Recipe")).toBeVisible();

  await page.getByText("E2E Test Recipe").click();
  await expect(page.getByRole("heading", { name: "E2E Test Recipe" })).toBeVisible();
  await expect(page.getByText("1 cup Flour")).toBeVisible();

  await page.goBack();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("E2E Test Recipe Edited");
  await page.getByRole("button", { name: "Save Changes" }).click();

  await expect(page.getByText("E2E Test Recipe Edited")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete" }).last().click();

  await expect(page.getByText("Your recipes will show up here.")).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL("/");
});
