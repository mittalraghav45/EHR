# Contributing

## Before changing code

Understand the route and state flow first. The application uses React Router, MUI and json-server.

## Required checks

    npm test
    npm run build
    cd surgery-ui
    npx playwright test

CI performs these checks automatically. Playwright starts its own isolated in-memory API server.

## Workflow changes

Changes to patient/staff navigation, authentication, appointments, registration or clinical-record access should include corresponding automated tests.

Do not bypass or weaken route guards to make tests pass.

## E2E policy

- Test visible user behaviour and real HTTP mutations.
- Use synthetic unique test records.
- Clean up records created by tests where possible.
- Do not depend on persistent db.json during Playwright runs.
- Do not add real credentials, patient data, tokens, API keys or MongoDB connection strings.
- A green unit/build result is insufficient if Playwright fails.

## Data safety

Never commit real patient information, production credentials, secrets, access tokens or database exports.

## Pull requests

Describe the workflow changed, routes/API resources affected, tests added/updated and migration/deployment implications.
