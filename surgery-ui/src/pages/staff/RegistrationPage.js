import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {InputLabel, Select, MenuItem, FormLabel, Button, Container, Stack, TextField, Typography} from "@mui/material";
import validator from "validator";
import {StateContext} from "../../contexts/contexts";
import {evaluatePassword} from "../../utils/passwordPolicy";
import {encrypt} from "../../utils/encrypt";
import {useResource} from "react-request-hook";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function StaffRegistrationPage() {
    const navigate = useNavigate()
    const {state} = useContext(StateContext)
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
        createStaffRegistration({
            firstName:firstName.trim(), surname:surname.trim(), email:email.trim().toLowerCase(),
            role, title, password:encrypt(password)
        })
        navigate("/staff/menu")
    }

    return (
        <Container>
            <StaffOnly />
            {isLoggedIn(state) && (
                <Stack direction="column" spacing={1}>
                    <Typography spacing={2} color="textSecondary" variant="h4">Staff Registration</Typography>
                    <InputLabel id="title-label">Title</InputLabel>
                    <Select labelId="title-label" id="title" value={title} onChange={e=>setTitle(e.target.value)}>
                        <MenuItem value="Mr">Mr</MenuItem><MenuItem value="Mrs">Mrs</MenuItem><MenuItem value="Dr">Dr</MenuItem>
                    </Select>
                    <FormLabel>First Name</FormLabel>
                    <TextField id="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} />
                    <FormLabel>Family / Surname</FormLabel>
                    <TextField id="surname" value={surname} onChange={e=>setSurname(e.target.value)} />
                    <FormLabel>Email Address</FormLabel>
                    <TextField id="email" value={email} onChange={e=>setEmail(e.target.value)} error={!emailValid} />
                    <FormLabel>Confirm Email Address</FormLabel>
                    <TextField id="confirmEmail" value={confirmEmail} onChange={e=>setConfirmEmail(e.target.value)} error={!emailsMatch} />
                    <FormLabel>New Password</FormLabel>
                    <TextField id="password" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
                    <FormLabel>Confirm New Password</FormLabel>
                    <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={e=>setConfirmPassword(e.target.value)} error={!passwordsMatch} />
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select labelId="role-label" id="role" value={role} onChange={e=>setRole(e.target.value)}>
                        <MenuItem value="Nurse">Nurse</MenuItem><MenuItem value="Doctor">Doctor</MenuItem><MenuItem value="Administrator">Administrator</MenuItem>
                    </Select>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => navigate("/staff/menu")}>Cancel</Button>
                        <Button variant="contained" onClick={handleRegister} disabled={!mandatory}>Register</Button>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}