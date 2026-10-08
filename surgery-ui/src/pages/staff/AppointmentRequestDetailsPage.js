import { useNavigate } from "react-router-dom";
import {Alert, Button, FormControl, FormLabel, MenuItem, RadioGroup, Select, Stack} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import AppointmentRequest from "../../components/AppointmentRequest";
import {LabelledRadioButton} from "../../components/LabelledRadioButton";
import {getFullName} from "../../utils/builders";
import {appointmentTimes, displayDate} from "../../utils/workingDays";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";
import {useResource} from "react-request-hook";

export default function AppointmentRequestDetailsPage () {
    const { state, dispatch } = useContext(StateContext)
    const { appointmentRequest = {}, employees = [] } = state
    const doctors = employees.filter(employee => employee.role === "Doctor")
    const hasRequest = Array.isArray(appointmentRequest.availableDates) && appointmentRequest.availableDates.length > 0
    const staffLoggedIn = isLoggedIn(state)

    const [ doctor, setDoctor ] = useState(0)
    const [ appointmentSlots ] = useState(appointmentTimes)
    const [ appointmentDate, setAppointmentDate ] = useState(0)
    const [ appointmentTime, setAppointmentTime ] = useState(0)
    const [ saving, setSaving ] = useState(false)
    const [ saveError, setSaveError ] = useState("")

    const navigate = useNavigate()

    const [ employeeResponse, getEmployees ] = useResource(() => ({
        url: "/employee",
        method: "get"
    }))

    useEffect(() => {
        if (staffLoggedIn && !employees.length) {
            getEmployees()
        }
    }, [staffLoggedIn, employees.length, getEmployees])

    useEffect(() => {
        if (employeeResponse && employeeResponse.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (employeeResponse && employeeResponse.data) {
            dispatch({ type: "FETCH_EMPLOYEES", employees: employeeResponse.data })
        }
    }, [employeeResponse, dispatch])

    function handleBack() {
        navigate("/staff/appointmentRequests")
    }

    async function handleSave() {
        if (saving || !hasRequest || !doctors.length) return
        const selectedDoctor = doctors[Number(doctor)]
        const selectedDate = appointmentRequest.availableDates[Number(appointmentDate)]
        const selectedTime = appointmentSlots[Number(appointmentTime)]
        if (!selectedDoctor || !selectedDate || !selectedTime) return

        setSaving(true)
        setSaveError("")
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
            const appointmentResponse = await fetch("/api/appointment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            if (!appointmentResponse.ok) throw new Error("Failed to create appointment")

            const deleteResponse = await fetch("/api/appointmentRequest/" + appointmentRequest.id, {method: "DELETE"})
            if (!deleteResponse.ok) throw new Error("Appointment created, but the request could not be removed.")

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
            <StaffOnly />
            {staffLoggedIn && (
                <>
                    <AppointmentRequest />
                    {!hasRequest && (
                        <Alert severity="info">No appointment request is selected. Return to the appointment requests list and choose a request.</Alert>
                    )}
                    {hasRequest && (
                        <>
                            <FormLabel>Doctor</FormLabel>
                            <Select id="doctor" value={doctor} onChange={(event) => setDoctor(event.target.value)}>
                                {doctors.map((employee, index) => (
                                    <MenuItem key={employee.id} value={index}>{getFullName(employee)}</MenuItem>
                                ))}
                            </Select>
                            <FormControl>
                                <FormLabel>Available Dates</FormLabel>
                                <RadioGroup name="available-dates" row defaultValue="0" onChange={(event) => setAppointmentDate(event.target.value)}>
                                    {appointmentRequest.availableDates.map((date, index) => (
                                        <LabelledRadioButton key={date + "-" + index} value={index} label={displayDate(date)} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Available Times</FormLabel>
                                <RadioGroup name="available-times" row defaultValue="0" onChange={(event) => setAppointmentTime(event.target.value)}>
                                    {appointmentSlots.map((time, index) => (
                                        <LabelledRadioButton key={time + "-" + index} value={index} label={time} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {saveError && <Alert severity="error">{saveError}</Alert>}
                            <Stack direction="row">
                                <Button disabled={saving || !doctors.length} onClick={handleSave}>{saving ? "Saving..." : "Save"}</Button>
                                <Button variant="outlined" onClick={handleBack}>Back</Button>
                            </Stack>
                        </>
                    )}
                </>
            )}
        </Stack>
    )
}
