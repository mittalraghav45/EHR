import {Typography} from "@mui/material";
import {useEffect} from "react";

export function PageTitle({ title }) {

    const fullTitle = "Cloud Surgery " + title
    useEffect(() => { document.title = fullTitle }, [])

    return (
        <Typography color="textSecondary" variant="h4">{ fullTitle }</Typography>
    )
}