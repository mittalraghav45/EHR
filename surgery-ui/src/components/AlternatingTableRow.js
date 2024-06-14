import {styled, TableRow} from "@mui/material";

/*
 A table row with alternating colours, as per https://mui.com/material-ui/react-table/.
 */
export const AlternatingTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
