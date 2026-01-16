import { useNavigate, useLocation } from "react-router-dom";
import {Alert, Button, Container, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";
import {SESSION_DURATION_MS} from "../../constants/session";

export default function StaffLoginPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(StateContext)

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginFeedback, setLoginFeedback ] = useState(location.state)

    const trimmedUserName = userName.trim().toLowerCase()
    const mandatory = trimmedUserName !== '' && password !== ''

    const [ employee, getEmployee ] = useResource(() => ({
        // Bust caches so json-server doesn't return 304 without a body
        url: "/staff/" + trimmedUserName + "/" + encrypt(password),
        method: "get"
    }))

    useEffect(() => {
        if (employee && employee.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (employee && employee.data) {
            if (employee.data.length === 1) {
                const user = employee.data[0]
                const name = user.title + " " + user.firstName + " " + user.surname
                dispatch({ type: "LOGIN", id: user.id, name: name, role: user.role, email: user.email,
                    postCode: "", doctorId: -1 })
                dispatch({ type: "SESSION_REFRESH", expiresAt: Date.now() + SESSION_DURATION_MS })
                navigate("/staff/menu")
            }
            else {
                dispatch({ type: "LOGIN_ERROR" })
            }

        }
    }, [employee])

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
        getEmployee()
    }

    const alertMessage = loginFeedback?.sessionExpired
        ? "Your session expired due to inactivity. Please log in again."
        : ""

    return (
        <Stack direction="column">
            <PageTitle title="Staff Login" />
            <Typography color="textSecondary" variant="body1" paddingBottom={1}>
                This secure login is for surgery staff only. Use your staff email address and password to access the staff dashboard. Patients should log in via the patient portal instead.
            </Typography>
            { alertMessage !== "" &&
                <Alert severity="warning">{ alertMessage }</Alert>
            }
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={ handleUserName } autoComplete="off" />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} autoComplete="off" />
            <Stack direction="row">
                <Button disabled={ !mandatory } onClick={ handleLogin }>Log In</Button>
                <Button variant="outlined" onClick={ handleCancel }>Cancel</Button>
            </Stack>
        </Stack>
    )
}

