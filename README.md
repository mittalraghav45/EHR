# Cloud Surgery EHR

Cloud Surgery is a React-based electronic health-record application providing separate patient and staff portals.

## Stack

- React 18
- Material UI
- React Router
- json-server development backend
- Axios / react-request-hook for application data access
- Jest + React Testing Library
- Playwright Chromium E2E
- GitHub Actions CI

## Local development

Requirements: Node.js 20 and npm.

From the repository root:

```bash
npm install
npm start
```

The UI is available at `http://localhost:3000`. The development json-server listens on port 4000. The React proxy maps `/api/*` to that backend.

Useful verification commands:

```bash
npm test
npm run build
cd surgery-ui
npx playwright test
```

## Patient portal

Entry: `/patient/login`

A successful patient login opens `/patient/menu`, where the patient can:

- Update personal details
- Request an appointment
- View appointments
- View medical history
- View prescriptions
- View test details
- Log out

Appointment requests contain an appointment type, symptoms/condition and one or more available working days. Submission waits for the backend POST to succeed before returning to the patient menu.

### Self-registration

The registration flow is:

1. `/register/start`
2. `/register/personal`
3. `/register/contact`
4. `/register/consent`
5. `/register/confirm`

The confirmation step checks for an existing patient email before creating the account.

### Password reset

Patient password reset starts at `/patient/password/forgot` and completes at `/patient/password/reset`.

## Staff portal

Entry: `/staff/login`

Sample development staff credentials in `surgery-ui/server/db.json`:

- Email: `smith@lostinspace.com`
- Password: `pain`

After login, staff reach `/staff/menu` with access to:

- Appointment requests
- Registration requests
- Patient search
- Today's appointments
- Employees

Staff-only routes are protected by the staff role guard. Unauthenticated or patient users receive an access message instead of staff content.

### Appointment requests

Staff open `/staff/appointmentRequests`, select a request, then open `/staff/appointmentRequest`. Approval requires a doctor, date and time and persists the appointment before removing the request.

### Patient search and records

Staff search patients at `/staff/search`. Patient details link to medical history, prescriptions and tests. These staff record-management pages are protected from patient/anonymous access.

### Staff registration

Staff registration is available at `/staff/register`. Roles are restricted to Doctor, Nurse and Administrator and required registration fields are validated before submission.

## Development backend

The application currently uses json-server rather than a production API service.

- Database: `surgery-ui/server/db.json`
- Route aliases: `surgery-ui/server/routes.json`
- Proxy: `surgery-ui/src/setupProxy.js`

The seeded database is development data only. Do not use it as a production clinical-data store.

## Testing and CI

GitHub Actions runs:

1. Dependency installation
2. React unit tests
3. Production build
4. Playwright installation
5. Chromium installation
6. Playwright browser tests

The Playwright suite covers critical patient login/appointment-request behaviour, staff login, and staff-route access control. E2E failures are intended to block CI.

## Security and session behaviour

The application maintains client-side session state and has explicit patient/staff route guards. Session expiry redirects to the relevant login screen with feedback.

This repository is a development/academic application. It should not be treated as production-ready clinical infrastructure without replacing the development backend, strengthening authentication/authorization, protecting sensitive data, adding audit controls, and completing a production security review.
