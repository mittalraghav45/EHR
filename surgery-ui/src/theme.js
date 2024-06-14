import { createTheme } from "@mui/material";

export const theme = createTheme({
        palette: {
            primary: {
                main: '#2196F3',
            },
            secondary: {
                main: '#f50057',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    variant: "contained"
                }
            },
            MuiFormControlLabel: {
                defaultProps: {
                    sx: {
                        color: "text.secondary"
                    }
                }
            },
            MuiStack: {
                defaultProps: {
                    spacing: 1,
                    paddingTop: 1,
                    paddingRight: 1,
                    paddingBottom: 1
                }
            },
            MuiTextField: {
                defaultProps: {
                    hiddenLabel: true
                }
            },
            MuiTable: {
                defaultProps: {
                    sx: {
                        border: "solid darkgrey 2px"
                    }
                }
            },
            MuiTableCell: {
                defaultProps: {
                    sx: {
                        fontSize: "medium"
                    }
                }
            },
            MuiTableHead: {
                defaultProps: {
                    sx: {
                        color: "white",
                        backgroundColor: "darkgrey"
                    }
                }
            },
            MuiTableRow: {
                defaultProps: {
                    sx: {
                        verticalAlign: "middle"
                    }
                }
            }
        }
    }
)