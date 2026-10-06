import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {InputLabel, Select, MenuItem, FormLabel, Button, Container, Stack, TextField, Typography} from "@mui/material";
import validator from "validator";
import {evaluatePassword} from "../../utils/passwordPolicy";
import {encrypt} from "../../utils/encrypt";
import {useResource} from "react-request-hook";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function StaffRegistrationPage() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")
    const [title, setTitle] = useState("")

    const emailValid = email === "" || validator.isEmail(email)
    const emailsMatch = email === confirmEmail
    const passwordsMatch = password === confirmPassword
    const passwordPolicyMet = evaluatePassword(password).isValid
    const mandatory = firstName.trim() !== "" && surname.trim() !== "" && email.trim() !== "" &&
        password !== "" && title !== "" && role !== "" && emailValid && emailsMatch && passwordsMatch && passwordPolicyMet

    const [, createStaffRegistration] = useResource(data => ({url:"/employee", method:"post", data}))

    function handleRegister() {
        const submitted = {
            firstName:firstName.trim(), surname:surname.trim(), email:email.trim().toLowerCase(),
            role, title, password:encrypt(password)
        }
        createStaffRegistration(submitted)
        navigate("/staff/menu")
    }

    return (
        <Container>
            <StaffOnly />
            {isLoggedIn({ ...arguments[0] }) && null}
            <StaffRegistrationForm
                state={{firstName,surname,email,confirmEmail,password,confirmPassword,role,title,
                    emailValid,emailsMatch,passwordsMatch,passwordPolicyMet,mandatory}}
                setState={{setFirstName,setSurname,setEmail,setConfirmEmail,setPassword,setConfirmPassword,setRole,setTitle}}
                onCancel={() => navigate("/staff/menu")}
                onRegister={handleRegister}
            />
        </Container>
    )
}

function StaffRegistrationForm({state,setState,onCancel,onRegister}) {
    const {firstName,surname,email,confirmEmail,password,confirmPassword,role,title,emailValid,emailsMatch,passwordsMatch,mandatory}=state
    const {setFirstName,setSurname,setEmail,setConfirmEmail,setPassword,setConfirmPassword,setRole,setTitle}=setState
    return (
        <Stack direction="column" spacing={1}>
            <Typography spacing={2} color="textSecondary" variant="h4">Staff Registration</Typography>
            <InputLabel id="title-label">Title</InputLabel>
            <Select labelId="title-label" id="title" value={title} onChange={e=>setTitle(e.target.value)}>
                <MenuItem value="Mr">Mr</MenuItem><MenuItem value="Mrs">Mrs</MenuItem><MenuItem value="Dr">Dr</MenuItem>
            </Select>
            <FormLabel>First Name</FormLabel><TextField id="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} />
            <FormLabel>Family / Surname</FormLabel><TextField id="surname" value={surname} onChange={e=>setSurname(e.target.value)} />
            <FormLabel>Email Address</FormLabel><TextField id="email" value={email} onChange={e=>setEmail(e.target.value)} error={!emailValid} />
            <FormLabel>Confirm Email Address</FormLabel><TextField id="confirmEmail" value={confirmEmail} onChange={e=>setConfirmEmail(e.target.value)} error={!emailsMatch} />
            <FormLabel>New Password</FormLabel><TextField id="password" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
            <FormLabel>Confirm New Password</FormLabel><TextField id="confirmPassword" value={confirmPassword} type="password" onChange={e=>setConfirmPassword(e.target.value)} error={!passwordsMatch} />
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" value={role} onChange={e=>setRole(e.target.value)}>
                <MenuItem value="Nurse">Nurse</MenuItem><MenuItem value="Doctor">Doctor</MenuItem><MenuItem value="Administrator">Administrator</MenuItem>
            </Select>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" onClick={onRegister} disabled={!mandatory}>Register</Button>
            </Stack>
        </Stack>
    )
}