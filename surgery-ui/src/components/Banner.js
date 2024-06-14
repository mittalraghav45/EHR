import {Container, Typography} from "@mui/material";
import {StateContext} from "../contexts/contexts";
import {useContext} from "react";

export function Banner() {
    const { state } = useContext(StateContext)
    const { user } = state
    return (
        <Container>
            <Typography color="textPrimary" variant="body1">{ user.name }</Typography>
        </Container>
    )
}