# Cloud Surgery EHR

Cloud Surgery is a React-based electronic-health-record coursework prototype with separate patient and staff portals.

## Current status

**Core application functional; local release checks are green.**

Latest local verification, 8 October 2026:
- Jest / React Testing Library: **4 suites, 8 tests passing**
- Production build: **passing**, with non-blocking legacy ESLint warnings
- Playwright Chromium E2E: **11 passing / 0 failing**

GitHub Actions should be rerun after pushing these changes so the remote badge/history reflects the local green state.

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

Requirements: Node.js and npm.

```bash
npm install
npm start
```

UI: `http://localhost:3000`
Development API: port `4000`

Useful checks:

```bash
npm test
npm run build
npm run test:e2e
```

Playwright starts a dedicated in-memory E2E API server, so browser tests do not mutate the normal `db.json`.

## Demo credentials

- Patient: `martin@test.com / bananas`
- Staff: `smith@lostinspace.com / pain`

## Patient portal

Entry: `/patient/login`

Patient features:
- Update details
- Request appointment
- View appointments
- Medical history
- Prescriptions
- Tests
- Password reset
- Self-registration

## Staff portal

Entry: `/staff/login`

Staff features include appointment requests, registration requests, patient search, today's appointments and employees.

## Backend architecture

The current application uses json-server rather than MongoDB.

- Seed: `surgery-ui/server/db.json`
- Routes: `surgery-ui/server/routes.json`
- Proxy: `surgery-ui/src/setupProxy.js`
- E2E API: `surgery-ui/scripts/e2e-server.js`
- E2E static frontend/proxy: `surgery-ui/scripts/static-server.js`

**MongoDB is not required for the current project.** Do not add credentials or connection strings to the repository.

## Documentation

Additional portfolio and verification documentation is available in [`docs/`](docs/README.md):

- [Documentation Index](docs/README.md)
- [Testing & Verification Report](docs/TESTING.md)
- [Security & Limitations](docs/SECURITY_AND_LIMITATIONS.md)
- [Wiki-ready Portfolio Status](docs/WIKI_PORTFOLIO_STATUS.md)

## Security

This is a development/academic application, not production clinical infrastructure. Production use would require a real backend, stronger authentication/authorization, sensitive-data protection, audit controls and security review.
