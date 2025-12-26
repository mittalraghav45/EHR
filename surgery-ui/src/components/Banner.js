import {Container, Typography} from "@mui/material";
import {StateContext} from "../contexts/contexts";
import {useContext} from "react";

export function Banner() {
    const { state } = useContext(StateContext)
    const { user } = state
    const showUser = user && user.role && user.role !== "none" && user.name
    return (
        <Container>
            { showUser &&
                <Typography color="textPrimary" variant="body1">{ user.name }</Typography>
            }
        </Container>
    )
}
