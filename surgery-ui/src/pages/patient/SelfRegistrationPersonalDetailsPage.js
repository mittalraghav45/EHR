import {Button, Container, FormLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../contexts/contexts";
import {genders, titles} from "../../utils/dropdownLists";

export default function SelfRegistrationPersonalDetailsPage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { register } = state
    const safeRegister = register || {}

    const [ title, setTitle ] = useState(safeRegister.title)
    const [ dateOfBirth, setDateOfBirth ] = useState(safeRegister.dateOfBirth || null)
    const [ gender, setGender ] = useState(safeRegister.gender)
    const firstName = safeRegister.firstName || ""
    const surname = safeRegister.surname || ""
    const email = safeRegister.email || ""

    const mandatory = title !== "" && gender !== ""
    const requiredNotice = !mandatory

    useEffect(() => {
        document.title = "Cloud Surgery Self Registration"
    }, [])

    function handleTitle(event) {
        setTitle(event.target.value)
    }

    function handleDateOfBirth(value) {
        setDateOfBirth(value)
    }

    function handleGender(event) {
        setGender(event.target.value)
    }

    function handleBack(event) {
        dispatch({ type: "REGISTER_PERSONAL", title, dateOfBirth, gender })
        navigate("/register/start")
    }

    function handleNext(event) {
        dispatch({ type: "REGISTER_PERSONAL", title, dateOfBirth, gender })
        navigate("/register/contact")
    }

    return(
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Self Registration
            </Typography>
            <Typography spacing={2} color="textSecondary" variant="body1">
                Please select your title, data of birth and gender.
            </Typography>
            { requiredNotice &&
                <Typography color="error" variant="body2">
                    Please choose a title and gender to continue.
                </Typography>
            }
            <Stack direction="column" spacing={1}>
                <FormLabel>Title</FormLabel>
                <Select id="title" value={title} onChange={handleTitle}>
                    { titles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
                <FormLabel>First Name </FormLabel>
                <TextField id="firstName" value={firstName} InputProps={{ readOnly: true }} />
                <FormLabel>Family / Surname</FormLabel>
                <TextField id="surname" value={surname} InputProps={{ readOnly: true }} />
                <FormLabel>Email Address </FormLabel>
                <TextField id="email" value={email} InputProps={{ readOnly: true }} />
                <FormLabel>Date Of Birth</FormLabel>
                <DatePicker id={"dateOfBirth"} value={dateOfBirth} onChange={handleDateOfBirth} />
                <FormLabel>Gender</FormLabel>
                <Select id="gender" value={gender} onChange={handleGender}>
                    { genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="contained" disabled={!mandatory} onClick={handleNext}>Next</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
