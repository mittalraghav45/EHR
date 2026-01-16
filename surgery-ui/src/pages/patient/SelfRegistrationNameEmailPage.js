import {Button, Container, FormLabel, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {StateContext} from "../../contexts/contexts";
import {passwordCriteria, evaluatePassword, passwordStrengthPercent as getPasswordStrengthPercent} from "../../utils/passwordPolicy";

export default function SelfRegistrationNameEmailPage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { register } = state

    const [ firstName, setFirstName ] = useState(register.firstName)
    const [ surname, setSurname ] = useState(register.surname)
    const [ email, setEmail ] = useState(register.email)
    const [ confirmEmail, setConfirmEmail ] = useState(register.email)
    const [ password, setPassword ] = useState(register.password)
    const [ confirmPassword, setConfirmPassword ] = useState(register.password)

    const emailValid = email === "" || validator.isEmail(email)
    const emailError = emailValid ? "" : "Email address is not the correct format"

    const emailsMatch = (email === confirmEmail)
    const emailMatchError = emailsMatch ? "" : "Email addresses do not match"

    const passwordsMatch = (password === confirmPassword)
    const passwordError = passwordsMatch ? "" : "Passwords do not match"

    const passwordEvaluation = evaluatePassword(password)
    const passwordPolicyMet = passwordEvaluation.isValid
    const passwordPolicyHelper = password === "" || passwordPolicyMet
        ? "Use a strong password to protect your account."
        : "Password must include: " + passwordEvaluation.results.filter(result => !result.passed).map(result => result.label).join(", ")
    const strengthPercent = getPasswordStrengthPercent(passwordEvaluation.score)

    const mandatory = firstName !== "" && surname !== "" && email !== "" && password !== ""
        && emailValid && emailsMatch && passwordsMatch && passwordPolicyMet
    const showRequiredNotice = !mandatory

    useEffect(() => {
        document.title = "Cloud Surgery Self Registration"
    }, [])

    function handleFirstName(event) {
        setFirstName(event.target.value)
    }

    function handleSurname(event) {
        setSurname(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)
    }

    function handleConfirmEmail(event) {
        setConfirmEmail(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

    function handleCancel(event) {
        navigate("/")
    }
    function handleNext(event) {
        dispatch({ type: "REGISTER_NAME_EMAIL", firstName, surname, email, password })
        navigate("/register/personal")
    }

    return(
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Self Registration
            </Typography>
            <Typography spacing={2} color="textSecondary" variant="body1">
                Please enter your name, email address and a password to continue.
            </Typography>
            { showRequiredNotice &&
                <Typography color="error" variant="body2">
                    All fields are required. Please enter a valid email and matching passwords to continue.
                </Typography>
            }
            <Stack direction="column" spacing={1}>
                <FormLabel>First Name </FormLabel>
                <TextField id="firstName" value={firstName} onChange={handleFirstName} />
                <FormLabel>Family / Surname</FormLabel>
                <TextField id="surname" value={surname} onChange={handleSurname} />
                <FormLabel>Email Address </FormLabel>
                <TextField id="email" value={email} onChange={handleEmail}
                           error={!emailValid} helperText={emailError} />
                <FormLabel>Confirm Email Address</FormLabel>
                <TextField id="confirmEmail" value={confirmEmail} onChange={handleConfirmEmail}
                           error={!emailsMatch} helperText={emailMatchError} />
                <FormLabel>New Password </FormLabel>
                <TextField
                    id="password"
                    value={password}
                    type="password"
                    onChange={handlePassword}
                    error={!passwordPolicyMet && password !== ""}
                    helperText={passwordPolicyHelper}
                />
                <LinearProgress
                    variant="determinate"
                    value={strengthPercent}
                />
                <Typography variant="body2" color="textSecondary">
                    Password must contain all of the following:
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
                    ))}
                </Stack>
                <FormLabel>Confirm New Password</FormLabel>
                <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={handleConfirmPassword}
                           error={!passwordsMatch} helperText={passwordError} />
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleNext} disabled={!mandatory}>Next</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
