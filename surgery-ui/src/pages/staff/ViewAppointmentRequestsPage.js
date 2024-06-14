import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";

export default function ViewAppointmentRequestsPage () {

    const { dispatch } = useContext(StateContext)

    const navigate = useNavigate()

    const [ appointmentRequests, getAppointmentRequests ] = useResource(() => ({
        url: "/appointmentRequest",
        method: "get"
    }))

    useEffect(getAppointmentRequests, [])

    useEffect(() => {
        if (appointmentRequests && appointmentRequests.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (appointmentRequests && appointmentRequests.data) {
            dispatch({ type: "FETCH_APPOINTMENT_REQUESTS", appointmentRequests: appointmentRequests.data })
        }
    }, [appointmentRequests])


    function handleBack(event) {
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Appointment Requests" />
            <AppointmentRequestList />
            <Stack direction="row">
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>
        </Stack>
    )
}

function AppointmentRequestList() {
    const { state } = useContext(StateContext)
    const { appointmentRequests } = state
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Post Code</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { appointmentRequests.map((employee, index) => (
                        <AppointmentRequestSummary key={'appointment-request-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function AppointmentRequestSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { appointmentRequests } = state
    const appointmentRequest = appointmentRequests[index]

    function handleView(event) {
        dispatch({ type: "VIEW_APPOINTMENT_REQUEST", appointmentRequest: appointmentRequest })
        navigate("/staff/appointmentRequest")
    }

    return (
        <AlternatingTableRow>
            <TableCell>{ appointmentRequest.patientName }</TableCell>
            <TableCell>{ appointmentRequest.patientEmail }</TableCell>
            <TableCell>{ appointmentRequest.patientPostCode }</TableCell>
            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={ handleView }>View</Button>
                </Stack>
            </TableCell>
        </AlternatingTableRow>
    )
}