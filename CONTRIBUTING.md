# Contributing

## Before changing code

Understand the route and state flow first. The application uses React Router, MUI and json-server.

## Required checks

    npm test
    npm run build
    cd surgery-ui
    npx playwright test

CI performs these checks automatically. Playwright starts its own isolated in-memory API server.

## E2E policy

- Test visible user behaviour and real HTTP mutations.
- Use synthetic unique test records.
- Clean up records created by tests where possible.
- Do not depend on persistent `db.json` during Playwright runs.
- Do not weaken assertions to make failures disappear.
- Do not skip failing tests.
- A green unit/build result is insufficient if Playwright fails.

## Current release gate

The critical Playwright suite contains 11 workflows. As of 2026-10-06, 8 pass and 3 fail. The repository must not be described as complete until all critical E2E tests are green.

## Data safety

Never commit real patient information, production credentials, secrets, access tokens, database exports or MongoDB connection strings.

## Workflow changes

Changes to authentication, navigation, appointments, registration or clinical-record access should include corresponding automated tests.

## Pull requests

Describe the workflow changed, routes/API resources affected, tests added/updated and migration/deployment implications.
