# Security Assessment & System Limitations

This document provides a frank security evaluation of the Cloud Surgery EHR prototype. It identifies known vulnerabilities, explains architectural trade-offs, and lists requirements before any real deployment or real patient data handling.

## 1. Executive Summary

> [!CAUTION]
> **Not suitable for production or real patient data.**
> Cloud Surgery is an educational local prototype for coursework and portfolio demonstration. It does not implement the security controls required for healthcare software.

As of 8 October 2026, the application is suitable to present as a local mock-data EHR prototype. It is not a deployable healthcare product.

## 2. Current Prototype Limitations

### 2.1 Client-Side Hashing and Credentials in URLs

The app computes MD5 hashes on the client and sends the hash in a URL path such as:

```text
GET /api/login/martin@test.com/ec121ff80513ae58ed478d5c5787075b
```

Risks:
* The MD5 hash effectively becomes the password.
* URLs can be stored in browser history, server logs, proxy logs, and referrer headers.
* MD5 is obsolete and fast to brute-force.
* Password hashes are unsalted.

### 2.2 Client-Side Session Management

Authentication state lives in React memory.

Risks:
* No backend session validation.
* No secure HTTP-only cookies.
* No signed JWT validation.
* Refreshing the page resets the session state.

### 2.3 Unsecured Mock REST Backend

`json-server` exposes local CRUD endpoints over port 4000.

Risks:
* No server-side authentication.
* No server-side authorization or RBAC.
* No patient data isolation checks.
* Single-file JSON storage is unsuitable for concurrent production use.

### 2.4 Dependency and Tooling Risk

The frontend uses Create React App via `react-scripts@5.0.1`.

Status:
* `npm audit fix` was run locally on 8 October 2026 and removed the critical audit category.
* Remaining audit findings require breaking upgrades or a planned migration away from Create React App.
* `npm audit fix --force` was not used because npm reports breaking changes.

## 3. Required Security Work Before Production

Before this application could handle real patient data or be deployed publicly, it would need:

* A real backend authentication service.
* Server-side password hashing with bcrypt or argon2id.
* Credentials sent by HTTPS `POST`, never URL parameters.
* Secure `HttpOnly`, `Secure`, `SameSite` cookies or a carefully implemented JWT/session model.
* Server-side RBAC on every API endpoint.
* Patient-level authorization checks.
* A production database such as PostgreSQL or MySQL.
* Audit logging for clinical data changes.
* TLS everywhere.
* Server-side input validation.
* CSRF protection where cookie auth is used.
* Security headers including a strict Content Security Policy.
* A modern maintained frontend toolchain.

## 4. Portfolio Wording

Recommended portfolio description:

> Cloud Surgery is a local React EHR prototype built for coursework and portfolio demonstration. It includes patient/staff workflows, a mock JSON Server API, seeded demo data, automated tests, and documented production limitations.

Avoid describing it as:
* Production-ready.
* Suitable for real patient records.
* Secure healthcare software.
* HIPAA/NHS/GDPR compliant.
