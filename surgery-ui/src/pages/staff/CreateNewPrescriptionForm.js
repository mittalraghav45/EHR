import React, { useState } from 'react';
import { Grid,TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CreateNewPrescriptionForm = () => 
{
    console.log('in CreateNewPrescriptionForm')
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [medication, setMedication] = useState('');
    const [condition, setCondition] = useState('');
    const [pharmacyDetails, setPharmacyDetails] = useState('');

    const handleCreate = () => {

        const newPrescription = {
            patientName,
            date,
            summary,
            medication,
            condition,
            pharmacyDetails
        };
 
    };

    const handleClose = () => {
        
    };

    return (
        // <Dialog open={true} onClose={handleClose}>
        //     <DialogTitle>Create New Prescription</DialogTitle>
        //     <DialogContent style={{ marginTop: '10px' }}>
        //         <TextField label="Patient Name" style={{ marginTop: '10px' }} variant="outlined" fullWidth value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        //         <TextField style={{ marginTop: '10px' }}  variant="outlined" fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        //         <TextField style={{ marginTop: '10px' }} label="Summary" variant="outlined" fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} />
        //         <TextField style={{ marginTop: '10px' }} label="Medication" variant="outlined" fullWidth multiline rows={4} value={medication} onChange={(e) => setMedication(e.target.value)} />
        //         <TextField style={{ marginTop: '10px' }} label="Condition" variant="outlined" fullWidth multiline rows={4} value={condition} onChange={(e) => setCondition(e.target.value)} />
        //         <TextField label="Pharmacy Details" style={{ marginTop: '10px' }} variant="outlined" fullWidth multiline rows={4} value={pharmacyDetails} onChange={(e) => setPharmacyDetails(e.target.value)} />
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={handleCreate} color="primary">Create</Button>
        //         <Button onClick={handleClose} color="secondary">Cancel</Button>
        //     </DialogActions>
        // </Dialog>

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField label="Patient Name" variant="outlined" fullWidth value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField  variant="outlined" fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField label="Summary" variant="outlined" fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Medication" variant="outlined" fullWidth multiline rows={4} value={medication} onChange={(e) => setMedication(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Condition" variant="outlined" fullWidth multiline rows={4} value={condition} onChange={(e) => setCondition(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Pharmacy Details" variant="outlined" fullWidth multiline rows={4} value={pharmacyDetails} onChange={(e) => setPharmacyDetails(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleCreate} color="primary">Create</Button>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
            </Grid>
        </Grid>
    );
};

export default CreateNewPrescriptionForm;
