import { useNavigate } from "react-router-dom";
import {Button, Stack } from "@mui/material";
import {PageTitle} from "../../components/PageTitle";

export default function CalendarPage () {

    const navigate = useNavigate()

    function handleDone(event) {
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Staff Calendar" />
            <Stack direction="row">
                <Button onClick={handleDone}>Done</Button>
            </Stack>
        </Stack>
    )
}