import {Table, TableBody, TableCell, TableContainer} from "@mui/material";
import {AlternatingTableRow} from "./AlternatingTableRow";
import {useContext} from "react";
import {StateContext} from "../contexts/contexts";
import {getFullName} from "../utils/builders";

export default function AppointmentRequest() {

    const { state } = useContext(StateContext)
    const { appointmentRequest, employees } = state

    const doctors = employees.filter(employee => employee.role === "Doctor")
    const registeredWith = doctors.find(doctor => doctor.id === appointmentRequest.doctorId)
    const registeredWithName = registeredWith ? getFullName(registeredWith) : "Not assigned"

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <AlternatingTableRow>
                        <TableCell>Patient Name:</TableCell>
                        <TableCell>{ appointmentRequest.patientName }</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Appointment Type:</TableCell>
                        <TableCell>{ appointmentRequest.appointmentType }</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Condition:</TableCell>
                        <TableCell>{ appointmentRequest.condition }</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Registered With:</TableCell>
                        <TableCell>{ registeredWithName }</TableCell>
                    </AlternatingTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
