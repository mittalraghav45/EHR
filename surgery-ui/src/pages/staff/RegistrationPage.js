import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { InputLabel, Select, MenuItem, FormLabel, Button, Container, Stack, TextField, Typography } from "@mui/material";
import validator from "validator/es";
import { StaffContext } from "../../contexts/staffContext";
import { encrypt } from "../../utils/encrypt";
import { useResource } from "react-request-hook";

export default function StaffRegistrationPage() {

    const { state, dispatch } = useContext(StaffContext)
    const navigate = useNavigate()

    const { staff } = state

    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [title, setTitle] = useState('')


    const emailValid = email === "" || validator.isEmail(email)
    const emailError = emailValid ? "" : "Email address is not the correct format"

    const emailsMatch = (email === confirmEmail)
    const emailMatchError = emailsMatch ? "" : "Email addresses do not match"

    const passwordsMatch = (password === confirmPassword)
    const passwordError = passwordsMatch ? "" : "Passwords do not match"

    const mandatory = firstName !== "" && surname !== "" && email !== "" && password !== ""
        && emailValid && emailsMatch && passwordsMatch


    const [ , createStaffRegistration ] = useResource((data) => ({
        url: '/employee',
        method: 'post',
        data: data
    }))

    function handleFirstName(event) {
        setFirstName(event.target.value)
    }

    function handleSurname(event) {
        setSurname(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)
    }

    function handleConfirmEmail(event) {
        setConfirmEmail(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }
    function handleRole(event) {
        setRole(event.target.value)
    }
    function handleTitle(event) {
        setTitle(event.target.value)
    }

    function handleCancel(event) {
        navigate("/")
    }

    function handleRegister(event) {
        // dispatch({ type: "REGISTER_STAFF", firstName, surname, email, password, role });  put Title
        const hashed = encrypt(password);
        const submitted = { 'firstName':firstName,'surname':surname,'email':email,'role':role,'title':title, password: hashed }
        console.log('submitted data  ' ,submitted);
        createStaffRegistration(submitted);
        navigate("/staff/menu");
    }

    //new code ends


    return (
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Staff Registration
            </Typography>

            <Stack direction="column" spacing={1}>

            <InputLabel id="title-label">Title</InputLabel>
            <Select labelId="title-label" id="title" value={title} onChange={handleTitle} label="Title" name="title">
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                </Select>
                <FormLabel>First Name </FormLabel>
                <TextField id="firstName" value={firstName} onChange={handleFirstName} />
                <FormLabel>Family / Surname</FormLabel>
                <TextField id="surname" value={surname} onChange={handleSurname} />
                <FormLabel>Email Address </FormLabel>
                <TextField id="email" value={email} onChange={handleEmail}
                    error={!emailValid} helperText={emailError} />
                <FormLabel>Confirm Email Address</FormLabel>
                <TextField id="confirmEmail" value={confirmEmail} onChange={handleConfirmEmail}
                    error={!emailsMatch} helperText={emailMatchError} />
                <FormLabel>New Password </FormLabel>
                <TextField id="password" value={password} type="password" onChange={handlePassword} />
                <FormLabel>Confirm New Password</FormLabel>
                <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={handleConfirmPassword}
                    error={!passwordsMatch} helperText={passwordError} />

                <InputLabel id="role-label">Role</InputLabel>
                <Select labelId="role-label" id="role" value={role} onChange={handleRole} label="Role" name="role">
                    <MenuItem value="nurse">Nurse</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleRegister} disabled={!mandatory}>Register</Button>
                </Stack>
            </Stack>
        </Container>
    );
}
