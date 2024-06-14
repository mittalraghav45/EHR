import {Checkbox, FormControlLabel} from "@mui/material";

export function LabelledCheckbox({ label, value, onChange }) {
    return (
        <FormControlLabel label={label} control={<Checkbox value={value} onChange={onChange}/>}/>
    )
}