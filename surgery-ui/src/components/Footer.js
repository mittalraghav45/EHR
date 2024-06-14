import {useContext} from "react";
import {StateContext} from "../contexts/contexts";
import {Container, Typography} from "@mui/material";

export function Footer() {
    const { state } = useContext(StateContext)
    const { error } = state
    return (
        <Container>
            <Typography color="red" fontWeight="bold" variant="body1">{ error }</Typography>
        </Container>
    )
}