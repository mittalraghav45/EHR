import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useNavigate} from "react-router-dom";
import {Registration} from "../../components/Registration";
import {Alert, Button, Container, Stack, Typography} from "@mui/material";
import {encrypt} from "../../utils/encrypt";
import {buildPatientPayload, buildRegistrationPayload} from "../../utils/registrationMapper";

export default function SelfRegistrationConfirmPage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { register } = state

    const [submitting, setSubmitting] = useState(false)
    const [submissionError, setSubmissionError] = useState("")

    useEffect(() => {
        document.title = "Cloud Surgery Self Registration"
    }, [])

    function handleBack(event) {
        navigate("/register/consent")
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (submitting) {
            return
        }
        setSubmitting(true)
        setSubmissionError("")

        try {
            const hashed = encrypt(register.password)
            const patientPayload = buildPatientPayload(register, hashed)
            const patientResponse = await fetch("/patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patientPayload)
            })

            if (!patientResponse.ok) {
                throw new Error("Failed to create patient")
            }

            const savedPatient = await patientResponse.json()

            const registrationPayload = buildRegistrationPayload(register, hashed, savedPatient.id)
            const registrationResponse = await fetch("/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registrationPayload)
            })

            if (!registrationResponse.ok) {
                throw new Error("Failed to save registration request")
            }

            dispatch({ type: "RESET_REGISTER" })
            navigate("/patient/login", { state: { registrationComplete: true } })
        } catch (error) {
            console.error("Patient self-registration failed", error)
            setSubmissionError("We couldn't complete your registration. Please try again.")
            dispatch({ type: "REST_ERROR" })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Self Registration
            </Typography>
            <Typography spacing={2} color="textSecondary" variant="body1">
                Please check the details that you have entered before submitting your registration.
            </Typography>
            <Typography color="textSecondary" variant="body2" paddingBottom={1}>
                Below is the information you provided. If anything looks wrong, use Back to edit before submitting.
            </Typography>
            <Stack direction="column" spacing={1}>
                <Registration registration={register} />
                { submissionError !== "" &&
                    <Alert severity="error">{ submissionError }</Alert>
                }
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="contained" disabled={submitting} onClick={handleSubmit}>
                        { submitting ? "Submitting..." : "Submit" }
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
