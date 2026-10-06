# Cloud Surgery EHR — Chat Handoff

## Repository

- GitHub: `mittalraghav45/EHR`
- Branch: `main`
- Active application: `surgery-ui/`
- Frontend: React + MUI + React Router
- Development API: json-server on port 4000
- E2E API: isolated in-memory json-server on port 4000
- E2E browser: Chromium via Playwright

## User expectation

Work directly in GitHub: inspect code, edit it, commit it and validate it through GitHub Actions. Do not ask the user to perform CI fixes manually. Do not declare success without green automated validation.

## Current status — 2026-10-06 23:56 UK

Latest completed CI run: **#80 / 37541704346**

- Jest: PASS
- Production build: PASS
- Playwright: FAIL
- Playwright result: **8 passed, 3 failed**
- No CI run is currently active.

### Failing tests

**1. Patient appointment request**
- Test: `patient can submit an appointment request`
- Failure: first date checkbox remains unchecked after clicking.
- Relevant files: `AppointmentRequestPage.js`, `LabelledCheckbox.js`, `core.spec.js`.

**2. Patient self-registration**
- Test: `patient can complete self registration`
- Failure: 30-second timeout.
- Cleanup masking was removed from the test; next run should expose the exact workflow step.
- Expected API mutations: POST `/api/patient`, then POST `/api/registration`.

**3. Staff employee creation**
- Test: `staff can create a new employee`
- Failure: 30-second timeout.
- Expected mutation: POST `/api/employee`.
- Current form uses a `Register` button.

### Passing E2E tests

1. Home page entry points
2. Patient login
3. Patient portal navigation
4. Patient password reset
5. Staff login/management navigation
6. Staff patient search
7. Staff appointment approval
8. Unauthenticated protected-route checks

## E2E architecture

```
Playwright -> React :3000 -> /api/* -> setupProxy -> isolated json-server :4000
```

The isolated server is `surgery-ui/scripts/e2e-server.js`. It loads `server/db.json` into memory and does not mutate the repository seed.

## Key API resources

- Patient login: GET `/api/patient?email=...&password=...`
- Staff login: GET `/api/employee?email=...&password=...`
- Appointment request: POST `/api/appointmentRequest`
- Appointment creation: POST `/api/appointment`
- Self-registration patient: POST `/api/patient`
- Self-registration request: POST `/api/registration`
- Staff employee creation: POST `/api/employee`

## MongoDB decision

**Do not request or use a MongoDB cluster for the current task.** The repository does not currently have a Mongo-backed runtime. Only introduce MongoDB if the scope explicitly changes to a backend migration.

## Important fixes already made

- Root BrowserRouter architecture fixed.
- Session-expiry navigation fixed.
- Staff route guards added.
- Patient search filtering fixed.
- Appointment request persistence hardened.
- Appointment approval persistence hardened.
- Patient/staff login API routing fixed.
- Registration/password-reset API routing fixed.
- Appointment date state moved to React state.
- Isolated E2E API server added.

## CI

Current pipeline:
1. install dependencies
2. Jest
3. production build
4. Playwright install
5. Chromium install
6. Playwright E2E

Build uses `CI=false` because of existing ESLint warnings.

## Exact continuation prompt

Paste this into a new chat:

> Read `HANDOFF.md`, `PROJECT_STATUS.md` and `E2E_STATUS.md`. Inspect the latest GitHub Actions run on `main`. Continue fixing the remaining 3 Playwright failures: appointment-date checkbox state, patient self-registration timeout, and staff employee-creation timeout. Do not weaken assertions, do not introduce MongoDB, and do not ask me to run commands manually. Edit/commit the repository directly and keep Jest/build green. After all 11 E2E tests pass, perform a route/workflow audit and update the docs.
