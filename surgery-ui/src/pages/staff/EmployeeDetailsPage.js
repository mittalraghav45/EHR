import {useNavigate} from "react-router-dom";
import {Alert, Button, FormLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {Fragment, useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {roles, titles} from "../../utils/dropdownLists";
import validator from "validator";
import {encrypt} from "../../utils/encrypt";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function EmployeeDetailsPage() {

    const navigate = useNavigate()
    const { state } = useContext(StateContext)
    const { employee } = state

    const [ title, setTitle ] = useState(employee.title)
    const [ firstName, setFirstName ] = useState(employee.firstName)
    const [ surname, setSurname ] = useState(employee.surname)
    const [ email, setEmail ] = useState(employee.email)
    const [ password, setPassword ] = useState(employee.password)
    const [ confirmPassword, setConfirmPassword ] = useState(employee.password)
    const [ role, setRole ] = useState(employee.role)
    const [ saving, setSaving ] = useState(false)
    const [ saveError, setSaveError ] = useState("")

    const emailValid = email === "" || validator.isEmail(email)
    const emailError = emailValid ? "" : "Email address is not the correct format"
    const passwordsMatch = (password === confirmPassword)
    const passwordError = passwordsMatch ? "" : "Passwords do not match"

    const isNew = employee.id === undefined
    const deletable = !isNew
    const mandatory = email !== "" && emailValid && password !== "" && passwordsMatch
        && title !== "" && firstName !== "" && surname !== "" && role !== ""

    const updatedEmployee = {
        ...employee,
        title: title,
        firstName: firstName,
        surname: surname,
        email: email,
        role: role
    }

    async function handleSave(event) {
        if (saving || !mandatory) return
        setSaving(true)
        setSaveError("")

        try {
            const response = await fetch(
                isNew ? "/api/employee" : "/api/employee/" + employee.id,
                {
                    method: isNew ? "POST" : "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        ...updatedEmployee,
                        password: isNew ? encrypt(password) : updatedEmployee.password
                    })
                }
            )

            if (!response.ok) {
                throw new Error("Unable to save employee")
            }

            await response.json()
            navigate("/staff/employees")
        } catch (error) {
            console.error("Employee save failed", error)
            setSaveError(error.message || "Unable to save employee.")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(event) {
        if (saving || !employee.id) return
        setSaving(true)
        setSaveError("")

        try {
            const response = await fetch("/api/employee/" + employee.id, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Unable to delete employee")
            }
            navigate("/staff/employees")
        } catch (error) {
            console.error("Employee delete failed", error)
            setSaveError(error.message || "Unable to delete employee.")
            setSaving(false)
        }
    }

    function handleCancel(event) {
        navigate("/staff/employees")
    }

    return (
        <Stack direction="column">
            <StaffOnly />
            {isLoggedIn(state) && (
                <>
                    <PageTitle title="Employee Details" />
                    {saveError && <Alert severity="error">{saveError}</Alert>}
                    <FormLabel>Title</FormLabel>
                    <Select id="title" value={title} onChange={event => setTitle(event.target.value)}>
                        { titles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                    <FormLabel>First Name </FormLabel>
                    <TextField id="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} />
                    <FormLabel>Family / Surname</FormLabel>
                    <TextField id="surname" value={surname} onChange={event => setSurname(event.target.value)} />
                    <FormLabel>Email Address </FormLabel>
                    <TextField id="email" value={email} onChange={event => setEmail(event.target.value)}
                               error={!emailValid} helperText={emailError} />
                    { isNew && (
                        <Fragment>
                            <FormLabel>New Password</FormLabel>
                            <TextField id="password" value={password} type="password" onChange={event => setPassword(event.target.value)} />
                            <FormLabel>Confirm New Password</FormLabel>
                            <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={event => setConfirmPassword(event.target.value)}
                                   error={!passwordsMatch} helperText={passwordError} />
                        </Fragment>
                    )}
                    <FormLabel>Role</FormLabel>
                    <Select id="role" value={role} onChange={event => setRole(event.target.value)}>
                        { roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                    <Stack direction="row">
                        <Button onClick={handleSave} disabled={!mandatory || saving}>
                            {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button onClick={handleDelete} disabled={!deletable || saving}>Delete</Button>
                        <Button variant="outlined" onClick={handleCancel} disabled={saving}>Cancel</Button>
                    </Stack>
                </>
            )}
        </Stack>
    )
}
