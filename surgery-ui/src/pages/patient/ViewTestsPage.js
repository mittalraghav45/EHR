import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Fragment, useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";
import PatientOnly, {isLoggedIn} from "../../components/PatientOnly";
import { displayDate } from "../../utils/workingDays";

export default function ViewTestsPage () {

    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const navigate = useNavigate()

    const [ tests, getTests ] = useResource(() => ({
        url: "/test/?patientId=" + user.id ,
        method: "get"
    }))

    useEffect(getTests, [])

    useEffect(() => {
        if (tests && tests.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (tests && tests.data) {
            dispatch({ type: "FETCH_TEST", tests: tests.data })
        }
    }, [tests])

    function handleBack(event) {
        navigate("/patient/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Tests" />
            <PatientOnly />
            { isLoggedIn(state) &&
                <Fragment>
                    <TestList />
                    <Stack direction="row">
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                    </Stack>
                </Fragment>
            }
        </Stack>
    )
}

function TestList() {
    const { state } = useContext(StateContext)
    const { tests } = state
    if (!tests || tests.length === 0) {
        return (
            <Typography color="textSecondary" variant="body2" paddingTop={1}>
                No test records found.
            </Typography>
        )
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { tests.map((test, index) => (
                        <TestSummary key={'test-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function TestSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { tests } = state
    const test = tests[index]


    return (
        <AlternatingTableRow>
            <TableCell>{ displayDate(test.date) }</TableCell>
            <TableCell>{ test.time }</TableCell>
            <TableCell>{ test.type }</TableCell>
            <TableCell>{ test.condition }</TableCell>
            <TableCell>{ test.location }</TableCell>
            <TableCell>{ test.results }</TableCell>
        </AlternatingTableRow>
    )
}
