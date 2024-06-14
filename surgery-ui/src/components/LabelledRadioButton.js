import { FormControlLabel, Radio } from "@mui/material";

export function LabelledRadioButton({ label, value }) {
    return (
        <FormControlLabel label={label} value={value} control={<Radio />}/>
    )
}