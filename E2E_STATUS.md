# E2E / Project Handoff Status

Updated: 2026-10-06

## Repository

GitHub repository: mittalraghav45/EHR
Branch: main
Active application: surgery-ui/

## Current CI state

The latest CI run when this handoff was written is still executing Playwright.

Latest run:
- Run: 75
- Run ID: 37541234291
- Job: ui
- Job ID: 112534470991
- Unit tests: passed
- Build: passed
- Playwright: in progress

Do not declare the project complete until this run and the subsequent fixes produce a green Playwright job.

## What was fixed during this work

1. Root npm scripts and surgery-ui scripts were made consistent.
2. BrowserRouter was moved to the application root.
3. Nested BrowserRouter usage was removed.
4. Session expiry no longer uses navigation outside router context.
5. Staff-only route guards were added to staff management/detail pages.
6. Patient search now renders the filtered patient collection correctly.
7. Patient self-registration validates required data and duplicate email.
8. Patient appointment request waits for the POST before navigating.
9. Staff appointment approval validates doctor/date/time and persists before navigation.
10. Patient/staff login was changed to direct /api/patient and /api/employee queries with loading/error handling.
11. Self-registration/password-reset API calls that bypassed the /api proxy were corrected.
12. Appointment date selection was rewritten to use explicit React state rather than mutating date objects.
13. Playwright was expanded into an 11-test critical workflow suite.
14. Playwright now runs against a dedicated in-memory API server at port 4000, loaded from the development seed. It does not mutate the persistent db.json.

## Current Playwright coverage

1. Home page patient entry points
2. Patient login
3. Patient portal navigation
4. Patient appointment request submission
5. Patient self-registration
6. Patient password reset
7. Staff login and management navigation
8. Staff patient search
9. Staff appointment approval
10. Staff employee creation
11. Unauthenticated protection of patient/staff routes

## Last completed E2E result

Run 72 was the last completed run inspected in detail.

Result:
- 7 passed
- 4 failed

Failures observed:
1. Patient appointment request: checkbox interaction did not change selection.
2. Patient self-registration: the test timed out during cleanup, masking the original workflow failure.
3. Staff appointment approval: the test used the wrong submit control after a test edit and also had a strict-mode issue when multiple View buttons existed.
4. Staff employee creation: the test timed out during cleanup after the form submission did not complete.

Important distinction: some of those failures were test/fixture defects rather than confirmed application defects. The code has since been changed to address the appointment-date state bug, correct test controls, make registration response waiting deterministic, and remove cleanup masking from self-registration.

## Current backend architecture

The repository does NOT currently use MongoDB.

Development backend:
- json-server 0.17.4
- surgery-ui/server/db.json
- surgery-ui/server/routes.json
- surgery-ui/src/setupProxy.js

E2E backend:
- surgery-ui/scripts/e2e-server.js
- Loads db.json into memory
- Runs independently on port 4000
- Prevents Playwright tests from corrupting the development seed

Therefore a MongoDB cluster is NOT required to continue the current E2E work.

Only request/use a MongoDB cluster if the project goal changes to migrating the application backend from json-server to MongoDB.

## Known CI details

GitHub Actions:
- Node 20
- npm install
- npm test
- CI=false npm run build
- Playwright installation
- Chromium installation
- npx playwright test

The production build currently uses CI=false because the existing codebase still has ESLint warnings. Those warnings should eventually be cleaned up and CI=true restored, but E2E functional correctness is the immediate priority.

## Important implementation notes

Browser API requests must use /api/* because setupProxy.js strips /api and forwards to port 4000.

Patient login:
- /api/patient?email=...&password=...

Staff login:
- /api/employee?email=...&password=...

Patient appointment request:
- POST /api/appointmentRequest

Staff appointment approval:
- POST /api/appointment
- Then remove the appointment request only after persistence succeeds

Self-registration:
- POST /api/patient
- POST /api/registration

## Migration instructions for a new chat

Start by reading:
1. E2E_STATUS.md
2. README.md
3. AGENTS.md
4. CONTRIBUTING.md
5. surgery-ui/README.md
6. surgery-ui/e2e/core.spec.js
7. surgery-ui/playwright.config.js
8. surgery-ui/scripts/e2e-server.js
9. .github/workflows/ci.yml

Then inspect the latest GitHub Actions run on main.

The immediate objective is:

"Make all 11 Playwright critical workflow tests pass with no weakening of assertions. Fix the application or test fixture when a test fails. Keep unit tests and build green. Do not introduce MongoDB unless explicitly changing the backend architecture. When all 11 E2E tests are green, perform another route/workflow audit and expand coverage for any documented critical flow still missing."

Do not ask the user to run CI manually. Use the GitHub integration to inspect commits, workflow runs and logs, and make/follow through on fixes directly.

## User-facing migration context

The user saw this browser error during patient self-registration:

"Failed to connect to the server. Please try later."

That failure was traced to browser API routing/backend-test architecture, not to a required MongoDB cluster. The current work is replacing fragile E2E dependence on the persistent json-server process and fixing the affected API/UI flows.

The user wants the assistant to work autonomously, keep the project status updated, and only call the project complete after automated validation is green.
