export const passwordCriteria = [
    {
        label: "8 or more characters",
        test: (value) => value.length >= 8
    },
    {
        label: "At least one uppercase letter",
        test: (value) => /[A-Z]/.test(value)
    },
    {
        label: "At least one lowercase letter",
        test: (value) => /[a-z]/.test(value)
    },
    {
        label: "At least one number",
        test: (value) => /\d/.test(value)
    },
    {
        label: "At least one special character",
        test: (value) => /[^A-Za-z0-9]/.test(value)
    }
]

export function evaluatePassword(password) {
    const trimmed = password || ""
    const results = passwordCriteria.map((criterion) => ({
        label: criterion.label,
        passed: criterion.test(trimmed)
    }))
    const passedCount = results.filter(result => result.passed).length
    return {
        results,
        score: passedCount,
        isValid: passedCount === passwordCriteria.length
    }
}

export function passwordStrengthPercent(score) {
    if (passwordCriteria.length === 0) {
        return 0
    }
    return Math.round((score / passwordCriteria.length) * 100)
}
