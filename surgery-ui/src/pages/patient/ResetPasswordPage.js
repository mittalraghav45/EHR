import {Alert, Button, Container, FormLabel, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import validator from "validator";
import dayjs from "dayjs";
import {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PageTitle} from "../../components/PageTitle";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {evaluatePassword, passwordCriteria, passwordStrengthPercent as getPasswordStrengthPercent} from "../../utils/passwordPolicy";

export default function ResetPasswordPage() {

    const { dispatch } = useContext(StateContext)
    const location = useLocation()
    const navigate = useNavigate()

    const prefillEmail = location.state?.email || ""
    const prefillToken = location.state?.token || ""

    const [ email, setEmail ] = useState(prefillEmail)
    const [ token, setToken ] = useState(prefillToken)
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ status, setStatus ] = useState({ type: "", message: "" })
    const [ submitting, setSubmitting ] = useState(false)

    const emailValid = email === "" || validator.isEmail(email)
    const tokenProvided = token.trim() !== ""
    const passwordEvaluation = evaluatePassword(password)
    const passwordPolicyMet = passwordEvaluation.isValid
    const passwordsMatch = password === confirmPassword
    const strengthPercent = getPasswordStrengthPercent(passwordEvaluation.score)

    const canSubmit = emailValid && email.trim() !== "" && tokenProvided && passwordPolicyMet && passwordsMatch && !submitting

    async function handleReset(event) {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        setSubmitting(true)
        setStatus({ type: "", message: "" })

        try {
            const normalisedEmail = email.trim().toLowerCase()
            const lookup = await fetch("/patient?email=" + encodeURIComponent(normalisedEmail))
            if (!lookup.ok) {
                throw new Error("Failed to retrieve patient for reset")
            }
            const matches = await lookup.json()
            if (!matches || matches.length === 0) {
                setStatus({ type: "error", message: "No account found for that email address." })
                setSubmitting(false)
                return
            }
            const patient = matches[0]

            if (!patient.resetToken || patient.resetToken !== token.trim()) {
                setStatus({ type: "error", message: "Reset token is invalid or has already been used." })
                setSubmitting(false)
                return
            }

            if (patient.resetTokenExpiry && dayjs().isAfter(dayjs(patient.resetTokenExpiry))) {
                setStatus({ type: "error", message: "Reset token has expired. Please request a new link." })
                setSubmitting(false)
                return
            }

            const hashed = encrypt(password)
            const patch = await fetch("/patient/" + patient.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: hashed,
                    resetToken: null,
                    resetTokenExpiry: null
                })
            })

            if (!patch.ok) {
                throw new Error("Failed to update password")
            }

            navigate("/patient/login", { state: { resetComplete: true } })
        } catch (error) {
            console.error("Failed to reset password", error)
            setStatus({ type: "error", message: "Unable to reset your password. Please try again." })
            dispatch({ type: "REST_ERROR" })
        } finally {
            setSubmitting(false)
        }
    }

    function handleBack() {
        navigate("/patient/login")
    }

    return (
        <Container>
            <PageTitle title="Reset Password" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                Enter the email address, reset token, and your new password. Tokens expire in 30 minutes for security.
            </Typography>
            <Stack direction="column" spacing={1}>
                <FormLabel>Email Address</FormLabel>
                <TextField
                    id="reset-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={!emailValid}
                    helperText={!emailValid ? "Please enter a valid email address." : ""}
                />
                <FormLabel>Reset Token</FormLabel>
                <TextField
                    id="reset-token"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    error={token !== "" && !tokenProvided}
                    helperText="Paste the token from the reset email."
                />
                <FormLabel>New Password</FormLabel>
                <TextField
                    id="reset-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={!passwordPolicyMet && password !== ""}
                    helperText={passwordPolicyMet || password === "" ? "Include uppercase, lowercase, numbers, and symbols." : "Password does not meet the required strength."}
                />
                <LinearProgress variant="determinate" value={strengthPercent} />
                <Typography variant="body2" color="textSecondary">
                    Password must include each of the following:
                </Typography>
                <Stack direction="column" spacing={0.5}>
                    { passwordEvaluation.results.map((result) => (
                        <Typography
                            key={result.label}
                            color={result.passed ? "success.main" : "textSecondary"}
                            variant="caption"
                        >
                            { result.passed ? "[x]" : "[ ]" } { result.label }
                        </Typography>
                    )) }
                </Stack>
                <FormLabel>Confirm New Password</FormLabel>
                <TextField
                    id="reset-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    error={!passwordsMatch && confirmPassword !== ""}
                    helperText={!passwordsMatch && confirmPassword !== "" ? "Passwords must match." : ""}
                />
                { status.message !== "" &&
                    <Alert severity={status.type}>{ status.message }</Alert>
                }
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" disabled={!canSubmit} onClick={handleReset}>
                        { submitting ? "Updating..." : "Reset Password" }
                    </Button>
                    <Button variant="outlined" onClick={handleBack}>Back to Login</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
