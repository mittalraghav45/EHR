import {useNavigate} from "react-router-dom";
import {Button, FormLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook"; 
 

export default function PrescriptionDetailsPage() {

    const navigate = useNavigate()
    const { state, dispatch } = useContext(StateContext)
    const { prescription } = state 

    const [ condition, setCondition ] = useState(prescription.condition)
    const [ medication, setMedication ] = useState(prescription.medication)
    const [ pharmacy, setPharmacy ] = useState(prescription.pharmacy)

    const [ appointmentId, setAppointmentId ] = useState(prescription.appointmentId)


    function handleCondition(event) {
        setCondition(event.target.value)
    }
    // function handleAppointmentId(event) {
    //     setAppointmentId(event.target.value)
    // }
    function handleMedication(event) {
        setMedication(event.target.value)
    }
    function handlePharmacy(event) {
        setPharmacy(event.target.value)
    }
       
    function handleBack(event) {
        navigate("/staff/prescriptions")
    }  
    const mandatory = condition !== ""  && medication!=='' && pharmacy !== ""  ;

    const isNew = state.prescription.id === undefined;
    const deletable = !isNew

    function handleSave(event) {

        if (isNew) { 
            createPrescription()
        } 
        else {
            updatePrescription();
        }
        navigate("/staff/prescriptions")
    } 
     
    const [ , createPrescription ] = useResource(() => ({
        url: "/prescription",
        method: "post",
        data: { 
            patientId:state.patient.id,
            staffId:state.user.id,
            // appointmentId:state.prescription.appointmentId,
            condition:condition,
            medication:medication,
            pharmacy:pharmacy
        }
         
    }))

    const [ , deletePrescription ] = useResource(() => ({
        url: "prescription/"+state.prescription.id,
        method: "delete"
    })) 

    const [ , updatePrescription ] = useResource(() => ({
        url: "prescription/"+state.prescription.id,
        method: "put",
        data: {...prescription,
            condition:condition,
            medication:medication,
            pharmacy:pharmacy
        }
    }))

    function handleDelete(event) {
        deletePrescription(); 
        navigate("/staff/prescriptions")
    } 

    return (
        <Stack direction="column">
            <PageTitle title="Prescription Details" />         
            <FormLabel>Patient Id</FormLabel>
            <TextField id="patientId" value={state.patient.id}  disabled={true} />

            <FormLabel>Staff Id</FormLabel>
            <TextField id="staffId" value={state.user.id} disabled={true}  />

            {/* <FormLabel>Appointment Id</FormLabel>
            <TextField id="appointmentId" value={appointmentId} disabled={false}  /> */}
            
            {/* onChange={handleAppointmentId}  */}
            
            <FormLabel>Condition</FormLabel>
            <TextField id="condition" value={condition} onChange={handleCondition} />

            <FormLabel> Medication</FormLabel>
            <TextField id="medication" value={medication} onChange={handleMedication} />
           
            <FormLabel> Pharmacy</FormLabel>
            <TextField id="pharmacy" value={pharmacy} onChange={handlePharmacy} />
             
            <Stack direction="row">
            <Button onClick={ handleSave} disabled={!mandatory}>Save</Button>                
            <Button onClick={ handleDelete} disabled={!deletable}>Delete</Button>
        <Button variant="outlined" onClick={handleBack}>Back</Button> 
            </Stack>
        </Stack>
    )
}
