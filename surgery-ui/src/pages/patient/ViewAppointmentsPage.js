import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Fragment, useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";
import {displayDate} from "../../utils/workingDays";
import PatientOnly, {isLoggedIn} from "../../components/PatientOnly";

export default function ViewAppointmentsPage () {

    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const navigate = useNavigate()

    const [ appointments, getAppointments ] = useResource(() => ({
        url: "/appointment/?patientId=" + user.id + "&_sort=date,time",
        method: "get"
    }))

    useEffect(getAppointments, [])

    useEffect(() => {
        if (appointments && appointments.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (appointments && appointments.data) {
            dispatch({ type: "FETCH_APPOINTMENTS", appointments: appointments.data })
        }
    }, [appointments])

    function handleBack(event) {
        navigate("/patient/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Appointments" />
            <PatientOnly />
            { isLoggedIn(state) &&
                <Fragment>
                    <AppointmentList />
                    <Stack direction="row">
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}

function AppointmentList() {
    const { state } = useContext(StateContext)
    const { appointments } = state
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Doctor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { appointments.map((appointment, index) => (
                        <AppointmentSummary key={'appointment-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function AppointmentSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { appointments } = state
    const appointment = appointments[index]


    return (
        <AlternatingTableRow>
            <TableCell>{ displayDate(appointment.date) }</TableCell>
            <TableCell>{ appointment.time }</TableCell>
            <TableCell>{ appointment.staffName }</TableCell>
        </AlternatingTableRow>
    )
}