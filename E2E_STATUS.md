# E2E / Project Handoff Status

Updated: 2026-10-06 23:56 UK time

## Current state

**NOT GREEN.**

Latest completed GitHub Actions run:
- Run: 80
- Run ID: 37541704346
- Commit: 972bac1c0b8b7a39611731b90ee9cca37762632f
- Jest: passed
- Build: passed
- Playwright: failed
- Result: **8 passed, 3 failed**
- No run currently active.

## Current failures

### Patient appointment request

Playwright clicks the first appointment-date checkbox but observes it as unchecked.

Relevant:
- `surgery-ui/src/pages/patient/AppointmentRequestPage.js`
- `surgery-ui/src/components/LabelledCheckbox.js`
- `surgery-ui/e2e/core.spec.js`

### Patient self-registration

The full registration flow exceeds the 30-second timeout. The cleanup wrapper that previously masked the original failure has been removed.

Relevant:
- `surgery-ui/src/pages/patient/SelfRegistrationNameEmailPage.js`
- `surgery-ui/src/pages/patient/SelfRegistrationConfirmPage.js`
- `surgery-ui/src/pages/patient/SelfRegistrationAddressPhonePage.js`
- `surgery-ui/src/pages/patient/SelfRegistrationConsentPage.js`
- `surgery-ui/e2e/core.spec.js`

### Staff employee creation

The staff registration flow exceeds the 30-second timeout.

Relevant:
- `surgery-ui/src/pages/staff/RegistrationPage.js`
- `surgery-ui/e2e/core.spec.js`

## Passing tests in latest run

- Home page entry points
- Patient login
- Patient portal navigation
- Patient password reset
- Staff login/management navigation
- Staff patient search
- Staff appointment approval
- Unauthenticated protected routes

## Backend

Current runtime is json-server. MongoDB is not required.

Playwright uses `surgery-ui/scripts/e2e-server.js`, an isolated in-memory server seeded from `server/db.json`.

## Release rule

Do not call the project complete until all 11 critical Playwright tests pass, alongside Jest and build.

## Next run strategy

Do not guess. Use the next Playwright log to identify the exact failing UI step for self-registration and staff registration, then fix the application/fixture. For the checkbox, inspect the controlled state path from `AppointmentRequestPage` through `LabelledCheckbox` and verify the rendered input state.
