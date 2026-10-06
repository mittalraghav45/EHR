import { useNavigate, useLocation } from "react-router-dom";
import {Alert, Button, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";
import {SESSION_DURATION_MS} from "../../constants/session";

export default function StaffLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(StateContext);
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ submitting, setSubmitting ] = useState(false);
    const [ loginError, setLoginError ] = useState("");
    const [ loginFeedback, setLoginFeedback ] = useState(location.state);

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
                "/api/employee?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(encrypt(password)),
                { cache: "no-store" }
            );
            if (!response.ok) {
                throw new Error("Unable to connect to the staff service");
            }

            const employees = await response.json();
            if (employees.length !== 1) {
                dispatch({ type: "LOGIN_ERROR" });
                return;
            }

            const user = employees[0];
            const name = user.title + " " + user.firstName + " " + user.surname;
            dispatch({
                type: "LOGIN",
                id: user.id,
                name,
                role: user.role,
                email: user.email,
                postCode: "",
                doctorId: -1
            });
            dispatch({ type: "SESSION_REFRESH", expiresAt: Date.now() + SESSION_DURATION_MS });
            navigate("/staff/menu");
        } catch (error) {
            console.error("Staff login failed", error);
            dispatch({ type: "REST_ERROR" });
            setLoginError("Unable to sign in right now. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleUserName(event) { setUserName(event.target.value); }
    function handlePassword(event) { setPassword(event.target.value); }
    function handleCancel(event) { navigate("/"); }

    const alertMessage = loginFeedback?.sessionExpired
        ? "Your session expired due to inactivity. Please log in again."
        : "";

    return (
        <Stack direction="column">
            <PageTitle title="Staff Login" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                This secure login is for surgery staff only. Use your staff email address and password to access the staff dashboard. Patients should log in via the patient portal instead.
            </Typography>
            {alertMessage !== "" && <Alert severity="warning">{alertMessage}</Alert>}
            {loginError !== "" && <Alert severity="error">{loginError}</Alert>}
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={handleUserName} autoComplete="off" />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} autoComplete="off" />
            <Stack direction="row">
                <Button disabled={!mandatory || submitting} onClick={handleLogin}>{submitting ? "Signing in..." : "Log In"}</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Stack>
    );
}
