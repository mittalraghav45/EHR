import {useContext} from "react";
import {StateContext} from "../../contexts/contexts";
import {useNavigate} from "react-router-dom";
import {Registration} from "../../components/Registration";
import {Button, Container, Stack, Typography} from "@mui/material";
import {encrypt} from "../../utils/encrypt";
import {useResource} from "react-request-hook";
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function SelfRegistrationConfirmPage () {
    const { state } = useContext(StateContext)
    const navigate = useNavigate()
    const { register } = state

    const [ , createRegistration ] = useResource((data) => ({
        url: '/employee', method: 'post', data: data
    }))

    function handleBack(event) { navigate("/staff/viewregistrations") }
    function handleSubmit(event) {
        const hashed = encrypt(register.password)
        createRegistration({...register, password: hashed})
        navigate("/")
    }

    return (
        <>
            <StaffOnly />
            {isLoggedIn(state) && (
                <Container>
                    <Typography spacing={2} color="textSecondary" variant="h4">Staff Registration</Typography> 
                    <Stack direction="column" spacing={1}>
                        <Registration registration={register} />
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" onClick={handleBack}>Back</Button>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Stack>
                    </Stack>
                </Container>
            )}
        </>
    )
}