import {PageTitle} from "../../components/PageTitle";
import {Button, FormLabel, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Information} from "../../components/Information";
import {useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook";
import {encrypt} from "../../utils/encrypt";

export default function ResetEmployeePasswordPage() {

    const navigate = useNavigate()
    const { state } = useContext(StateContext)
    const { employee } = state

    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const passwordsMatch = (password === confirmPassword)
    const passwordError = passwordsMatch ? "" : "Passwords do not match"
    const mandatory = password !== "" && passwordsMatch

    const warning = "Warning: You are updating the password for " +
        employee.title + " " + employee.firstName + " " + employee.surname + "."

    const [ , updateEmployee ] = useResource(() => ({
        url: "employee/" + employee.id,
        method: "put",
        data: { ...employee, password: encrypt(password) }
    }))

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

    function handleCancel(event) {
        navigate("/staff/employees")
    }

    function handleUpdate(event) {
        updateEmployee()
        navigate("/staff/employees")
    }

    return (
        <Stack direction="column">
            <PageTitle title="Reset Employee Password" />
            <Information text={ warning } />
            <FormLabel>New Password </FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} />
            <FormLabel>Confirm New Password</FormLabel>
            <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={handleConfirmPassword}
                       error={!passwordsMatch} helperText={passwordError} />
            <Stack direction="row">
                <Button disabled={ !mandatory } onClick={handleUpdate}>Update</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Stack>
    )
}