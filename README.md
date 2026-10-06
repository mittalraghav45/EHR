# Cloud Surgery EHR

Cloud Surgery is a React-based electronic-health-record application with separate patient and staff portals.

## Current status

**Core application functional; Playwright release gate is not yet green.**

Latest completed GitHub Actions run:
- Run #80
- Jest: passing
- Production build: passing
- Playwright: **8 passing / 3 failing**
- No CI run currently active

Remaining E2E failures:
1. patient appointment-date checkbox state;
2. patient self-registration timeout;
3. staff employee-registration timeout.

Read `HANDOFF.md`, `PROJECT_STATUS.md` and `E2E_STATUS.md` before continuing work.

## Stack

- React 18
- Material UI
- React Router
- json-server development backend
- Axios / react-request-hook
- Jest + React Testing Library
- Playwright Chromium E2E
- GitHub Actions CI

## Local development

Requirements: Node.js 20 and npm.

    npm install
    npm start

UI: http://localhost:3000
Development API: port 4000

Useful checks:

    npm test
    npm run build
    cd surgery-ui
    npx playwright test

Playwright starts a dedicated in-memory E2E API server, so browser tests do not mutate the normal `db.json`.

## Patient portal

Entry: `/patient/login`

Patient features:
- Update details
- Request appointment
- View appointments
- Medical history
- Prescriptions
- Tests
- Logout

### Self-registration

Flow:
1. `/register/start`
2. `/register/personal`
3. `/register/contact`
4. `/register/consent`
5. `/register/confirm`

The confirmation step checks for an existing patient email before creating patient and registration records.

### Password reset

Starts at `/patient/password/forgot` and completes at `/patient/password/reset`.

## Staff portal

Entry: `/staff/login`

Development credentials:
- Patient: `martin@test.com / bananas`
- Staff: `smith@lostinspace.com / pain`

Staff features include appointment requests, registration requests, patient search, today's appointments and employees.

## Backend architecture

The current application uses json-server rather than MongoDB.

- Seed: `surgery-ui/server/db.json`
- Routes: `surgery-ui/server/routes.json`
- Proxy: `surgery-ui/src/setupProxy.js`
- E2E API: `surgery-ui/scripts/e2e-server.js`

**MongoDB is not required for the current project.** Do not add credentials or connection strings to the repository.

## Testing and CI

GitHub Actions runs dependency installation, Jest, production build, Playwright/Chromium installation and the 11-test Playwright suite.

E2E failures block CI.

## Security

This is a development/academic application, not production clinical infrastructure. Production use would require a real backend, stronger authentication/authorization, sensitive-data protection, audit controls and security review.
