import { evaluatePassword, passwordCriteria, passwordStrengthPercent } from "../passwordPolicy";

describe("passwordPolicy", () => {
    test("evaluatePassword fails when criteria not met", () => {
        const result = evaluatePassword("abc");
        expect(result.isValid).toBe(false);
        expect(result.score).toBeLessThan(passwordCriteria.length);
    });

    test("evaluatePassword passes when all rules satisfied", () => {
        const strongPassword = "Abcd1234!";
        const result = evaluatePassword(strongPassword);
        expect(result.isValid).toBe(true);
        expect(result.score).toBe(passwordCriteria.length);
        expect(passwordStrengthPercent(result.score)).toBe(100);
    });
});
