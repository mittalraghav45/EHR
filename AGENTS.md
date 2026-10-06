# EHR Agent Guide

## Purpose

Cloud Surgery is a React electronic-health-record application with patient and staff portals. Keep changes functional, testable and consistent with React Router + MUI + json-server.

## Repository layout

- `surgery-ui/`: active application
- `surgery-ui/src/`: React UI, pages, components, contexts and reducers
- `surgery-ui/server/db.json`: development/test seed
- `surgery-ui/server/routes.json`: json-server aliases
- `surgery-ui/scripts/e2e-server.js`: isolated E2E API
- `surgery-ui/e2e/`: Playwright tests
- `.github/workflows/ci.yml`: CI
- `HANDOFF.md`: continuation instructions
- `PROJECT_STATUS.md`: current project state
- `E2E_STATUS.md`: E2E status/failure history

## Runtime

UI: port 3000.

Browser API calls must use `/api/*`; setupProxy forwards them to port 4000.

Normal development uses `server/db.json`.

Playwright uses the isolated E2E server, which loads the same seed into memory.

## Functional boundaries

- Patient routes must not expose staff functionality.
- Staff routes must use StaffOnly/role checks.
- Appointment requests must persist before navigation.
- Appointment date selection must use React state; do not mutate state objects in place.
- Staff appointment approval must validate request, doctor, date and time before persistence.
- Registration must validate required data and prevent duplicate patient email registration.
- Browser API calls must use `/api/*`.
- Session expiry must return users to the correct login screen.
- Logout must clear application session state.

## Testing rules

Update tests with workflow changes. Do not weaken assertions to make failures disappear.

Browser tests must exercise visible behaviour and real HTTP mutations against the isolated E2E API.

Do not skip failing tests. Diagnose the application or fixture and fix the underlying issue.

## Data rules

Use synthetic development data only. Never commit real patient data, production credentials, secrets, tokens, API keys or MongoDB connection strings.

## Change discipline

1. Inspect route/state flow first.
2. Preserve API resource names unless deliberately migrating.
3. Prefer small coherent commits.
4. Verify Jest, build and Playwright in CI.
5. Update documentation when routes, commands, workflows or backend assumptions change.
6. Do not call the project complete until critical E2E workflows are green.
