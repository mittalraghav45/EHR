import dayjs from "dayjs";
import { buildPatientPayload, buildRegistrationPayload } from "../registrationMapper";

const baseRegister = {
    status: "Pending",
    comments: "",
    email: "  TestPatient@example.com ",
    password: "plaintext",
    title: "Mr",
    firstName: "Test",
    surname: "Patient",
    dateOfBirth: dayjs("1990-01-01"),
    gender: "Male",
    phoneNumbers: {
        mobile: "07700 900123",
        home: ""
    },
    address: {
        street: "123 Any Street",
        line2: "",
        townCity: "Southampton",
        postCode: "so14 6uq"
    },
    consent: {
        email: true,
        sms: false,
        nextOfKin: true
    }
};

describe("registrationMapper", () => {
    test("buildPatientPayload normalises text and phone/address structures", () => {
        const payload = buildPatientPayload(baseRegister, "hashed-value");

        expect(payload.email).toBe("testpatient@example.com");
        expect(payload.address.postCode).toBe("SO14 6UQ");
        expect(payload.patientStatus).toBe("Pending Verification");
        expect(payload.dateOfBirth).toBe("01/01/1990");
        expect(payload.staffId).toBe(-1);
        expect(payload.staffName).toBe("Pending Assignment");
        expect(payload.phoneNumbers.mobile).toBe(baseRegister.phoneNumbers.mobile);
        expect(payload.resetToken).toBeNull();
        expect(payload.resetTokenExpiry).toBeNull();
    });

    test("buildRegistrationPayload sets patient id and ISO birthday", () => {
        const payload = buildRegistrationPayload(baseRegister, "hashed-value", 42, { submittedAt: "2024-05-01T00:00:00.000Z" });

        expect(payload.email).toBe("testpatient@example.com");
        expect(payload.patientId).toBe(42);
        expect(payload.dateOfBirth).toBe(dayjs("1990-01-01").toISOString());
        expect(payload.submittedAt).toBe("2024-05-01T00:00:00.000Z");
    });
});
