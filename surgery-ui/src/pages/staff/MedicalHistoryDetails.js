import {useNavigate} from "react-router-dom";
import {Button, FormLabel, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook"; 
import {today} from "../../utils/workingDays.js"
 

export default function MedicalHistoryDetails() {

    const navigate = useNavigate()
    const { state, dispatch } = useContext(StateContext)
    const { medhistory } = state 
    
    const [ summary, setSummary ] = useState(medhistory.summary) 
    const [ details, setDetails ] = useState(medhistory.details) 

    function handleSummary(event) {
        setSummary(event.target.value)
    } 

    function handleDetails(event) {
        setDetails(event.target.value)
    }  
    
    function handleBack(event) {
        navigate("/staff/medicalhistory")
    } 

        const mandatory = details !== ""  && summary !== ""  ;

        const isNew = state.medhistory.id === undefined;
        const deletable = !isNew
    
        function handleSave(event) {
            if (isNew) { 
                createMedHistory()
            } else {
                update();
            }
            navigate("/staff/medicalhistory")
        }
        
    const [ , createMedHistory ] = useResource(() => ({
        url: "/notes",
        method: "post",
        data: {
            patientId:state.patient.id,
            staffId:state.user.id,
            date:today(),
            summary:summary,
            details:details
        } 
    }))
 
    const [ , deleteMedHistory] = useResource(() => ({
        url: "/notes/"+state.medhistory.id, 
        method: "delete"
    })) 

    const [ , update ] = useResource(() => ({
        url: "notes/" + state.medhistory.id,
        method: "put",
        data: {...medhistory,summary:summary,details:details}
    }))

    function handleDelete(event) { 
        deleteMedHistory(); 
        navigate("/staff/medicalhistory")
    } 

    return (
        <Stack direction="column">
            <PageTitle title="Medical History Details" /> 

            <FormLabel>Patient Id</FormLabel>
            <TextField id="patientId" value={state.patient.id}  disabled={true}  />

            <FormLabel>Staff Id</FormLabel>
            <TextField id="staffId" value={state.user.id}  disabled={true}  />  
            
            <FormLabel>Date</FormLabel>
            <TextField id="date" value={today()}  disabled={true} />

            <FormLabel>Summary</FormLabel>
            <TextField id="summary" value={summary} onChange={handleSummary} />

            <FormLabel>Details</FormLabel>
            <TextField id="details" value={details} onChange={handleDetails} />
            
            <Stack direction="row">                  
                  <Button onClick={ handleSave } disabled={!mandatory}>Save </Button> 
                  <Button onClick={ handleDelete } disabled={!deletable}>Delete</Button>
                <Button variation="outlined" onClick={handleBack}>Back</Button> 
            </Stack>
        </Stack>
    )
}