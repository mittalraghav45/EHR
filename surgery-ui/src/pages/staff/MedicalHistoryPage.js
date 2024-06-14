import { useNavigate } from "react-router-dom";
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../contexts/contexts";
import { PageTitle } from "../../components/PageTitle";
import { AlternatingTableRow } from "../../components/AlternatingTableRow";

export default function MedicalHistoryPage() {
    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { state } = useContext(StateContext);
    let patientid=state.patient.id;

    const [medhistorys, getMedhistory] = useResource(() => ({
        url: "/notes?patientId="+patientid,
        method: "get"
    }))

    useEffect(getMedhistory, []); 

    useEffect(() => {
        if (medhistorys && medhistorys.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (medhistorys && medhistorys.data) {
            dispatch({ type: "FETCH_MEDHISTORY", medhistorys: medhistorys.data })
        }
    }, [medhistorys])

    function handleCreate(event) { 
        dispatch({ type: "CREATE_MEDHISTORY" })
        navigate("/staff/medicalhistorydetail");
    }

    function handleBack(event) {
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Medical History" />
            <MedHistoryList />
            <Stack direction="row">
                <Button onClick={handleCreate}>Create Medical Record</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>

        </Stack>
    )
}

function MedHistoryList() {
    const { state } = useContext(StateContext); 
    const { medhistorys } = state; 
    
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        
                        <TableCell>Date</TableCell>                    
                        <TableCell>Summary</TableCell> 
                        <TableCell>Details</TableCell>   

                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {<TableBody>
                    {medhistorys.map((medhistory, index) => (
                        <MedHistoryListSummary key={'medhistory-' + index} index={index} />

                    ))}
                </TableBody>
                }
            </Table>
        </TableContainer>
    );
}
 
function MedHistoryListSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { medhistorys } = state
    const medhistory = medhistorys[index];

    function handleView(event) {
        dispatch({ type: "VIEW_MEDHISTORY", medhistory: medhistory })
        navigate("/staff/medicalhistorydetail") 
    }

    return (

        <TableRow key={index}>
            <TableCell>{medhistory.date}</TableCell>    
            <TableCell>{medhistory.summary}</TableCell>
            <TableCell>{medhistory.details}</TableCell>    

            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={handleView}>View</Button>
                </Stack>        
            </TableCell>
        </TableRow>
    )
}
 