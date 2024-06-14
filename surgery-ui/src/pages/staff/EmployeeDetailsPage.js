import {useNavigate} from "react-router-dom";
import {Button, FormLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {Fragment, useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook";
import {roles, titles} from "../../utils/dropdownLists";
import validator from "validator/es";
import {encrypt} from "../../utils/encrypt";

export default function EmployeeDetailsPage() {

    const navigate = useNavigate()
    const { state, dispatch } = useContext(StateContext)
    const { employee } = state

    const [ title, setTitle ] = useState(employee.title)
    const [ firstName, setFirstName ] = useState(employee.firstName)
    const [ surname, setSurname ] = useState(employee.surname)
    const [ email, setEmail ] = useState(employee.email)
    const [ password, setPassword ] = useState(employee.password)
    const [ confirmPassword, setConfirmPassword ] = useState(employee.password)
    const [ role, setRole ] = useState(employee.role)

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

    const [ , createEmployee ] = useResource(() => ({
        url: "employee",
        method: "post",
        data: { ...updatedEmployee, password: encrypt(password) }
    }))

    const [ , deleteEmployee ] = useResource(() => ({
        url: "employee/" + employee.id,
        method: "delete"
    }))

    const [ , updateEmployee ] = useResource(() => ({
        url: "employee/" + employee.id,
        method: "put",
        data: updatedEmployee
    }))
    
    function handleTitle(event) {
        setTitle(event.target.value)
    }

    function handleFirstName(event) {
        setFirstName(event.target.value)
    }

    function handleSurname(event) {
        setSurname(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)
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

    function handleSave(event) {
        if (isNew) {
            createEmployee()
        } else {
            updateEmployee()
        }
        navigate("/staff/employees")
    }

    function handleDelete(event) {
        deleteEmployee()
        navigate("/staff/employees")
    }

    function handleCancel(event) {
        navigate("/staff/employees")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Employee Details" />
            <FormLabel>Title</FormLabel>
            <Select id="title" value={title} onChange={handleTitle}>
                { titles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            <FormLabel>First Name </FormLabel>
            <TextField id="firstName" value={firstName} onChange={handleFirstName} />
            <FormLabel>Family / Surname</FormLabel>
            <TextField id="surname" value={surname} onChange={handleSurname} />
            <FormLabel>Email Address </FormLabel>
            <TextField id="email" value={email} onChange={handleEmail}
                       error={!emailValid} helperText={emailError} />
            { isNew && (
                <Fragment>
                    <FormLabel>New Password</FormLabel>
                    <TextField id="password" value={password} type="password" onChange={handlePassword} />
                    <FormLabel>Confirm New Password</FormLabel>
                    <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={handleConfirmPassword}
                           error={!passwordsMatch} helperText={passwordError} />
                </Fragment>
                )
            }
            <FormLabel>Role</FormLabel>
            <Select id="role" value={role} onChange={handleRole}>
                { roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            <Stack direction="row">
                <Button onClick={ handleSave } disabled={ !mandatory }>Save</Button>
                <Button onClick={ handleDelete } disabled={ !deletable }>Delete</Button>
                <Button variation="outlined" onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Stack>
    )
}