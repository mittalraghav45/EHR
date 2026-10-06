# Cloud Surgery EHR — Project Status

Updated: 2026-10-06 23:56 UK time

## Executive status

**Project is NOT complete yet.**

Latest completed GitHub Actions run:
- Run: 80
- Run ID: 37541704346
- Commit: 972bac1c0b8b7a39611731b90ee9cca37762632f
- Unit tests: PASS
- Production build: PASS
- Playwright: FAIL
- E2E result: **8 passed, 3 failed**
- No CI run is currently active.

## Remaining failures

1. **Patient appointment request** — the first available-date checkbox is clicked but remains unchecked. This is a confirmed UI-state defect.
2. **Patient self-registration** — the workflow exceeds the 30-second E2E timeout. Cleanup masking has been removed so the next run can expose the exact failing step.
3. **Staff employee creation** — the registration workflow exceeds the 30-second E2E timeout. The exact failing step still needs a clean diagnostic run.

The other 8 critical E2E tests pass.

## Backend

The current application uses json-server, not MongoDB.

- Development seed: `surgery-ui/server/db.json`
- Route aliases: `surgery-ui/server/routes.json`
- Browser proxy: `surgery-ui/src/setupProxy.js`
- Isolated E2E server: `surgery-ui/scripts/e2e-server.js`

The E2E server loads the seed into memory and runs independently on port 4000. **A MongoDB cluster is not required for the current work.** Only introduce MongoDB if the project scope deliberately changes to a MongoDB backend.

## Already fixed

- Root npm scripts aligned.
- BrowserRouter moved to the application root; nested routers removed.
- Session-expiry redirects made router-safe.
- Staff-only guards added across staff routes/details.
- Patient search fixed to render filtered results.
- Patient registration validation and duplicate-email protection added.
- Appointment-request POST made reliable before navigation.
- Staff appointment approval hardened.
- Patient/staff login switched to direct `/api` queries with error/loading handling.
- Registration/password-reset API calls corrected to use `/api`.
- Appointment-date selection moved to explicit React state.
- Playwright expanded to 11 critical workflow tests.
- Playwright isolated from persistent `db.json`.

## CI

GitHub Actions runs dependency installation, Jest, production build, Playwright/Chromium installation and the 11-test Playwright suite.

The production build currently uses `CI=false` because the legacy codebase still has ESLint warnings. Clean those warnings and restore strict CI later.

## Definition of done

Do not declare completion until:
- all 11 Playwright tests pass;
- Jest passes;
- production build passes;
- assertions are not weakened to hide failures;
- a final route/workflow audit is completed;
- documentation reflects the final architecture and test state.

## Next actions

1. Fix appointment-date checkbox state and prove the POST succeeds.
2. Diagnose self-registration timeout.
3. Diagnose staff employee-creation timeout.
4. Re-run all 11 E2E tests.
5. After E2E is green, audit remaining documented routes/workflows.
6. Clean remaining ESLint warnings and restore `CI=true` when practical.

## New-chat entry point

Read, in order:
1. `HANDOFF.md`
2. `PROJECT_STATUS.md`
3. `E2E_STATUS.md`
4. `README.md`
5. `AGENTS.md`
6. `CONTRIBUTING.md`
7. `surgery-ui/README.md`
8. `surgery-ui/e2e/core.spec.js`
9. `surgery-ui/playwright.config.js`
10. `surgery-ui/scripts/e2e-server.js`
11. `.github/workflows/ci.yml`
