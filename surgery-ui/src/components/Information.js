import {Typography} from "@mui/material";

export function Information({ text }) {
    return (
        <Typography spacing={2} color="textSecondary" variant="body1">{ text }</Typography>
    )
}