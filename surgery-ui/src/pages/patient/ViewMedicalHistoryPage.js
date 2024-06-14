import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Fragment, useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";
import PatientOnly, {isLoggedIn} from "../../components/PatientOnly";
import { displayDate } from "../../utils/workingDays";

export default function ViewMedicalHistoryPage () {

    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const navigate = useNavigate()

    const [ medhistorys, getMedhistorys ] = useResource(() => ({
        url: "/notes/?patientId=" + user.id ,
        method: "get"
    }))

    useEffect(getMedhistorys, [])

    useEffect(() => {
        if (medhistorys && medhistorys.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (medhistorys && medhistorys.data) {
            dispatch({ type: "FETCH_MEDHISTORY", medhistorys: medhistorys.data })
        }
    }, [medhistorys])

    function handleBack(event) {
        navigate("/patient/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Medical History" />
            <PatientOnly />
            { isLoggedIn(state) &&
                <Fragment>
                    <MedicalHistoryList />
                    <Stack direction="row">
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}

function MedicalHistoryList() {
    const { state } = useContext(StateContext)
    const { medhistorys } = state
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Summary</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { medhistorys.map((medhistory, index) => (
                        <MedicalHistorySummary key={'medhistory-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function MedicalHistorySummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { medhistorys } = state
    const medhistory = medhistorys[index]


    return (
        <AlternatingTableRow>
            <TableCell>{ medhistory.date}</TableCell>
            <TableCell>{ medhistory.summary }</TableCell>
            <TableCell>{ medhistory.details }</TableCell>
        </AlternatingTableRow>
    )
}