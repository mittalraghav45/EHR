import {useNavigate} from "react-router-dom";
import {
    Button,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";

export default function ViewRegistrationRequestsPage () {

    const title = 'Cloud Surgery Registration Requests'
    useEffect(() => { document.title = title; }, [])

    const { dispatch } = useContext(StateContext)

    const navigate = useNavigate()

    const [ registrations, getRegistrations ] = useResource(() => ({
        url: "/registration",
        method: "get"
    }))

    useEffect(getRegistrations, [])

    useEffect(() => {
        if (registrations && registrations.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (registrations && registrations.data) {
            dispatch({ type: "FETCH_REGISTRATIONS", registrations: registrations.data })
        }
    }, [registrations])

    function handleBack(event) {
        navigate("/staff/menu")
    }

    return (
        <Container>
            <Typography spacing={1} margin={1} color="textSecondary" variant="h4">{ title }</Typography>
            <Stack direction="column" spacing={1} margin={1}>
                <RegistrationList />
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                </Stack>
            </Stack>
        </Container>
    )
}

function RegistrationList() {
    const { state } = useContext(StateContext)
    const { registrations } = state
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Post Code</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { registrations.map((registration, index) => (
                        <RegistrationSummary key={'registration-' + index} index={index}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function RegistrationSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const { registrations } = state
    const registration = registrations[index]

    const navigate = useNavigate()

    function handleView(event) {
        dispatch({ type: "APPROVE_REGISTRATION", register: registration })
        navigate("/staff/approve")
    }

    return (
        <AlternatingTableRow>
            <TableCell>{ registration.firstName } { registration.surname }</TableCell>
            <TableCell>{ registration.email }</TableCell>
            <TableCell>{ registration.address.postCode }</TableCell>
            <TableCell>{ registration.status }</TableCell>
            <TableCell>
                <Button variant="contained" onClick={ handleView }>View</Button>
            </TableCell>
        </AlternatingTableRow>
    )
}