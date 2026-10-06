# EHR Agent Guide

## Purpose
Cloud Surgery is a React electronic health-record application with patient and staff portals. Keep changes functional, testable, and consistent with React Router + MUI + json-server.

## Repository layout
- surgery-ui/: active application
- surgery-ui/src/: React UI, pages, components, contexts and reducers
- surgery-ui/server/db.json: development/test seed data
- surgery-ui/server/routes.json: json-server route aliases
- surgery-ui/scripts/e2e-server.js: isolated in-memory API server for Playwright
- surgery-ui/e2e/: Playwright tests
- .github/workflows/ci.yml: CI
- E2E_STATUS.md: current testing/project handoff

## Runtime
UI: port 3000. Browser API calls use /api/* and are proxied to port 4000. BrowserRouter is mounted at the application root.

Normal development uses server/db.json. Playwright uses e2e-server.js, which loads the same seed into memory and runs independently.

## Functional boundaries
- Patient routes must not expose staff functionality.
- Staff routes must use StaffOnly/role checks.
- Appointment requests must persist successfully before navigation.
- Appointment date selection must use React state; do not mutate state objects in place.
- Staff appointment approval must validate request, doctor, date and time before persistence.
- Registration must validate required data and prevent duplicate patient email registration.
- Browser API calls must use /api/*.
- Session expiry must return users to the correct login screen.
- Logout must clear application session state.

## Testing rules
Update tests with workflow changes. Do not weaken assertions to make failures disappear. Browser tests must exercise visible behaviour and real HTTP requests against the isolated E2E API.

Do not skip failing tests. Diagnose the application or fixture and fix the underlying issue.

## Data rules
Use synthetic development data only. Never commit real patient data, production credentials, secrets, tokens, API keys or MongoDB connection strings.

## Change discipline
1. Inspect the existing route/state flow.
2. Preserve domain/API resource names unless deliberately migrating.
3. Prefer small coherent commits.
4. Verify unit tests, build and Playwright E2E in CI.
5. Update documentation when routes, commands, workflows or backend assumptions change.
6. Do not call the project complete until critical E2E workflows are green.
