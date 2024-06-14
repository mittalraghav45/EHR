import { useNavigate } from "react-router-dom";
import { Button, Stack, Table, TableBody, TableCell, TableContainer } from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useEffect } from "react";
import {StateContext} from "../../contexts/contexts";
import {displayDate} from "../../utils/workingDays";
import {useResource} from "react-request-hook";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";

export default function AppointmentDetailsPage () {

    const { state, dispatch } = useContext(StateContext)
    const { appointment } = state

    const navigate = useNavigate()

    const [ patient, getPatient ] = useResource(() => ({
        url: "/patient/" + appointment.patientId,
        method: "get"
    }))

    const [, deleteAppointment ] = useResource(() => ({
        url: "/appointment/" + appointment.id,
        method: "delete"
    }))

    useEffect(() => {
        if (patient && patient.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (patient && patient.data) {
            dispatch({ type: "VIEW_PATIENT", patient: patient.data })
            navigate("/staff/patient")
        }
    }, [patient])

    function handleDelete(event) {
        deleteAppointment()
        navigate("/staff/appointments")
    }

    function handlePatient(event) {
        getPatient()
    }

    function handleBack(event) {
        navigate("/staff/appointments")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Appointment Details" />
            <TableContainer>
                <Table>
                    <TableBody>
                        <AlternatingTableRow>
                            <TableCell>Date and Time</TableCell>
                            <TableCell>{ displayDate(appointment.date) } {appointment.time}</TableCell>
                        </AlternatingTableRow>
                        <AlternatingTableRow>
                            <TableCell>Patient Name:</TableCell>
                            <TableCell>{ appointment.patientName }</TableCell>
                        </AlternatingTableRow>
                        <AlternatingTableRow>
                            <TableCell>Appointment Type:</TableCell>
                            <TableCell>{ appointment.appointmentType }</TableCell>
                        </AlternatingTableRow>
                        <AlternatingTableRow>
                            <TableCell>Condition:</TableCell>
                            <TableCell>{ appointment.condition }</TableCell>
                        </AlternatingTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row">
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handlePatient}>Patient Details</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>
        </Stack>
    )
}