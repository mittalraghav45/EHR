# Testing & Verification Report

This document records the automated tests, production build checks, local smoke checks, historic browser/API checks, and known limitations for the Cloud Surgery EHR prototype.

## 1. Test Execution Summary

* **Latest local execution date:** 8 October 2026
* **Environment:** Windows 11, Node.js `v24.13.0`, npm `10.8.1`
* **Local outcome:** All current local automated tests passed.

| Test Layer | Test Type | Tooling | Result |
| :--- | :--- | :--- | :--- |
| Unit and integration | Automated test suite | Jest / React Testing Library | PASS locally: 6 suites, 15 tests |
| Production build | Static bundle compilation | `react-scripts build` | PASS locally: exit code 0, with warnings |
| Frontend smoke check | Dev server HTTP response | `Invoke-WebRequest` | PASS: `http://localhost:3000/` returned HTTP 200 |
| Mock API smoke check | Seeded patient API response | `Invoke-RestMethod` | PASS: `http://localhost:4000/patient/1` returned `martin@test.com` |
| GitHub CI / Playwright gate | Remote CI status from README | GitHub Actions | NOT FULLY GREEN in latest documented status: 8 passing / 3 failing |

## 2. Automated Unit and Integration Tests

Command:

```bash
npm test -- --watchAll=false
```

Latest local result:

```text
PASS src/utils/__tests__/passwordPolicy.test.js
PASS src/utils/__tests__/registrationMapper.test.js
PASS src/reducers/__tests__/sessionAndUserReducers.test.js
PASS src/utils/__tests__/workingDays.test.js
PASS src/pages/patient/__tests__/PatientDashboard.test.js
PASS src/App.test.js

Test Suites: 6 passed, 6 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        5.773 s
Ran all test suites.
```

Coverage focus:
* `passwordPolicy.test.js`: Password validation and strength scoring.
* `registrationMapper.test.js`: Multi-step registration data mapping into patient and registration payloads.
* `workingDays.test.js`: UK date formatting and Sunday exclusion from appointment working days.
* `sessionAndUserReducers.test.js`: Login, logout, session refresh/reset, error messages, and app reducer integration.
* `PatientDashboard.test.js`: Patient appointment, prescription, and test views with seeded state.
* `App.test.js`: Top-level app render and homepage title.

## 3. Production Build Verification

Command:

```bash
npm run build
```

Latest local result:

```text
Creating an optimized production build...
Compiled with warnings.

File sizes after gzip:
  258 kB     build\static\js\main.d6d9b376.js
  1.76 kB   build\static\js\453.b6037abe.chunk.js
  1.71 kB   build\static\css\main.b5433373.css
```

The build exits successfully and produces deployable static assets in `surgery-ui/build/`.

Known build warnings:
* Non-blocking ESLint warnings remain in older staff and patient pages.
* Warnings are mostly unused variables and React hook dependency warnings.
* These warnings do not prevent local operation or production bundle generation, but they should be cleaned up before claiming a warning-free codebase.

## 4. Local Smoke Verification

The app was started with:

```bash
npm start
```

This launched:
* React frontend: `http://localhost:3000/`
* JSON Server mock backend: `http://localhost:4000/`

Smoke check commands:

```powershell
(Invoke-WebRequest -UseBasicParsing http://localhost:3000/).StatusCode
(Invoke-RestMethod http://localhost:4000/patient/1).email
```

Results:

```text
200
martin@test.com
```

## 5. Remote CI Caveat

The current repository README says the latest completed GitHub Actions run has Jest and production build passing, but Playwright at 8 passing / 3 failing. Therefore the project should not be described as fully done or release-ready until the Playwright failures in `E2E_STATUS.md` are resolved and CI is green.

## 6. Dependency Audit Status

`npm audit fix --prefix surgery-ui` was run on 8 October 2026 locally. It removed the critical audit category without forcing breaking changes.

Remaining audit findings are tied largely to Create React App / `react-scripts`, React Router major-version migration, and transitive development tooling. `npm audit fix --force` was intentionally not used because npm reports that it would introduce breaking changes. A proper remediation would be a planned migration away from Create React App, followed by full regression testing.

## 7. Untested Areas and Known Limitations

* Complete self-registration workflow has mapper tests but not a fully passing browser E2E path in CI.
* Staff employee-registration E2E is documented as timing out in the remote status.
* Staff appointment booking concurrency is not tested.
* The full 15-minute natural session timeout is not waited out in real time.
* The build succeeds but is not warning-free.
* The system is a local mock-data prototype, not production healthcare software.
