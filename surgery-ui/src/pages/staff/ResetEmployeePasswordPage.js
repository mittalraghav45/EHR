import {PageTitle} from "../../components/PageTitle";
import {Button, FormLabel, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Information} from "../../components/Information";
import {useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook";
import {encrypt} from "../../utils/encrypt";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function ResetEmployeePasswordPage() {
    const navigate = useNavigate()
    const { state } = useContext(StateContext)
    const { employee } = state
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const passwordsMatch = password === confirmPassword
    const passwordError = passwordsMatch ? "" : "Passwords do not match"
    const mandatory = password !== "" && passwordsMatch

    const warning = "Warning: You are updating the password for " +
        employee.title + " " + employee.firstName + " " + employee.surname

    const [, updateEmployee] = useResource(() => ({
        url: "employee/" + employee.id,
        method: "put",
        data: {...employee, password: encrypt(password)}
    }))

    function handleUpdate() { updateEmployee(); navigate("/staff/employees") }
    function handleCancel() { navigate("/staff/employees") }

    return (
        <Stack direction="column">
            <StaffOnly />
            {isLoggedIn(state) && (
                <>
                    <PageTitle title="Reset Employee Password" />
                    <Information text={warning} />
                    <FormLabel>New Password</FormLabel>
                    <TextField id="password" value={password} type="password" onChange={event => setPassword(event.target.value)} />
                    <FormLabel>Confirm New Password</FormLabel>
                    <TextField id="confirmPassword" value={confirmPassword} type="password" onChange={event => setConfirmPassword(event.target.value)}
                               error={!passwordsMatch} helperText={passwordError} />
                    <Stack direction="row">
                        <Button disabled={!mandatory} onClick={handleUpdate}>Update</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Stack>
                </>
            )}
        </Stack>
    )
}