import {
    Button,
    Container,
    FormControlLabel,
    FormGroup,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../contexts/contexts";

export default function SelfRegistrationConsentPage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { register } = state
    console.log(register)

    const [ emailConsent, setEmailConsent ] = useState(register.consent.email)
    const [ smsConsent, setSmsConsent ] = useState(register.consent.sms)
    const [ nextOfKinConsent, setNextOfKinConsent ] = useState(register.consent.nextOfKin)

    function handleEmailConsent(event) {
        setEmailConsent(event.target.checked)
    }

    function handleSmsConsent(event) {
        setSmsConsent(event.target.checked)
    }

    function handleNextOfKinConsent(event) {
        setNextOfKinConsent(event.target.checked)
    }

    function handleBack(event) {
        dispatch({ type: "REGISTER_CONSENT", emailConsent, smsConsent, nextOfKinConsent })
        navigate("/register/contact")
    }

    function handleNext(event) {
        dispatch({ type: "REGISTER_CONSENT", emailConsent, smsConsent, nextOfKinConsent })
        navigate("/register/confirm")
    }

    return(
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Self Registration
            </Typography>
            <Typography spacing={2} color="textSecondary" variant="body1">
                Please select your consent options.
            </Typography>
            <Stack direction="column" spacing={1}>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch id="emailConsent" checked={emailConsent} onChange={handleEmailConsent}/>}
                        label="The surgery may use email to contact me in the future" />
                    <FormControlLabel
                        control={<Switch id="smsConsent" checked={smsConsent} onChange={handleSmsConsent}/>}
                        label="The surgery may use SMS to contact me in the future" />
                    <FormControlLabel
                        control={<Switch id="nextOfKinConsent" checked={nextOfKinConsent} onChange={handleNextOfKinConsent}/>}
                        label="The surgery may contact my next of kin if necessary" />
                </FormGroup>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="contained" onClick={handleNext}>Next</Button>
                </Stack>
            </Stack>
        </Container>
    )
}