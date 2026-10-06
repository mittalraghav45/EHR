const {test, expect} = require("@playwright/test");

test("patient can log in and reach the portal", async ({page}) => {
  await page.goto("/patient/login");
  await page.locator("#userName").fill("martin@test.com");
  await page.locator("#password").fill("bananas");
  await page.getByRole("button", {name: "Log In"}).click();
  await expect(page).toHaveURL(/\/patient\/menu$/);
  await expect(page.getByRole("heading", {name: "Patient Menu"})).toBeVisible();
});

test("patient can submit an appointment request", async ({page, request}) => {
  await page.goto("/patient/login");
  await page.locator("#userName").fill("martin@test.com");
  await page.locator("#password").fill("bananas");
  await page.getByRole("button", {name: "Log In"}).click();
  await page.getByRole("button", {name: "Request an Appointment"}).click();
  await page.locator("#appointmentType").click();
  await page.getByRole("option", {name: "Routine"}).click();
  await page.locator("#comments").fill("Playwright appointment request");
  await page.getByRole("checkbox").first().check();
  const responsePromise = page.waitForResponse(r => r.url().endsWith("/appointmentRequest") && r.request().method() === "POST");
  await page.getByRole("button", {name: "Submit"}).click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/patient\/menu$/);
  const created = await response.json();
  if (created && created.id !== undefined) {
    await request.delete("http://127.0.0.1:4000/appointmentRequest/" + created.id);
  }
});

test("staff can log in and reach the dashboard", async ({page}) => {
  await page.goto("/staff/login");
  await page.locator("#userName").fill("smith@lostinspace.com");
  await page.locator("#password").fill("pain");
  await page.getByRole("button", {name: "Log In"}).click();
  await expect(page).toHaveURL(/\/staff\/menu$/);
  await expect(page.getByRole("heading", {name: "Staff Menu"})).toBeVisible();
});

test("unauthenticated users see the staff access guard", async ({page}) => {
  await page.goto("/staff/employees");
  await expect(page.getByText("You must be logged in to access this feature.")).toBeVisible();
  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();
});
