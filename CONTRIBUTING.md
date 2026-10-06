# Contributing

## Before changing code

Understand the route and state flow first. The application uses React Router, React context/reducers, MUI and a json-server development backend.

## Required checks

For application changes:

```bash
npm test
npm run build
cd surgery-ui
npx playwright test
```

CI performs these checks automatically.

## Workflow changes

Any change to patient/staff navigation, authentication, appointment requests, registration, or clinical-record access should include a corresponding automated test.

Do not bypass or weaken route guards to make tests pass.

## Data safety

Use only synthetic development data. Never commit real patient information, credentials, secrets, access tokens or production database exports.

## Pull requests

Describe:
- What user workflow changed.
- Which routes/API resources are affected.
- Tests added or updated.
- Any migration or deployment implications.

Keep commits focused and avoid unrelated formatting changes.
