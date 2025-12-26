import { useNavigate } from "react-router-dom";

import {Button, Stack } from "@mui/material";
import {useContext} from "react";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";

export default function HomePage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    function handleLogin(event) {
        navigate("/patient/login")
    }

    function handleRegister(event) {
        navigate("/register/start")
    }

    return (
        <Stack direction="column" spacing={2}>
            <PageTitle title="Welcome to Cloud Surgery" />
            <Button fullWidth variant="contained" onClick={handleLogin}>Patient Login</Button>
            <Button fullWidth variant="outlined" onClick={handleRegister}>Register as a New Patient</Button>
            <Button fullWidth variant="text" onClick={() => navigate("/staff/login")}>
                Staff Login
            </Button>
        </Stack>
    )
}
