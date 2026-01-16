import { useNavigate, useLocation } from "react-router-dom";
import {Alert, Button, Container, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";
import {SESSION_DURATION_MS} from "../../constants/session";

export default function PatientLoginPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(StateContext)

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const trimmedUserName = userName.trim().toLowerCase()
    const mandatory = trimmedUserName !== '' && password.trim() !== ''

    const [ patient, getPatient ] = useResource(() => ({
        // Bust caches so json-server doesn't return 304 without a body
        url: "/login/" + encodeURIComponent(trimmedUserName) + "/" + encrypt(password),
        method: "get"
    }))

    const [ loginFeedback, setLoginFeedback ] = useState(location.state)

    useEffect(() => {
        if (location.state) {
            setLoginFeedback(location.state)
            navigate(location.pathname, { replace: true, state: null })
        }
    }, [location.pathname, location.state, navigate])

    useEffect(() => {
        setUserName("")
        setPassword("")
    }, [])

    useEffect(() => {
        if (patient && patient.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (patient && patient.data) {
            if (patient.data.length === 1) {
                const user = patient.data[0]
                const name = user.title + " " + user.firstName + " " + user.surname
                const email = user.email
                const postCode = user.address.postCode
                dispatch({ type: "LOGIN", id: user.id, name: name, role: "patient", email: email,
                    postCode: postCode, doctorId: user.staffId });
                dispatch({ type: "SESSION_REFRESH", expiresAt: Date.now() + SESSION_DURATION_MS })
                dispatch({ type: "FETCH_PATIENTS", patients: patient.data });
                navigate("/patient/menu")
            }
            else {
                dispatch({ type: "LOGIN_ERROR" })
            }
        }
    }, [patient])

    function handleUserName(event) {
        setUserName(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleCancel(event) {
        navigate("/");
    }

    function handleLogin(event) {
        getPatient()
    }

    function handleRegister(event) {
        navigate("/register/start");
    }

    function handleForgotPassword() {
        navigate("/patient/password/forgot")
    }

    const successMessage = loginFeedback?.registrationComplete
        ? "Registration complete! You can now sign in with your new password."
        : loginFeedback?.resetComplete
            ? "Password updated successfully. Please log in with the new password."
            : loginFeedback?.sessionExpired
                ? "Your session ended due to inactivity. Please sign in again."
                : ""
    const successSeverity = loginFeedback?.sessionExpired ? "warning" : "success"

    return (
        <Stack direction="column">
            <PageTitle title="Patient Login" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                This area is for patients to access their appointments, prescriptions, and test results. Sign in with the email and password you used to register, or create a new account if you have not registered yet.
            </Typography>
            { successMessage !== "" &&
                <Alert severity={successSeverity}>{ successMessage }</Alert>
            }
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={ handleUserName } autoComplete="off" />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} autoComplete="off" />
            <Stack direction="row">
                <Button disabled={ !mandatory } onClick={ handleLogin }>Log In</Button>
                <Button onClick={ handleRegister }>Register</Button>
                <Button variant="outlined" onClick={ handleCancel }>Cancel</Button>
                <Button variant="text" onClick={handleForgotPassword}>Forgot Password?</Button>
            </Stack>
        </Stack>
    )
}
