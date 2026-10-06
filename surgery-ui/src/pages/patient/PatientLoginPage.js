import { useNavigate, useLocation } from "react-router-dom";
import {Alert, Button, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";
import {SESSION_DURATION_MS} from "../../constants/session";

export default function PatientLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(StateContext);
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ submitting, setSubmitting ] = useState(false);
    const [ loginError, setLoginError ] = useState("");

    const [ loginFeedback, setLoginFeedback ] = useState(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("sessionExpired") === "true") return { sessionExpired: true };
        return location.state;
    });

    useEffect(() => {
        if (location.state) {
            setLoginFeedback(location.state);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.pathname, location.state, navigate]);

    const mandatory = userName.trim() !== "" && password.trim() !== "";

    async function handleLogin(event) {
        event.preventDefault();
        if (!mandatory || submitting) return;

        setSubmitting(true);
        setLoginError("");

        try {
            const email = userName.trim().toLowerCase();
            const response = await fetch(
                "/api/patient?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(encrypt(password)),
                { cache: "no-store" }
            );
            if (!response.ok) {
                throw new Error("Unable to connect to the patient service");
            }

            const patients = await response.json();
            if (patients.length !== 1) {
                dispatch({ type: "LOGIN_ERROR" });
                return;
            }

            const user = patients[0];
            const name = user.title + " " + user.firstName + " " + user.surname;
            dispatch({
                type: "LOGIN",
                id: user.id,
                name,
                role: "patient",
                email: user.email,
                postCode: user.address?.postCode || "",
                doctorId: user.staffId
            });
            dispatch({ type: "SESSION_REFRESH", expiresAt: Date.now() + SESSION_DURATION_MS });
            dispatch({ type: "FETCH_PATIENTS", patients });
            navigate("/patient/menu");
        } catch (error) {
            console.error("Patient login failed", error);
            dispatch({ type: "REST_ERROR" });
            setLoginError("Unable to sign in right now. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleUserName(event) { setUserName(event.target.value); }
    function handlePassword(event) { setPassword(event.target.value); }
    function handleCancel(event) { navigate("/"); }
    function handleRegister(event) { navigate("/register/start"); }
    function handleForgotPassword() { navigate("/patient/password/forgot"); }

    const successMessage = loginFeedback?.registrationComplete
        ? "Registration complete! You can now sign in with your new password."
        : loginFeedback?.resetComplete
            ? "Password updated successfully. Please log in with the new password."
            : loginFeedback?.sessionExpired
                ? "Your session ended due to inactivity. Please sign in again."
                : "";
    const successSeverity = loginFeedback?.sessionExpired ? "warning" : "success";

    return (
        <Stack direction="column">
            <PageTitle title="Patient Login" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                This area is for patients to access their appointments, prescriptions, and test results. Sign in with the email and password you used to register, or create a new account if you have not registered yet.
            </Typography>
            {successMessage !== "" && <Alert severity={successSeverity}>{successMessage}</Alert>}
            {loginError !== "" && <Alert severity="error">{loginError}</Alert>}
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={handleUserName} autoComplete="off" />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} autoComplete="off" />
            <Stack direction="row">
                <Button disabled={!mandatory || submitting} onClick={handleLogin}>{submitting ? "Signing in..." : "Log In"}</Button>
                <Button onClick={handleRegister}>Register</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                <Button variant="text" onClick={handleForgotPassword}>Forgot Password?</Button>
            </Stack>
        </Stack>
    );
}
