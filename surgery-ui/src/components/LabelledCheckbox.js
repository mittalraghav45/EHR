import {Checkbox, FormControlLabel} from "@mui/material";

export function LabelledCheckbox({ label, value, checked = false, onChange }) {
    function handleChange(event, nextChecked) {
        onChange(event, nextChecked)
    }

    function handleClick(event) {
        if (event.target === event.currentTarget) {
            onChange(event, event.currentTarget.checked)
        }
    }

    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            }
        />
    )
}
