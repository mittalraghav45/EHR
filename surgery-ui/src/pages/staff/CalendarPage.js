import { useNavigate } from "react-router-dom";
import {Button, Stack } from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext} from "react";
import {StateContext} from "../../contexts/contexts";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function CalendarPage () {
    const {state} = useContext(StateContext)
    const navigate = useNavigate()

    function handleDone(event) {
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Staff Calendar" />
            <StaffOnly />
            {isLoggedIn(state) && (
                <Stack direction="row">
                    <Button onClick={handleDone}>Done</Button>
                </Stack>
            )}
        </Stack>
    )
}
