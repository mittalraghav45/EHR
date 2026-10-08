# Cloud Surgery EHR - Project Status

Updated: 2026-10-08 UK time

## Executive status

**Project is locally complete for coursework/portfolio demonstration.**

Latest local verification:
- Unit tests: PASS, 4 suites and 8 tests
- Production build: PASS, with non-blocking legacy ESLint warnings
- Playwright: PASS
- E2E result: **11 passed, 0 failed**

GitHub Actions should be rerun after pushing these changes so the remote run history reflects the local green state.

## Backend

The current application uses json-server, not MongoDB.

- Development seed: `surgery-ui/server/db.json`
- Route aliases: `surgery-ui/server/routes.json`
- Browser proxy: `surgery-ui/src/setupProxy.js`
- Isolated E2E API server: `surgery-ui/scripts/e2e-server.js`
- Isolated E2E frontend/proxy server: `surgery-ui/scripts/static-server.js`

The E2E server loads the seed into memory and runs independently on port 4000. **A MongoDB cluster is not required for the current work.**

## Fixed and verified

- Root npm scripts aligned.
- BrowserRouter moved to the application root; nested routers removed.
- Session-expiry redirects made router-safe.
- Staff-only guards added across staff routes/details.
- Patient search fixed to render filtered results.
- Patient registration validation and duplicate-email protection added.
- Appointment-request POST made reliable before navigation.
- Appointment-date selection moved to explicit React state.
- Staff appointment approval now loads doctor data on the details page when needed.
- Patient/staff login switched to direct `/api` queries with error/loading handling.
- Registration/password-reset API calls corrected to use `/api`.
- Playwright expanded to 11 critical workflow tests and all pass locally.
- Playwright isolated from persistent `db.json`.
- Playwright frontend server hardened to use the production build and a static proxy server for stable terminal/E2E runs.

## CI

GitHub Actions runs dependency installation, Jest, production build, Playwright/Chromium installation and the 11-test Playwright suite.

The production build currently uses `CI=false` because the legacy codebase still has ESLint warnings. Clean those warnings and restore strict CI later.

## Definition of done

Current coursework/portfolio definition of done is met locally:
- all 11 Playwright tests pass;
- Jest passes;
- production build passes;
- assertions cover real workflows and were not weakened to hide failures;
- documentation reflects the final architecture and test state.

## Next actions

1. Push the current branch and rerun GitHub Actions.
2. Clean remaining ESLint warnings when practical.
3. Plan a dependency/security migration away from Create React App before any production-style deployment.
