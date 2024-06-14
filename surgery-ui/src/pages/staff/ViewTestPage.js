import { useNavigate } from "react-router-dom";
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../contexts/contexts";
import { PageTitle } from "../../components/PageTitle";
import { AlternatingTableRow } from "../../components/AlternatingTableRow";

export default function ViewTestPage() {

    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { state } = useContext(StateContext); 
    let patientid=state.patient.id; 

    const [tests, getTests] = useResource(() => ({
        url: "/test?patientId="+patientid,
        method: "get"
    }))

    useEffect(getTests, []);

    useEffect(() => {
        if (tests && tests.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (tests && tests.data) {
            dispatch({ type: "FETCH_TEST", tests: tests.data })
        }
    }, [tests])

    function handleCreate(event) { 
        dispatch({ type: "CREATE_TEST" })
        navigate("/staff/testdetail")
    }

    function handleBack(event) {
        navigate("/staff/search")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Tests" />
            <TestList />
            <Stack direction="row">
                <Button onClick={handleCreate}>Create Test</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>

        </Stack>
    )
}

function TestList() {
     const { state } = useContext(StateContext);
    const { tests } = state; 
    
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>                     
                    <TableCell>Condition</TableCell>
                    <TableCell>Date</TableCell>                      
                    <TableCell>Location</TableCell> 
                    <TableCell>Results</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Typee</TableCell> 
                    <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {<TableBody>
                    {tests.map((test, index) => (
                        <TestSummary key={'test-' + index} index={index} />

                    ))}
                </TableBody>
                }
            </Table>
        </TableContainer>
    );
}


function TestSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { tests } = state
    const test = tests[index]

    function handleView(event) {
        dispatch({ type: "VIEW_TEST", test: test })
        navigate("/staff/testdetail")
    }

    return (

        <TableRow key={index}>           
            <TableCell>{test.condition}</TableCell> 
            <TableCell>{test.date}</TableCell>           
            <TableCell>{test.location}</TableCell> 
            <TableCell>{test.results}</TableCell> 
            <TableCell>{test.time}</TableCell>
            <TableCell>{test.type}</TableCell> 
            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={handleView}>View</Button>
                </Stack>        
            </TableCell>
        </TableRow>
    )
}
 