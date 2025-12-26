import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Fragment, useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";
import PatientOnly, {isLoggedIn} from "../../components/PatientOnly";

export default function ViewPrescriptionPage () {

    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const navigate = useNavigate()

    const [ prescriptions, getPrescriptions ] = useResource(() => ({
        url: "/prescription/?patientId=" + user.id ,
        method: "get"
    }))

    useEffect(getPrescriptions, [])

    useEffect(() => {
        if (prescriptions && prescriptions.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (prescriptions && prescriptions.data) {
            dispatch({ type: "FETCH_PRESCRIPTION", prescriptions: prescriptions.data })
        }
    }, [prescriptions])

    function handleBack(event) {
        navigate("/patient/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Prescriptions" />
            <PatientOnly />
            { isLoggedIn(state) &&
                <Fragment>
                    <PrescriptionList />
                    <Stack direction="row">
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}

function PrescriptionList() {
    const { state } = useContext(StateContext)
    const { prescriptions } = state
    if (!prescriptions || prescriptions.length === 0) {
        return (
            <Typography color="textSecondary" variant="body2" paddingTop={1}>
                No prescriptions found.
            </Typography>
        )
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Condition</TableCell>
                        <TableCell>Medication</TableCell>
                        <TableCell>Pharmacy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { prescriptions.map((prescription, index) => (
                        <PrescriptionSummary key={'prescription-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function PrescriptionSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { prescriptions } = state
    const prescription = prescriptions[index]


    return (
        <AlternatingTableRow>
            <TableCell>{ prescription.condition }</TableCell>
            <TableCell>{ prescription.medication }</TableCell>
            <TableCell>{ prescription.pharmacy }</TableCell>
        </AlternatingTableRow>
    )
}
