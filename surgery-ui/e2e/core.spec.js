const {test, expect} = require("@playwright/test");

test("patient can log in and reach the portal", async ({page}) => {
  await page.goto("/patient/login");
  await page.locator("#userName").fill("martin@test.com");
  await page.locator("#password").fill("bananas");
  await page.getByRole("button", {name: "Log In"}).click();
  await expect(page).toHaveURL(/\\/patient\\/menu$/);
  await expect(page.getByRole("heading", {name: "Patient Menu"})).toBeVisible();
});

test("staff can log in and reach the dashboard", async ({page}) => {
  await page.goto("/staff/login");
  await page.locator("#userName").fill("smith@lostinspace.com");
  await page.locator("#password").fill("pain");
  await page.getByRole("button", {name: "Log In"}).click();
  await expect(page).toHaveURL(/\\/staff\\/menu$/);
  await expect(page.getByRole("heading", {name: "Staff Menu"})).toBeVisible();
});

test("unauthenticated users see the staff access guard", async ({page}) => {
  await page.goto("/staff/employees");
  await expect(page.getByText("You must be logged in to access this feature.")).toBeVisible();
  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();
});
