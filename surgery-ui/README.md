# Cloud Surgery

## Design principles
- Minimum clicks for use cases.
- Fetch/search -> select -> CRUD form.
- Prevent invalid actions rather than relying on error messages.
- Enable buttons only when actions are valid.
- Validate when helpful.

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

Staff:
- Login: /staff/login
- Appointment requests: /staff/appointmentRequests
- Patient search: /staff/search
- Employees: /staff/employees

See the repository root E2E_STATUS.md for current coverage and failures.
