# Testing & Verification Report

This document records the automated tests, production build checks, browser E2E checks, and known limitations for the Cloud Surgery EHR prototype.

## 1. Test Execution Summary

- **Latest local execution date:** 8 October 2026
- **Environment:** Windows 11, Node.js `v24.13.0`, npm `10.8.1`
- **Local outcome:** All current local automated tests passed.

| Test Layer | Test Type | Tooling | Result |
| :--- | :--- | :--- | :--- |
| Unit and integration | Automated test suite | Jest / React Testing Library | PASS locally: 4 suites, 8 tests |
| Production build | Static bundle compilation | `react-scripts build` | PASS locally: exit code 0, with warnings |
| End-to-end workflows | Browser automation | Playwright Chromium | PASS locally: 11 tests, 0 failures |
| GitHub CI / Playwright gate | Remote CI status | GitHub Actions | Needs rerun after pushing the local green fixes |

## 2. Automated Unit and Integration Tests

Command:

```bash
npm test
```

Latest local result:

```text
Test Suites: 4 passed, 4 total
Tests:       8 passed, 8 total
Snapshots:   0 total
```

Coverage focus:
- `passwordPolicy.test.js`: Password validation and strength scoring.
- `registrationMapper.test.js`: Multi-step registration data mapping into patient and registration payloads.
- `PatientDashboard.test.js`: Patient appointment, prescription, and test views with seeded state.
- `App.test.js`: Top-level app render and homepage title.

## 3. Production Build Verification

Command:

```bash
npm run build
```

Latest local result:

```text
Compiled with warnings.
The build folder is ready to be deployed.
```

The build exits successfully and produces deployable static assets in `surgery-ui/build/`.

Known build warnings:
- Non-blocking ESLint warnings remain in older staff and patient pages.
- Warnings are mostly unused variables and React hook dependency warnings.
- These warnings do not prevent local operation or production bundle generation, but they should be cleaned up before claiming a warning-free codebase.

## 4. Browser E2E Verification

Command:

```bash
npm run test:e2e
```

Latest local result:

```text
11 passed (36.0s)
```

The Playwright suite covers patient entry, patient login, patient portal navigation, appointment request submission, self-registration, password reset, staff login/navigation, patient search, appointment approval, staff employee creation, and protected-route blocking.

## 5. Remote CI Caveat

The local release gate is green. GitHub Actions should be rerun after pushing these changes so the remote run history reflects the current state.

## 6. Dependency Audit Status

`@playwright/test` and `@babel/plugin-proposal-private-property-in-object` are now explicit dev dependencies. The Babel package is a Create React App compatibility workaround.

Remaining audit findings are tied largely to Create React App / `react-scripts`, React Router major-version migration, and transitive development tooling. `npm audit fix --force` was intentionally not used because it can introduce breaking changes. A proper remediation would be a planned migration away from Create React App, followed by full regression testing.

## 7. Untested Areas and Known Limitations

- Staff appointment booking concurrency is not tested.
- The full 15-minute natural session timeout is not waited out in real time.
- The build succeeds but is not warning-free.
- The system is a local mock-data prototype, not production healthcare software.
