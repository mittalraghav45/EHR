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
        <Stack direction="column">
            <PageTitle title="Services" />
            <Button fullWidth onClick={handleLogin}>Login</Button>
            <Button fullWidth onClick={handleRegister}>Register</Button>
        </Stack>
    )
}