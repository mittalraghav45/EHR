# Cloud Surgery

## Development

    npm install
    npm start

Patient entry: http://localhost:3000/
Patient login: http://localhost:3000/patient/login
Staff login: http://localhost:3000/staff/login
Development API: port 4000

Sample patient: martin@test.com / bananas
Sample staff: smith@lostinspace.com / pain

## Tests

    npm test
    npm run build
    npx playwright test

Playwright starts the React frontend and scripts/e2e-server.js. The E2E API server loads server/db.json into memory, so browser tests do not mutate the development seed.

## Main workflows

Patient:
- Login: /patient/login
- Self-registration: /register/start
- Appointment request: /patient/appointmentRequest
- Password reset: /patient/password/forgot
- Portal records: appointments, medical history, prescriptions, tests

Staff:
- Login: /staff/login
- Appointment requests: /staff/appointmentRequests
- Patient search: /staff/search
- Employees: /staff/employees
- Registration requests: /staff/registrations

## Current E2E status

The critical suite has 11 tests. The latest completed CI run passed 8 and failed 3:
- appointment-date checkbox state
- patient self-registration
- staff employee creation

See root `HANDOFF.md`, `PROJECT_STATUS.md` and `E2E_STATUS.md` for continuation instructions.
