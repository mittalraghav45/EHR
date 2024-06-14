import { useNavigate } from "react-router-dom";
import {Button, Stack } from "@mui/material";
import {useContext} from "react";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";

export default function PatientMenuPage () {

    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    function handleAppointmentRequest(event) {
        navigate("/patient/appointmentRequest")
    }

    function handleAppointments(event) {
        navigate("/patient/appointments")
    }

    function handleMedicalHistory(event) {
        navigate("/patient/medicalhistory")
    }

    function handlePrescriptions(event) {
        navigate("/patient/prescriptions")
    }

    function handleTests(event) {
        navigate("/patient/tests")
    }

    function handleUpdateDetails(event) {
        navigate("/patient/details")
    }

    function handleLogout(event) {
        dispatch({ type: "LOGOUT" })
        navigate("/")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Patient Menu" />
            <Button fullWidth onClick={handleUpdateDetails}>Update Your Details</Button>
            <Button fullWidth onClick={handleAppointmentRequest}>Request an Appointment</Button>
            <Button fullWidth onClick={handleAppointments}>View Your Appointments</Button>
            <Button fullWidth onClick={handleMedicalHistory}>View Your Medical History</Button>
            <Button fullWidth onClick={handlePrescriptions}>View Your Prescriptions</Button>
            <Button fullWidth onClick={handleTests}>View Your Test Details</Button>
            <Button fullWidth onClick={handleLogout}>Log Out</Button>
        </Stack>
    )
}