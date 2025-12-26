import { useNavigate } from "react-router-dom";
import {Button, Container, Stack, Typography, TextField, FormLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {encrypt} from "../../utils/encrypt";
import {PageTitle} from "../../components/PageTitle";

export default function StaffLoginPage() {

    const navigate = useNavigate();
    const { dispatch } = useContext(StateContext)

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const mandatory = userName !== '' && password !== ''

    const [ employee, getEmployee ] = useResource(() => ({
        // Bust caches so json-server doesn't return 304 without a body
        url: "/staff/" + userName + "/" + encrypt(password),
        method: "get"
    }))

    useEffect(() => {
        console.log(password + "=" + encrypt(password))
        if (employee && employee.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (employee && employee.data) {
            if (employee.data.length === 1) {
                const user = employee.data[0]
                const name = user.title + " " + user.firstName + " " + user.surname
                dispatch({ type: "LOGIN", id: user.id, name: name, role: user.role, email: user.email,
                    postCode: "", doctorId: -1 })
                navigate("/staff/menu")
            }
            else {
                dispatch({ type: "LOGIN_ERROR" })
            }

        }
    }, [employee])

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
        getEmployee()
    }

    return (
        <Stack direction="column">
            <PageTitle title="Staff Login" />
            <FormLabel>User Name</FormLabel>
            <TextField id="userName" value={userName} onChange={ handleUserName } />
            <FormLabel>Password</FormLabel>
            <TextField id="password" value={password} type="password" onChange={handlePassword} />
            <Stack direction="row">
                <Button disabled={ !mandatory } onClick={ handleLogin }>Log In</Button>
                <Button variant="outlined" onClick={ handleCancel }>Cancel</Button>
            </Stack>
        </Stack>
    )
}

