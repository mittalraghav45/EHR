import { useNavigate } from "react-router-dom";
import {Button, Container, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";

export default function PatientLoginPage() {

    const navigate = useNavigate();
    const { dispatch } = useContext(StateContext)

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const mandatory = userName !== '' && password !== ''

    const [ patient, getPatient ] = useResource(() => ({
        url: "/login/" + userName + "/" + encrypt(password),
        method: "get"
    }))

    useEffect(() => {
        if (patient && patient.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (patient && patient.data) {
            if (patient.data.length === 1) {
                const user = patient.data[0]
                const name = user.title + " " + user.firstName + " " + user.surname
                const email = user.email
                const postCode = user.address.postCode
                dispatch({ type: "LOGIN", id: user.id, name: name, role: "patient", email: email,
                    postCode: postCode, doctorId: user.staffId });
                dispatch({ type: "FETCH_PATIENTS", patients: patient.data });
                navigate("/patient/menu")
            }
            else {
                dispatch({ type: "LOGIN_ERROR" })
            }
        }
    }, [patient])

    function handleUserName(event) {
        setUserName(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleCancel(event) {
        navigate("/");
    }

    function handleLogin(event) {
        getPatient()
    }

    function handleRegister(event) {
        navigate("/register");
    }

    return (
        <Stack direction="column">
            <PageTitle title="Patient Login" />
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={ handleUserName } />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} />
            <Stack direction="row">
                <Button disabled={ !mandatory } onClick={ handleLogin }>Log In</Button>
                <Button onClick={ handleRegister }>Register</Button>
                <Button variant="outlined" onClick={ handleCancel }>Cancel</Button>
            </Stack>
        </Stack>
    )
}
