import { useNavigate } from "react-router-dom";
import {Button, FormLabel, Grid, MenuItem, Select, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {getWorkingDays} from "../../utils/workingDays";
import PatientOnly, {isLoggedIn} from "../../components/PatientOnly";
import {Fragment, useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {appointmentTypes} from "../../utils/dropdownLists";
import {LabelledCheckbox} from "../../components/LabelledCheckbox";
import {Information} from "../../components/Information";
import {useResource} from "react-request-hook";

export default function AppointmentRequestPage () {

    const navigate = useNavigate()

    const { state } = useContext(StateContext)
    const { user } = state

    const [ appointmentType, setAppointmentType ] = useState('')
    const [ condition, setCondition ] = useState('')
    const [ dates] = useState(getWorkingDays)
    const [ numDays, setNumDays ] = useState(0)

    const [ , createAppointmentRequest ] = useResource((data) => ({
        url: '/appointmentRequest',
        method: 'post',
        data: data
    }))

    const mandatory = appointmentType !== "" && condition !== "" && numDays > 0

    function handleAppointmentType(event) {
        setAppointmentType(event.target.value)
    }

    function handleCondition(event) {
        setCondition(event.target.value)
    }

    function handleCheckbox(event) {
        const day = dates[event.target.value]
        day.selected = event.target.checked
        const count = dates.filter(day => day.selected).length
        setNumDays(count)
    }

    function handleCancel(event) {
        navigate("/patient/menu")
    }

    function handleRequest(event) {
        const selectedDays = dates.filter(day => day.selected)
        const availableDates = selectedDays.map(day => day.persisted)
        const data = {
            patientId: user.id,
            patientName: user.name,
            patientEmail: user.email,
            patientPostCode: user.postCode,
            doctorId: user.doctorId,
            condition: condition,
            appointmentType: appointmentType,
            availableDates: availableDates
        }
        createAppointmentRequest(data)
        navigate("/patient/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Request an Appointment" />
            <PatientOnly />
            { isLoggedIn(state) &&
                <Fragment>
                    <FormLabel>Appointment Type</FormLabel>
                    <Select id="appointmentType" value={ appointmentType } onChange={ handleAppointmentType }>
                        { appointmentTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                    <FormLabel>Please describe your symptoms or condition</FormLabel>
                    <TextField id="comments" value={ condition } onChange={ handleCondition } multiline rows={4} />
                    <Information text="Please select the dates when you are available:" />
                    <Grid container spacing={1}>
                        { dates.map((day, index) => (
                            <Grid xs={3}>
                                <LabelledCheckbox label={ day.display } value={ index } onChange={ handleCheckbox } />
                            </Grid>
                        ))}
                    </Grid>
                    <Stack direction="row">
                        <Button disabled={ !mandatory } onClick={handleRequest}>Submit</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}