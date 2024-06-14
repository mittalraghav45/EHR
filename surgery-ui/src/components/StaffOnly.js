import {Fragment, useContext} from "react";
import {Information} from "./Information";
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../contexts/contexts";

export function isLoggedIn(state) {
    const { user } = state
    return user.role !== "none" && user.role !== "patient"
}

export default function StaffOnly() {

    const { state } = useContext(StateContext)
    const navigate = useNavigate()

    function handleCancel(event) {
        navigate("/")
    }

    function handleLogin(event) {
        navigate("/staff/login")
    }

    return (
        <Stack direction="column">
            { !isLoggedIn(state) &&
                <Fragment>
                    <Information text="You must be logged in to access this feature."/>
                    <Stack direction="row">
                        <Button onClick={handleLogin}>Login</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}