import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Fragment, useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";
import {displayDate} from "../../utils/workingDays";
import StaffOnly, { isLoggedIn } from "../../components/StaffOnly";

export default function TodaysAppointmentsPage () {

    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const navigate = useNavigate()

    const [ appointments, getAppointments ] = useResource(() => ({
        url: "/appointment?staffId=" + user.id + "&_sort=date,time",
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
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Appointments" />
            <StaffOnly />
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
                        <TableCell>Patient</TableCell>
                        <TableCell></TableCell>
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

    function handleView(event) {
        dispatch({ type: "VIEW_APPOINTMENT", appointment: appointment })
        navigate("/staff/appointment")
    }

    return (
        <AlternatingTableRow>
            <TableCell>{ displayDate(appointment.date) }</TableCell>
            <TableCell>{ appointment.time }</TableCell>
            <TableCell>{ appointment.patientName }</TableCell>
            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={ handleView }>View</Button>
                </Stack>
            </TableCell>
        </AlternatingTableRow>
    )
}