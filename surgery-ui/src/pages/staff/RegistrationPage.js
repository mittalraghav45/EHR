import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {InputLabel, Select, MenuItem, FormLabel, Button, Container, Stack, TextField, Typography, Alert} from "@mui/material";
import validator from "validator";
import {StateContext} from "../../contexts/contexts";
import {evaluatePassword} from "../../utils/passwordPolicy";
import {encrypt} from "../../utils/encrypt";
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
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const emailValid = email === "" || validator.isEmail(email)
    const emailsMatch = email === confirmEmail
    const passwordsMatch = password === confirmPassword
    const passwordPolicyMet = evaluatePassword(password).isValid
    const mandatory = firstName.trim() !== "" && surname.trim() !== "" && email.trim() !== "" &&
        password !== "" && title !== "" && role !== "" && emailValid && emailsMatch && passwordsMatch && passwordPolicyMet

    async function handleRegister() {
        if (saving || !mandatory) return
        setSaving(true)
        setSaveError("")

        const data = {
            firstName: firstName.trim(),
            surname: surname.trim(),
            email: email.trim().toLowerCase(),
            role,
            title,
            password: encrypt(password)
        }

        try {
            const response = await fetch("/api/employee", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error("Unable to create employee")
            }

            await response.json()
            navigate("/staff/employees")
        } catch (error) {
            console.error("Staff registration failed", error)
            setSaveError(error.message || "Unable to create employee.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Container>
            <StaffOnly />
            {isLoggedIn(state) && (
                <Stack direction="column" spacing={1}>
                    <Typography spacing={2} color="textSecondary" variant="h4">Staff Registration</Typography>
                    {saveError && <Alert severity="error">{saveError}</Alert>}
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
                        <Button variant="outlined" onClick={() => navigate("/staff/menu")} disabled={saving}>Cancel</Button>
                        <Button variant="contained" onClick={handleRegister} disabled={!mandatory || saving}>
                            {saving ? "Registering..." : "Register"}
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}
