import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PrescriptionUI from './PrescriptionUI';

function PrescriptionManagement(patients,prescriptions) {
    
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isViewingPrescription, setIsViewingPrescription] = useState(false);
    const [editedDate, setEditedDate] = useState('');
    const [editedSummary, setEditedSummary] = useState('');
    const [editedMedication, setEditedMedication] = useState('');

    // // Define patients and prescriptions arrays
    // const patients = [
    //     { id: 1, name: 'John Doe' },
    //     { id: 2, name: 'Jane Smith' },
    //     { id: 3, name: 'Michael Johnson' }
    // ];

    // const prescriptions = [
    //     { id: 1, patientId: 1, date: '2024-04-20', summary: 'Summary 1', medication: 'Medication 1' },
    //     { id: 2, patientId: 1, date: '2024-04-21', summary: 'Summary 2', medication: 'Medication 2' },
    //     { id: 3, patientId: 2, date: '2024-04-22', summary: 'Summary 3', medication: 'Medication 3' },
    //     { id: 4, patientId: 3, date: '2024-04-23', summary: 'Summary 4', medication: 'Medication 4' }
    // ];

    const handleViewPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setIsViewingPrescription(true);
        setEditedDate(prescription.date);
        setEditedSummary(prescription.summary);
        setEditedMedication(prescription.medication);
    };

    const handleClosePrescription = () => {
        setIsViewingPrescription(false);
        setSelectedPrescription(null);
    };

    const handleDelete = () => {
        // Implement logic to delete prescription
        handleClosePrescription();
    };

    const handleUpdate = () => {
        // Implement logic to update prescription
        const updatedPrescription = { ...selectedPrescription, date: editedDate, summary: editedSummary, medication: editedMedication };
        console.log("Updated Prescription:", updatedPrescription);
        // Call API or update state with the updated prescription
        handleClosePrescription();
    };

  
    
    
    return (    
        
        <Grid container spacing={2}>
            {patients.map(patient => (
                <Grid item key={patient.id} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {patient.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Prescriptions:
                            </Typography>
                            {prescriptions
                                .filter(prescription => prescription.patientId === patient.id)
                                .map(prescription => (
                                    <div key={prescription.id}>
                                        <Typography variant="body2">{prescription.medication}</Typography>
                                        <Button variant="outlined" color="primary" onClick={() => handleViewPrescription(prescription)}>
                                            View Prescription
                                        </Button>
                                        <Button variant="outlined" color="primary" onClick={()=>{}}>Create New</Button>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            <Dialog open={isViewingPrescription} onClose={handleClosePrescription}>
                <DialogTitle>Edit Prescription</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                    />
                    <TextField
                        label="Patient Name"
                        variant="outlined"
                        fullWidth
                        value={selectedPrescription ? patients.find(patient => patient.id === selectedPrescription.patientId).name : ''}
                        disabled
                    />
                    <TextField
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        value={editedSummary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                    />
                    <TextField
                        label="Prescription"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={editedMedication}
                        onChange={(e) => setEditedMedication(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                    <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
                    <Button variant="outlined" color="primary" onClick={handleClosePrescription}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default PrescriptionManagement;
