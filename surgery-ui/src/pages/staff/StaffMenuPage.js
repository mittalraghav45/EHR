import { useNavigate } from "react-router-dom";
import {Button, Stack } from "@mui/material";
import {useContext, useEffect} from "react";
import {PageTitle} from "../../components/PageTitle";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook";

export default function StaffMenuPage () {

    const { dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const title = 'Cloud Surgery Staff Menu'
    useEffect(() => { document.title = title; }, [])

    const [ employees, getEmployees ] = useResource(() => ({
        url: "/employee",
        method: "get"
    }))

    useEffect(getEmployees, [])

    useEffect(() => {
        if (employees && employees.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (employees && employees.data) {
            dispatch({ type: "FETCH_EMPLOYEES", employees: employees.data })
        }
    }, [employees])

    function handleAppointments(event) {
        navigate("/staff/appointments")
    }

    function handleAppointmentRequests(event) {
        navigate("/staff/appointmentRequests")
    }

    function handleMedicalHistory(event) {
        navigate("/staff/medicalhistory")
    }

    function handlePrescriptions(event) {
        navigate("/staff/prescriptions")
    }

    function handleRegistrationRequests(event) {
        navigate("/staff/registrations")
    }

    function handleTests(event) {
        navigate("/staff/tests")
    }

    function handlePatientSearch(event) {
        navigate("/staff/search")
    }

    function handleEmployees(event) {
        navigate("/staff/employees")
    }

    function handleLogout(event) {
        dispatch({ type: "LOGOUT" })
        navigate("/")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Staff Menu" />
            <Button fullWidth onClick={handleAppointmentRequests}>Appointment Requests</Button>
            <Button fullWidth onClick={handleRegistrationRequests}>Registration Requests</Button>
            <Button fullWidth onClick={handlePatientSearch}>Search Patient</Button>
            <Button fullWidth onClick={handleAppointments}>My Appointments</Button>
            {/* <Button fullWidth onClick={handleMedicalHistory}>Medical History</Button>
            <Button fullWidth onClick={handlePrescriptions}>Prescriptions</Button>
            <Button fullWidth onClick={handleTests}>Medical Tests</Button> */}
            <Button fullWidth onClick={handleEmployees}>Employees</Button>
            <Button fullWidth variant="outlined" onClick={handleLogout}>Log Out</Button>
        </Stack>
    )
}