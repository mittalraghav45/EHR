# Cloud Surgery EHR - Documentation Index

Welcome to the technical documentation for the Cloud Surgery Electronic Health Record (EHR) prototype.

## Project Overview

Cloud Surgery is a local EHR web application prototype for surgery patient management and clinical administration. It provides role-based interfaces for patients and surgery staff.

- **Frontend:** React 18 single-page application using Material UI, React Router v6, `react-request-hook`, and Axios.
- **Mock Backend:** `json-server` on port 4000, backed by `surgery-ui/server/db.json` and route rewrites in `surgery-ui/server/routes.json`.
- **Development Proxy:** `surgery-ui/src/setupProxy.js` forwards `/api/*` browser requests from port 3000 to port 4000.
- **E2E Runtime:** Playwright uses an isolated in-memory API server and production-build static server.
- **Unused Stub Server:** `surgery-server/` contains an incomplete Express stub and is not used by the working app.

## Current Status

| Environment | Status | Verification Summary |
| :--- | :--- | :--- |
| Local demonstration | Verified working | Non-watch tests pass locally with 4 suites and 8 tests. Production build succeeds locally. Playwright passes locally with 11 tests and 0 failures. |
| GitHub CI / release gate | Pending rerun | Push the local green fixes and rerun GitHub Actions so remote status matches the verified local state. |
| Online deployment | Not deployed | No live production or cloud deployment is configured. |

## Portfolio Readiness

The project is suitable to present as a portfolio/coursework prototype when described accurately as a mock-data educational EHR system.

Verified strengths:
- Patient and staff role-based workflows.
- Seeded local demo data.
- Passing local automated test suite.
- Passing local browser E2E suite.
- Successful local optimized production build.
- Documented setup, architecture, API, testing, deployment limitations, and security limitations.

Remaining limitations:
- GitHub CI needs a rerun after pushing the local green changes.
- The build still reports non-blocking ESLint warnings in older staff and patient pages.
- Create React App / `react-scripts` introduces dependency audit findings that need a planned tooling migration to eliminate safely.
- Authentication and persistence are prototype-level only; this must not be used with real patient data.

## Tested Environment

- **Latest local verification date:** 8 October 2026
- **Operating system:** Windows 11
- **Node.js:** `v24.13.0`
- **npm:** `10.8.1`
- **Test runner:** Jest / React Testing Library via `react-scripts test`
- **E2E runner:** Playwright Chromium

## Documentation Roadmap

| Document | Description |
| :--- | :--- |
| [Testing & Verification Report](TESTING.md) | Current local automated test/build/E2E status and limitations. |
| [Security & Limitations](SECURITY_AND_LIMITATIONS.md) | Prototype security risks and production requirements. |
| [Portfolio Status / Wiki Draft](WIKI_PORTFOLIO_STATUS.md) | GitHub wiki-ready project summary page. |
| [Root README](../README.md) | Main repository status, local development, stack, and CI notes. |
| [Project Status](../PROJECT_STATUS.md) | Current project status notes. |
| [E2E Status](../E2E_STATUS.md) | Playwright release-gate status. |
| [Handoff](../HANDOFF.md) | Continuation notes for future development work. |
