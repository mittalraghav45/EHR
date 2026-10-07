import {Checkbox, FormControlLabel} from "@mui/material";

export function LabelledCheckbox({ label, value, checked = false, onChange }) {
    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    value={value}
                    checked={checked}
                    onChange={(event) => onChange(event, event.target.checked)}
                    inputProps={{ "aria-label": label }}
                />
            }
        />
    )
}
