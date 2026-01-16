import dayjs from "dayjs";

function normaliseEmail(email = "") {
    return email.trim().toLowerCase();
}

function normalisePostCode(postCode = "") {
    return postCode.trim().toUpperCase();
}

function clonePhoneNumbers(phoneNumbers = {}) {
    return {
        mobile: phoneNumbers.mobile || "",
        home: phoneNumbers.home || ""
    };
}

function cloneConsent(consent = {}) {
    return {
        email: !!consent.email,
        sms: !!consent.sms,
        nextOfKin: !!consent.nextOfKin
    };
}

function cloneAddress(address = {}) {
    return {
        street: address.street || "",
        line2: address.line2 || "",
        townCity: address.townCity || "",
        postCode: normalisePostCode(address.postCode || "")
    };
}

function formatPatientDateOfBirth(dateOfBirth) {
    if (!dateOfBirth) {
        return "";
    }
    if (typeof dateOfBirth === "string") {
        return dateOfBirth;
    }
    if (dayjs.isDayjs(dateOfBirth)) {
        return dateOfBirth.format("DD/MM/YYYY");
    }
    if (dateOfBirth instanceof Date) {
        return dayjs(dateOfBirth).format("DD/MM/YYYY");
    }
    return "";
}

function formatRegistrationDateOfBirth(dateOfBirth) {
    if (!dateOfBirth) {
        return "";
    }
    if (typeof dateOfBirth === "string") {
        return dateOfBirth;
    }
    if (dayjs.isDayjs(dateOfBirth)) {
        return dateOfBirth.toISOString();
    }
    if (dateOfBirth instanceof Date) {
        return dateOfBirth.toISOString();
    }
    return "";
}

export function buildPatientPayload(register, hashedPassword, overrides = {}) {
    const payload = {
        email: normaliseEmail(register.email),
        password: hashedPassword,
        title: register.title || "",
        firstName: register.firstName || "",
        surname: register.surname || "",
        dateOfBirth: formatPatientDateOfBirth(register.dateOfBirth),
        gender: register.gender || "",
        phoneNumbers: clonePhoneNumbers(register.phoneNumbers),
        staffId: overrides.staffId ?? -1,
        staffName: overrides.staffName ?? "Pending Assignment",
        address: cloneAddress(register.address),
        consent: cloneConsent(register.consent),
        resetToken: null,
        resetTokenExpiry: null
    };

    const merged = {
        ...payload,
        ...overrides
    };

    if (!merged.patientStatus) {
        merged.patientStatus = "Pending Verification";
    }

    return merged;
}

export function buildRegistrationPayload(register, hashedPassword, patientId, overrides = {}) {
    return {
        status: register.status || "Pending",
        comments: register.comments || "",
        email: normaliseEmail(register.email),
        password: hashedPassword,
        title: register.title || "",
        firstName: register.firstName || "",
        surname: register.surname || "",
        dateOfBirth: formatRegistrationDateOfBirth(register.dateOfBirth),
        gender: register.gender || "",
        phoneNumbers: clonePhoneNumbers(register.phoneNumbers),
        address: cloneAddress(register.address),
        consent: cloneConsent(register.consent),
        patientId: typeof patientId === "number" ? patientId : null,
        submittedAt: new Date().toISOString(),
        ...overrides
    };
}
