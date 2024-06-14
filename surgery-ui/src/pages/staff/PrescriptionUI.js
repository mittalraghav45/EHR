// /staff/prescriptionsui
import React,{useState} from 'react';
// import PrescriptionOverview from './PrescriptionOverview';
import { Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// { patients, prescriptions, isViewingPrescription, handleViewPrescription, handleClosePrescription, handleUpdate, handleDelete, editedDate, setEditedDate, selectedPrescription, editedSummary, setEditedSummary, editedMedication, setEditedMedication }

const PrescriptionUI = ( { patients }) => {

    // const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isViewingPrescription, setIsViewingPrescription] = useState(false);
    const [editedDate, setEditedDate] = useState('');
    const [editedSummary, setEditedSummary] = useState('');
    const [editedMedication, setEditedMedication] = useState('');

   

    // const handleViewPrescription=()=>{

    // }
    // const handleClosePrescription=()=>{

    // }
    // const handleUpdate=()=>{

    // }
    // const handleDelete=()=>{

    // }
    // const createNewPrescription=()=>{

    // }

    // console.log('selectedPrescription  ',selectedPrescription);
    console.log('patients  ',patients);

    
    return (
        <> 
    
            {/* <Dialog open={isViewingPrescription} onClose={handleClosePrescription}> */}
            <Dialog >
                <DialogTitle>Edit Prescription</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        value={editedDate}
                         
                        // onChange={(e) => setEditedDate(e.target.value)}
                    />
                    <TextField
                        label="Patient Name"
                        variant="outlined"
                        fullWidth
                         // value={selectedPrescription ? patients.find(patient => patient.id === selectedPrescription.patientId).name : ''}
                        disabled
                    />
                    <TextField
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        value={editedSummary}
                        // onChange={(e) => setEditedSummary(e.target.value)}
                    />
                    <TextField
                        label="Prescription"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={editedMedication}
                        // onChange={(e) => setEditedMedication(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary"  >Update</Button>
                    <Button variant="outlined" color="secondary"  >Delete</Button>
                    <Button variant="outlined" color="primary" >Cancel</Button>
                    {/* <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                    <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
                    <Button variant="outlined" color="primary" onClick={handleClosePrescription}>Cancel</Button> */}
                </DialogActions>
            </Dialog>
        
        </>
    );
};

export default PrescriptionUI;
