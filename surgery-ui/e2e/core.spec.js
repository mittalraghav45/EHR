const {test, expect} = require("@playwright/test");

const API = "http://127.0.0.1:4000";

async function preparePage(page) {
  const runtimeErrors = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  await page.addInitScript(() => {
    const install = () => {
      const style = document.createElement("style");
      style.textContent = "#webpack-dev-server-client-overlay { pointer-events: none !important; }";
      document.head.appendChild(style);
    };
    if (document.head) install();
    else document.addEventListener("DOMContentLoaded", install, {once: true});
  });
  return runtimeErrors;
}

async function expectNoRuntimeErrors(runtimeErrors) {
  expect(runtimeErrors, "browser runtime errors").toEqual([]);
}

async function loginPatient(page) {
  await page.goto("/patient/login");
  await page.locator("#userName").fill("martin@test.com");
  await page.locator("#password").fill("bananas");
  await page.getByRole("button", {name: "Log In"}).click({force: true});
  await expect(page).toHaveURL(/\/patient\/menu$/);
  await expect(page.getByRole("heading", {name: /Patient Menu/})).toBeVisible();
}

async function loginStaff(page) {
  await page.goto("/staff/login");
  await page.locator("#userName").fill("smith@lostinspace.com");
  await page.locator("#password").fill("pain");
  await page.getByRole("button", {name: "Log In"}).click({force: true});
  await expect(page).toHaveURL(/\/staff\/menu$/);
  await expect(page.getByRole("heading", {name: /Staff Menu/})).toBeVisible();
}

async function deleteByEmail(request, resource, email) {
  try {
    const response = await request.get(API + "/" + resource + "?email=" + encodeURIComponent(email));
    if (!response.ok()) return;
    const records = await response.json();
    for (const record of records) {
      if (record.id !== undefined) {
        await request.delete(API + "/" + resource + "/" + record.id);
      }
    }
  } catch (error) {
    // A timed-out Playwright test may close the request context before cleanup.
    // Preserve the original test failure instead of masking it with cleanup.
  }
}

test("home page provides patient entry points", async ({page}) => {
  const errors = await preparePage(page);
  await page.goto("/");
  await expect(page.getByRole("button", {name: /Patient Login/i})).toBeVisible();
  await expect(page.getByRole("button", {name: /Register/i})).toBeVisible();
  await expectNoRuntimeErrors(errors);
});

test("patient can log in and reach the portal", async ({page}) => {
  const errors = await preparePage(page);
  await loginPatient(page);
  await expectNoRuntimeErrors(errors);
});

test("patient can navigate every patient portal section", async ({page}) => {
  const errors = await preparePage(page);
  await loginPatient(page);

  await page.getByRole("button", {name: "Update Your Details"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Personal Details/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "View Your Appointments"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Appointments/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "View Your Medical History"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Medical History/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "View Your Prescriptions"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Prescriptions/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "View Your Test Details"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Tests/})).toBeVisible();

  await expectNoRuntimeErrors(errors);
});

test("patient can submit an appointment request", async ({page, request}) => {
  const errors = await preparePage(page);
  await loginPatient(page);
  await page.getByRole("button", {name: "Request an Appointment"}).click({force: true});
  await page.locator("#appointmentType").click({force: true});
  await page.getByRole("option", {name: "Routine"}).click({force: true});
  await page.locator("#comments").fill("Playwright appointment request");
  const firstDateCheckbox = page.locator('input[type="checkbox"]').first();
  await firstDateCheckbox.check({force: true});
  await expect(firstDateCheckbox).toBeChecked();

  const responsePromise = page.waitForResponse(
    response => response.url().endsWith("/api/appointmentRequest") && response.request().method() === "POST"
  );
  await page.getByRole("button", {name: "Submit"}).click({force: true});
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();

  const created = await response.json();
  await expect(page).toHaveURL(/\/patient\/menu$/);
  if (created?.id !== undefined) {
    await request.delete(API + "/appointmentRequest/" + created.id);
  }
  await expectNoRuntimeErrors(errors);
});

test("patient can complete self registration", async ({page, request}) => {
  const errors = await preparePage(page);
  const email = "playwright-" + Date.now() + "@example.com";

    await page.goto("/register/start");
    await page.locator("#firstName").fill("Playwright");
    await page.locator("#surname").fill("Patient");
    await page.locator("#email").fill(email);
    await page.locator("#password").fill("Playwright1!");
    await page.locator("#confirmPassword").fill("Playwright1!");
    await page.getByRole("button", {name: "Next"}).click({force: true});

    await page.locator("#title").click({force: true});
    await page.getByRole("option", {name: "Mr", exact: true}).click({force: true});
    await page.locator("#gender").click({force: true});
    await page.getByText("Male", {exact: true}).last().click({force: true});
    await page.getByRole("button", {name: "Next"}).click({force: true});

    await page.locator("#street").fill("1 Playwright Street");
    await page.locator("#townCity").fill("Southampton");
    await page.locator("#postCode").fill("SO14 1AF");
    await page.locator("#mobile").fill("07700000000");
    await page.getByRole("button", {name: "Next"}).click({force: true});

    await page.getByRole("button", {name: "Next"}).click({force: true});
    await expect(page.getByRole("heading", {name: /Self Registration/})).toBeVisible();

    const patientResponse = page.waitForResponse(
      response => response.url().endsWith("/api/patient") && response.request().method() === "POST"
    );
    const registrationResponse = page.waitForResponse(
      response => response.url().endsWith("/api/registration") && response.request().method() === "POST"
    );
    await page.getByRole("button", {name: "Submit"}).click({force: true});
    const createdPatientResponse = await patientResponse;
    expect(createdPatientResponse.ok()).toBeTruthy();
    const createdRegistrationResponse = await registrationResponse;
    expect(createdRegistrationResponse.ok()).toBeTruthy();

    await expect(page).toHaveURL(/\/patient\/login$/);
    await expect(page.getByText(/Registration complete!/)).toBeVisible();

  await expectNoRuntimeErrors(errors);
});

test("patient can complete the password reset workflow", async ({page, request}) => {
  const errors = await preparePage(page);
  const email = "playwright-reset-" + Date.now() + "@example.com";
  const password = "Initial1!";
  const newPassword = "ResetAgain1!";

  const create = await request.post(API + "/patient", {
    data: {
      email,
      password: "d41d8cd98f00b204e9800998ecf8427e",
      title: "Mr",
      firstName: "Reset",
      surname: "Patient",
      dateOfBirth: "01/01/1990",
      gender: "Male",
      phoneNumbers: {mobile: "07700000000", home: ""},
      address: {street: "1 Test Street", line2: "", townCity: "Southampton", postCode: "SO14 1AF"},
      consent: {email: true, sms: false, nextOfKin: false}
    }
  });
  expect(create.ok()).toBeTruthy();

  try {
    await page.goto("/patient/password/forgot");
    await page.locator("#forgot-email").fill(email);
    await page.getByRole("button", {name: "Send Reset Link"}).click({force: true});
    await expect(page.getByText(/Development note: use reset token/)).toBeVisible();
    await page.getByRole("button", {name: "Open Reset Form"}).click({force: true});

    await page.locator("#reset-password").fill(newPassword);
    await page.locator("#reset-confirm-password").fill(newPassword);
    await page.getByRole("button", {name: "Reset Password"}).click({force: true});
    await expect(page).toHaveURL(/\/patient\/login$/);
    await expect(page.getByText(/Password updated successfully/)).toBeVisible();

    await page.locator("#userName").fill(email);
    await page.locator("#password").fill(newPassword);
    await page.getByRole("button", {name: "Log In"}).click({force: true});
    await expect(page).toHaveURL(/\/patient\/menu$/);
  } finally {
    const created = await create.json();
    if (created?.id !== undefined) {
      await request.delete(API + "/patient/" + created.id);
    }
  }

  await expectNoRuntimeErrors(errors);
});

test("staff can log in and navigate staff management sections", async ({page}) => {
  const errors = await preparePage(page);
  await loginStaff(page);

  await page.getByRole("button", {name: "Employees"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Employees/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "Search Patient"}).click({force: true});
  await expect(page.getByRole("heading", {name: /Search Patients/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "Registration Requests"}).click({force: true});
  await expect(page.getByRole("heading", {name: /Registration Requests/})).toBeVisible();
  await page.getByRole("button", {name: "Back"}).click({force: true});

  await page.getByRole("button", {name: "Appointment Requests"}).click({force: true});
  await expect(page.getByRole("heading", {name: /View Appointment Requests/})).toBeVisible();

  await expectNoRuntimeErrors(errors);
});

test("staff patient search filters and opens the selected patient", async ({page}) => {
  const errors = await preparePage(page);
  await loginStaff(page);
  await page.getByRole("button", {name: "Search Patient"}).click({force: true});

  await page.getByRole("textbox", {name: "Search"}).fill("martin@test.com");
  await expect(page.getByRole("row").filter({hasText: "martin@test.com"})).toHaveCount(1);
  await page.getByRole("row").filter({hasText: "martin@test.com"}).getByRole("button", {name: "View"}).click({force: true});
  await expect(page.getByRole("heading", {name: /Patient Details/})).toBeVisible();

  await expectNoRuntimeErrors(errors);
});

test("staff can approve a patient appointment request", async ({page, request}) => {
  const errors = await preparePage(page);
  await request.delete(API + "/appointmentRequest/999999");
  const seed = await request.post(API + "/appointmentRequest", {
    data: {
      patientId: 1,
      patientName: "Sir Martin Ingram",
      patientEmail: "martin@test.com",
      patientPostCode: "TC1 1AA",
      doctorId: 1,
      condition: "Playwright approval test",
      appointmentType: "Routine",
      availableDates: ["07/10/2026"]
    }
  });
  expect(seed.ok()).toBeTruthy();
  const seeded = await seed.json();

  try {
    await loginStaff(page);
    await page.getByRole("button", {name: "Appointment Requests"}).click({force: true});
    await expect(page.getByRole("button", {name: "View"})).toBeVisible();
    await page.getByRole("button", {name: "View"}).click({force: true});

    const appointmentPost = page.waitForResponse(
      response => response.url().endsWith("/api/appointment") && response.request().method() === "POST"
    );
    await page.getByRole("button", {name: "Save"}).click({force: true});
    const response = await appointmentPost;
    expect(response.ok()).toBeTruthy();
    const appointment = await response.json();

    await expect(page).toHaveURL(/\/staff\/appointmentRequests$/);
    if (appointment?.id !== undefined) {
      await request.delete(API + "/appointment/" + appointment.id);
    }
  } finally {
    if (seeded?.id !== undefined) {
      await request.delete(API + "/appointmentRequest/" + seeded.id);
    }
  }

  await expectNoRuntimeErrors(errors);
});

test("staff can create a new employee", async ({page, request}) => {
  const errors = await preparePage(page);
  const email = "playwright-staff-" + Date.now() + "@example.com";

  try {
    await loginStaff(page);
    await page.getByRole("button", {name: "Employees"}).click({force: true});
    await page.getByRole("button", {name: "Add"}).click({force: true});

    await page.locator("#title").click({force: true});
    await page.getByRole("option", {name: "Mr", exact: true}).click({force: true});
    await page.locator("#firstName").fill("Playwright");
    await page.locator("#surname").fill("Staff");
    await page.locator("#email").fill(email);
    await page.locator("#confirmEmail").fill(email);
    await page.locator("#password").fill("Playwright1!");
    await page.locator("#confirmPassword").fill("Playwright1!");
    await page.locator("#role").click({force: true});
    await page.getByRole("option", {name: "Nurse"}).click({force: true});

    const createResponse = page.waitForResponse(
      response => response.url().endsWith("/api/employee") && response.request().method() === "POST"
    );
    await page.getByRole("button", {name: "Save"}).click({force: true});
    const response = await createResponse;
    expect(response.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/staff\/employees$/);
  } finally {
    await deleteByEmail(request, "employee", email);
  }

  await expectNoRuntimeErrors(errors);
});

test("unauthenticated users are blocked from patient and staff protected pages", async ({page}) => {
  const errors = await preparePage(page);

  await page.goto("/patient/appointments");
  await expect(page.getByText("You must be logged in to access this feature.")).toBeVisible();
  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();

  await page.goto("/staff/employees");
  await expect(page.getByText("You must be logged in to access this feature.")).toBeVisible();
  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();

  await expectNoRuntimeErrors(errors);
});
