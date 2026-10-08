# E2E / Project Handoff Status

Updated: 2026-10-08 UK time

## Current state

**GREEN locally.**

Latest local Playwright run:
- Command: `npm run test:e2e`
- Browser: Chromium
- Result: **11 passed, 0 failed**
- Runtime: about 36 seconds

GitHub Actions should be rerun after pushing these changes so remote CI reflects the local green state.

## Fixed failures

- Patient appointment request: the checkbox workflow now targets the actual date checkbox and verifies the POST succeeds.
- Patient self-registration: the full registration browser workflow now passes.
- Staff employee creation: the staff employee browser workflow now passes.
- Staff appointment approval: the details page now loads doctor data when needed before saving.

## Passing tests in latest run

- Home page entry points
- Patient login
- Patient portal navigation
- Patient appointment request submission
- Patient self-registration
- Patient password reset
- Staff login/management navigation
- Staff patient search
- Staff appointment approval
- Staff employee creation
- Unauthenticated protected routes

## Backend

Current runtime is json-server. MongoDB is not required.

Playwright uses `surgery-ui/scripts/e2e-server.js`, an isolated in-memory API server seeded from `server/db.json`, and `surgery-ui/scripts/static-server.js`, a production-build static server with `/api/*` proxying.

## Release rule

The project can be called locally complete for coursework/portfolio demonstration when all 11 critical Playwright tests pass alongside Jest and build. That condition is currently met locally.
