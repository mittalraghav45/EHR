const fs = require("fs");
const http = require("http");
const path = require("path");
const {spawn} = require("child_process");
const {chromium} = require("@playwright/test");

const rootDir = path.join(__dirname, "..");
const repoDir = path.join(rootDir, "..");
const tempDir = path.join(rootDir, "demo-video-temp");
const outputDir = path.join(repoDir, "docs", "media");
const outputPath = path.join(outputDir, "cloud-surgery-demo.webm");

function startServer(scriptPath) {
  const child = spawn(process.execPath, [scriptPath], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    env: {...process.env, BROWSER: "none"}
  });
  child.stdout.on("data", () => {});
  child.stderr.on("data", () => {});
  return child;
}

function waitForUrl(url, timeoutMs = 60000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    function check() {
      const request = http.get(url, response => {
        response.resume();
        resolve();
      });

      request.on("error", () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error("Timed out waiting for " + url));
          return;
        }
        setTimeout(check, 500);
      });
    }

    check();
  });
}

async function pause(page, ms = 900) {
  await page.waitForTimeout(ms);
}

async function safeRemove(directory) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      fs.rmSync(directory, {recursive: true, force: true});
      return;
    } catch (error) {
      if (attempt === 4) {
        console.warn("Could not remove temporary video directory: " + directory);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

async function clickButton(page, name) {
  await page.getByRole("button", {name}).click({force: true});
  await pause(page);
}

async function loginPatient(page) {
  await page.goto("/patient/login");
  await pause(page);
  await page.locator("#userName").fill("martin@test.com");
  await page.locator("#password").fill("bananas");
  await clickButton(page, "Log In");
}

async function loginStaff(page) {
  await page.goto("/staff/login");
  await pause(page);
  await page.locator("#userName").fill("smith@lostinspace.com");
  await page.locator("#password").fill("pain");
  await clickButton(page, "Log In");
}

async function runTour(page) {
  await page.goto("/");
  await pause(page, 1300);

  await loginPatient(page);
  await pause(page, 1200);

  await clickButton(page, "View Your Appointments");
  await pause(page, 1200);
  await page.goBack();
  await page.getByRole("heading", {name: /Patient Menu/}).waitFor();
  await pause(page);

  await clickButton(page, "Request an Appointment");
  await page.locator("#appointmentType").waitFor();
  await pause(page);
  await page.locator("#appointmentType").click();
  await page.getByRole("option", {name: "Routine"}).click();
  await page.locator("#comments").fill("Portfolio demo appointment request");
  await page.getByRole("checkbox").first().click();
  await pause(page, 1200);
  await clickButton(page, "Cancel");

  await page.goto("/staff/login");
  await pause(page, 1000);

  await loginStaff(page);
  await pause(page, 1200);

  await clickButton(page, "Search Patient");
  await page.getByRole("textbox", {name: "Search"}).fill("martin@test.com");
  await pause(page, 1300);

  await page.goto("/staff/menu");
  await pause(page);
  await clickButton(page, "Appointment Requests");
  await pause(page, 1200);

  await page.goto("/staff/menu");
  await pause(page);
  await clickButton(page, "Employees");
  await pause(page, 1400);

  await page.goto("/");
  await pause(page, 1000);
}

(async () => {
  await safeRemove(tempDir);
  fs.mkdirSync(tempDir, {recursive: true});
  fs.mkdirSync(outputDir, {recursive: true});

  const api = startServer(path.join("scripts", "e2e-server.js"));
  const frontend = startServer(path.join("scripts", "static-server.js"));

  try {
    await Promise.all([
      waitForUrl("http://127.0.0.1:4000/patient"),
      waitForUrl("http://127.0.0.1:3000")
    ]);

    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext({
      baseURL: "http://127.0.0.1:3000",
      viewport: {width: 1280, height: 720},
      recordVideo: {
        dir: tempDir,
        size: {width: 1280, height: 720}
      }
    });
    const page = await context.newPage();
    await runTour(page);
    const video = page.video();

    await page.close();
    await context.close();
    await browser.close();

    const videoPath = await video.path();
    fs.copyFileSync(videoPath, outputPath);
    console.log("Demo video saved to " + path.relative(repoDir, outputPath));
  } finally {
    frontend.kill();
    api.kill();
    await safeRemove(tempDir);
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
