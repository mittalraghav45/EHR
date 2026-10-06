# Cloud Surgery EHR

Cloud Surgery is a React-based electronic-health-record application providing separate patient and staff portals.

## Current project status

The active application is surgery-ui/. Unit tests and the production build are passing in GitHub Actions. Playwright Chromium E2E is the current release gate and is being expanded across the documented patient/staff workflows.

Latest known state:
- Unit tests: passing
- Production build: passing
- Playwright: running on the latest commit
- The previous completed Playwright run had 7 passing and 4 failing tests; remaining failures are being fixed rather than hidden.

See E2E_STATUS.md for the detailed handoff and failure history.

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

From the repository root:

    npm install
    npm start

UI: http://localhost:3000. Development json-server: port 4000. The React proxy maps /api/* to that backend.

Useful checks:

    npm test
    npm run build
    cd surgery-ui
    npx playwright test

Playwright starts a dedicated in-memory E2E API server, so browser tests do not mutate the normal db.json.

## Patient portal

Entry: /patient/login

A successful patient login opens /patient/menu. Patients can update details, request appointments, view appointments, medical history, prescriptions and tests, and log out.

### Self-registration

Flow:
1. /register/start
2. /register/personal
3. /register/contact
4. /register/consent
5. /register/confirm

The confirmation step checks for an existing patient email before creating patient and registration records.

### Password reset

Starts at /patient/password/forgot and completes at /patient/password/reset.

## Staff portal

Entry: /staff/login

Sample development credentials from surgery-ui/server/db.json:
- smith@lostinspace.com / pain

Staff can access appointment requests, registration requests, patient search, today's appointments and employees.

Staff-only routes use the role guard. Unauthenticated or patient users receive an access message.

### Appointment requests

Staff open /staff/appointmentRequests, select a request, then open /staff/appointmentRequest. Approval requires doctor, date and time and persists the appointment before removing the request.

### Patient search and records

Staff search at /staff/search. Patient details link to medical history, prescriptions and tests. These staff record pages are protected.

### Staff registration

Available at /staff/register. Roles are Doctor, Nurse and Administrator.

## Development backend

The application currently uses json-server rather than a production API service.

- Database: surgery-ui/server/db.json
- Route aliases: surgery-ui/server/routes.json
- Proxy: surgery-ui/src/setupProxy.js
- E2E server: surgery-ui/scripts/e2e-server.js

A MongoDB cluster is not currently required for the application or CI. Introduce MongoDB only as a deliberate backend migration and never commit its credentials.

## Testing and CI

GitHub Actions runs dependency installation, unit tests, production build, Playwright installation, Chromium installation and Playwright browser tests.

Current E2E coverage includes:
- Patient entry and login
- Patient portal navigation
- Patient appointment request
- Patient self-registration
- Patient password reset
- Staff login and management navigation
- Staff patient search
- Staff appointment approval
- Staff employee creation
- Protected patient/staff routes

E2E failures block CI.

## Security

This is a development/academic application, not production clinical infrastructure. Production use would require a real backend, stronger authentication/authorization, sensitive-data protection, audit controls and security review.
