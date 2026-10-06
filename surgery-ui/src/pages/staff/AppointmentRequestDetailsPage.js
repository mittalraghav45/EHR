import { useNavigate } from "react-router-dom";
import {Alert, Button, FormControl, FormLabel, MenuItem, RadioGroup, Select, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import AppointmentRequest from "../../components/AppointmentRequest";
import {LabelledRadioButton} from "../../components/LabelledRadioButton";
import {getFullName} from "../../utils/builders";
import {appointmentTimes, displayDate} from "../../utils/workingDays";
import {useResource} from "react-request-hook";

export default function AppointmentRequestDetailsPage () {

    const { state } = useContext(StateContext)
    const { appointmentRequest, employees = [] } = state

    const [ , createAppointment ] = useResource((data) => ({
        url: '/appointment',
        method: 'post',
        data: data
    }))

    const [ , deleteAppointmentRequest ] = useResource(() => ({
        url: "appointmentRequest/" + appointmentRequest.id,
        method: "delete"
    }))

    const doctors = employees.filter(employee => employee.role === "Doctor")

    const [ doctor, setDoctor ] = useState(0)
    const [ appointmentSlots, setAppointmentSlots ] = useState(appointmentTimes)
    const [ appointmentDate, setAppointmentDate ] = useState(0)
    const [ appointmentTime, setAppointmentTime ] = useState(0)
    const [ saving, setSaving ] = useState(false)
    const [ saveError, setSaveError ] = useState("")

    console.log("Doctors", doctors)
    console.log("Request", appointmentRequest)

    const navigate = useNavigate()

    function handleDoctor(event) {
        setDoctor(event.target.value)
    }

    function handleDate(event) {
        setAppointmentDate(event.target.value)
    }

    function handleTime(event) {
        setAppointmentTime(event.target.value)
    }

    function handleBack(event) {
        navigate("/staff/appointmentRequests")
    }

    async function handleSave(event) {
        if (saving || !appointmentRequest || !doctors.length) return
        setSaving(true)
        setSaveError("")
        const selectedDate = appointmentRequest.availableDates[appointmentDate]
        const selectedTime = appointmentSlots[appointmentTime]
        const selectedDoctor = doctors[doctor]
        const data = {
            patientId: appointmentRequest.patientId,
            patientName: appointmentRequest.patientName,
            patientEmail: appointmentRequest.patientEmail,
            patientPostCode: appointmentRequest.patientPostCode,
            staffId: selectedDoctor.id,
            staffName: getFullName(selectedDoctor),
            condition: appointmentRequest.condition,
            appointmentType: appointmentRequest.appointmentType,
            date: selectedDate,
            time: selectedTime
        }
        try {
            const appointmentResponse = await fetch("/api/appointment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
            if (!appointmentResponse.ok) throw new Error("Failed to create appointment")
            const deleteResponse = await fetch("/api/appointmentRequest/" + appointmentRequest.id, { method: "DELETE" })
            if (!deleteResponse.ok) throw new Error("Appointment created, but the request could not be be removed.")
            navigate("/staff/appointmentRequests")
        } catch (error) {
            console.error("Failed to save appointment request", error)
            setSaveError(error.message || "Unable to save the appointment.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Stack direction="column">
            <PageTitle title="Appointment Request" />
            <AppointmentRequest />
            <FormLabel>Doctor</FormLabel>
            <Select id="doctor" value={doctor} onChange={handleDoctor}>
                { doctors.map((doctor, index) => (
                    <MenuItem key={ doctor.id } value={ index }>{ getFullName(doctor) }</MenuItem>
                ))}
            </Select>
            <FormControl>
                <FormLabel>Available Dates</FormLabel>
                <RadioGroup name="available-dates" row defaultValue="0" onChange={ handleDate }>
                    { appointmentRequest.availableDates.map((date, index) =>
                        <LabelledRadioButton value={ index } label={ displayDate(date) } />
                    )}
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Available Times</FormLabel>
                <RadioGroup name="available-times" row defaultValue="0" onChange={ handleTime }>
                    { appointmentSlots.map((time, index) =>
                        <LabelledRadioButton value={ index } label={ time } />
                    )}
                </RadioGroup>
            </FormControl>
            <Stack direction="row">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>
        </Stack>
    )
}