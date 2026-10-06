# EHR Agent Guide

## Purpose
Cloud Surgery is a React electronic health-record application with patient and staff portals. Keep changes functional, testable, and consistent with the existing React Router + MUI + json-server architecture.

## Repository layout
- `surgery-ui/`: active application.
- `surgery-ui/src/`: React UI, pages, components, contexts and reducers.
- `surgery-ui/server/db.json`: development/test data.
- `surgery-ui/server/routes.json`: json-server login route aliases.
- `surgery-ui/e2e/`: Playwright end-to-end tests.
- `.github/workflows/ci.yml`: unit-test, build and E2E CI.

## Runtime
The UI runs on port 3000 and proxies `/api/*` to json-server on port 4000. The React app uses BrowserRouter at the application root.

## Commands
From the repository root:
- `npm install`
- `npm test`
- `npm run build`
- `npm start`

From `surgery-ui/`:
- `npm test`
- `npm run build`
- `npm start`
- `npx playwright test`

CI installs Playwright and Chromium and runs browser tests after unit tests and the production build.

## Functional boundaries
- Patient routes must not expose staff functionality.
- Staff routes must use `StaffOnly`/role checks.
- Patient appointment requests must wait for a successful POST before navigating away.
- Staff appointment approval must validate the request, doctor, date and time and only navigate after persistence succeeds.
- Registration must validate required data and prevent duplicate patient email registration.
- Session expiry must return users to the appropriate login screen.
- Logout must clear application session state.

## Testing rules
When changing a workflow, update or add the closest unit/E2E test. Do not weaken assertions to make a failing test pass. Browser tests should exercise visible user behaviour and real HTTP requests against the development json-server.

## Data rules
`server/db.json` contains development credentials and sample clinical data. Never add real patient data, secrets, production credentials, tokens or API keys.

## Change discipline
1. Inspect the existing route/component/reducer flow before changing it.
2. Preserve existing domain terminology and API resource names unless there is a clear migration.
3. Prefer small, coherent commits.
4. Run/verify unit tests, production build and Playwright E2E in CI.
5. Update README/docs when routes, commands, workflows or operational assumptions change.
