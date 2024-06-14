import { useNavigate } from "react-router-dom";
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../contexts/contexts";
import { PageTitle } from "../../components/PageTitle";
import { AlternatingTableRow } from "../../components/AlternatingTableRow";

export default function ViewPrescriptionPage() {

    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { state } = useContext(StateContext);  
    let patientid=state.patient.id;  
    
    const [prescriptions, getPrescriptions] = useResource(() => ({
        url: "/prescription?patientId="+patientid,
        method: "get"
    }))

    useEffect(getPrescriptions, []);

    useEffect(() => {
        if (prescriptions && prescriptions.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (prescriptions && prescriptions.data) {
            dispatch({ type: "FETCH_PRESCRIPTION", prescriptions: prescriptions.data })
        }
    }, [prescriptions])

    function handleAdd(event) {
        dispatch({ type: "CREATE_PRESCRIPTION" })
        navigate("/staff/prescriptiondetail")
    }

    function handleBack(event) {
        navigate("/staff/search")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View prescriptions" />
            <PrescriptionList />
            <Stack direction="row">
                <Button onClick={handleAdd}>Create Prescription</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>

        </Stack>
    )
}

function PrescriptionList() {
     const { state } = useContext(StateContext);
    const { prescriptions } = state;
 
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>                        
                        <TableCell>Condition</TableCell>
                        <TableCell>Medication</TableCell>
                        <TableCell>Pharmacy</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {<TableBody>
                    {prescriptions.map((prescription, index) => (
                        <PrescriptionSummary key={'prescription-' + index} index={index} />

                    ))}
                </TableBody>
                }
            </Table>
        </TableContainer>
    );
}


function PrescriptionSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { prescriptions } = state
    const prescription = prescriptions[index]

    function handleView(event) {
        dispatch({ type: "VIEW_PRESCRIPTION", prescription: prescription })
        navigate("/staff/prescriptiondetail")
    }

    return (

        <TableRow key={index}> 
            <TableCell>{prescription.condition}</TableCell>
            <TableCell>{prescription.medication}</TableCell>
            <TableCell>{prescription.pharmacy}</TableCell>
            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={handleView}>View</Button>
                </Stack>        </TableCell>
        </TableRow>
    )
}

