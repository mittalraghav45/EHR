# Cloud Surgery EHR Portfolio Status

## Summary

Cloud Surgery is a local React EHR prototype for coursework and portfolio demonstration. It provides role-based patient and staff workflows, a seeded mock REST API, automated tests, and a documented production-readiness assessment.

## Current Verification

Latest local verification date: 8 October 2026.

| Area | Status |
| :--- | :--- |
| Local frontend | Verified at `http://localhost:3000/` |
| Mock API | Verified at `http://localhost:4000/` |
| Automated tests | Passing locally: 6 suites, 15 tests |
| Production build | Passing locally with non-blocking ESLint warnings |
| GitHub CI | Latest repository README reports Playwright release gate not fully green |
| Production deployment | Not deployed |

## How to Run Locally

```bash
cd surgery-ui
npm install
cd ..
npm start
```

The app starts:

* React frontend: `http://localhost:3000/`
* JSON Server API: `http://localhost:4000/`

## Test and Build Commands

```bash
npm test -- --watchAll=false
npm run build
```

## Demo Credentials

Patient:

* Email: `martin@test.com`
* Password: `bananas`

Staff:

* Email: `smith@lostinspace.com`
* Password: `pain`

## Portfolio Positioning

Recommended description:

> Cloud Surgery is a local React EHR prototype built for coursework and portfolio demonstration. It includes patient/staff workflows, a mock JSON Server API, seeded demo data, automated tests, and documented production limitations.

Avoid describing it as production-ready, secure healthcare software, or suitable for real patient records.

## Known Limitations

* Uses `json-server` and local JSON file persistence.
* Uses prototype-level client-side MD5 hashing.
* Does not implement real backend authentication or server-side authorization.
* Build succeeds locally but still reports non-blocking ESLint warnings.
* GitHub CI/E2E status should be checked before claiming the repository is fully release-ready.
* Remaining dependency audit findings require a planned migration away from Create React App / `react-scripts`.

## Related Repository Docs

* `README.md`
* `PROJECT_STATUS.md`
* `E2E_STATUS.md`
* `HANDOFF.md`
* `docs/README.md`
* `docs/TESTING.md`
* `docs/SECURITY_AND_LIMITATIONS.md`
