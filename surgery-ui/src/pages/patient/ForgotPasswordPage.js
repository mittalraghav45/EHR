import {Alert, Button, Container, FormLabel, Stack, TextField, Typography} from "@mui/material";
import validator from "validator";
import dayjs from "dayjs";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useNavigate} from "react-router-dom";

function generateResetToken() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export default function ForgotPasswordPage() {

    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ status, setStatus ] = useState({ type: "", message: "" })
    const [ tokenDetails, setTokenDetails ] = useState(null)
    const [ submitting, setSubmitting ] = useState(false)

    const emailValid = email === "" || validator.isEmail(email)
    const canSubmit = emailValid && email.trim() !== "" && !submitting

    async function handleSend(event) {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        setSubmitting(true)
        setStatus({ type: "", message: "" })
        setTokenDetails(null)

        try {
            const normalisedEmail = email.trim().toLowerCase()
            const lookup = await fetch("/patient?email=" + encodeURIComponent(normalisedEmail))
            if (!lookup.ok) {
                throw new Error("Failed to query patients")
            }
            const matches = await lookup.json()
            if (!matches || matches.length === 0) {
                setStatus({ type: "error", message: "We could not find an account with that email address." })
                setSubmitting(false)
                return
            }

            const patient = matches[0]
            const token = generateResetToken()
            const expires = dayjs().add(30, "minute").toISOString()

            const patch = await fetch("/patient/" + patient.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resetToken: token,
                    resetTokenExpiry: expires
                })
            })

            if (!patch.ok) {
                throw new Error("Failed to persist reset token")
            }

            setTokenDetails({ token, email: normalisedEmail })
            setStatus({
                type: "success",
                message: "If the email you entered is registered, you will receive a password reset link shortly."
            })
        } catch (error) {
            console.error("Failed to start password reset", error)
            setStatus({ type: "error", message: "Unable to start the reset process. Please try again." })
            dispatch({ type: "REST_ERROR" })
        } finally {
            setSubmitting(false)
        }
    }

    function handleBack() {
        navigate("/patient/login")
    }

    function handleOpenReset() {
        if (tokenDetails) {
            navigate("/patient/password/reset", { state: tokenDetails })
        }
    }

    return (
        <Container>
            <PageTitle title="Forgot Password" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                Enter the email address you used to create your account. We will send a reset link if the email matches an active account.
            </Typography>
            <Stack direction="column" spacing={1}>
                <FormLabel>Email Address</FormLabel>
                <TextField
                    id="forgot-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={!emailValid}
                    helperText={!emailValid ? "Please enter a valid email address." : ""}
                />
                { status.message !== "" &&
                    <Alert severity={status.type}>{ status.message }</Alert>
                }
                { tokenDetails &&
                    <Alert severity="info">
                        Development note: use reset token <strong>{ tokenDetails.token }</strong> to complete the workflow.
                    </Alert>
                }
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" disabled={!canSubmit} onClick={handleSend}>
                        { submitting ? "Sending..." : "Send Reset Link" }
                    </Button>
                    <Button variant="outlined" onClick={handleBack}>Back to Login</Button>
                </Stack>
                { tokenDetails &&
                    <Button variant="text" onClick={handleOpenReset}>
                        Open Reset Form
                    </Button>
                }
            </Stack>
        </Container>
    )
}
