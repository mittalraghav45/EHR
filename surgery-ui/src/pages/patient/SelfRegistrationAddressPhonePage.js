import {Button, Container, FormLabel, Stack, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {StateContext} from "../../contexts/contexts";

export default function SelfRegistrationAddressPhonePage () {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { register } = state
    console.log(register)

    const [ street, setStreet ] = useState(register.address.street)
    const [ line2, setLine2 ] = useState(register.address.line2)
    const [ townCity, setTownCity ] = useState(register.address.townCity)
    const [ postCode, setPostCode ] = useState(register.address.postCode)
    const [ mobile, setMobile ] = useState(register.phoneNumbers.mobile)
    const [ home, setHome ] = useState(register.phoneNumbers.home)

    const postCodeValid = postCode === "" || validator.isPostalCode(postCode, "GB")
    const postCodeError = postCodeValid ? "" : "Please enter a valid post code"

    const mandatory = street !== "" && townCity !== "" && postCode !== "" && (home !== "" || mobile !== "")

    function handleStreet(event) {
        setStreet(event.target.value)
    }

    function handleLine2(event) {
        setLine2(event.target.value)
    }

    function handleTownCity(event) {
        setTownCity(event.target.value)
    }

    function handlePostCode(event) {
        setPostCode(event.target.value)
    }

    function handleMobile(event) {
        setMobile(event.target.value)
    }

    function handleHome(event) {
        setHome(event.target.value)
    }

    function handleBack(event) {
        dispatch({ type: "REGISTER_ADDRESS_PHONE", street, line2, townCity, postCode, mobile, home })
        navigate("/register/personal")
    }
    function handleNext(event) {
        dispatch({ type: "REGISTER_ADDRESS_PHONE", street, line2, townCity, postCode, mobile, home })
        navigate("/register/consent")
    }

    return(
        <Container>
            <Typography spacing={2} color="textSecondary" variant="h4">
                Self Registration
            </Typography>
            <Typography spacing={2} color="textSecondary" variant="body1">
                Please provide your address and at least one phone number.
            </Typography>
            <Stack direction="column" spacing={1}>
                <FormLabel>Street Address </FormLabel>
                <TextField id="street" value={street} onChange={handleStreet}/>
                <FormLabel>Line 2 (optional)</FormLabel>
                <TextField id="line2" value={line2} onChange={handleLine2}/>
                <FormLabel>Town / City </FormLabel>
                <TextField id="townCity" value={townCity} onChange={handleTownCity}/>
                <FormLabel>Post Code</FormLabel>
                <TextField id="postCode" value={postCode} onChange={handlePostCode}
                    error={!postCodeValid} helperText={postCodeError} />
                <FormLabel>Mobile No.</FormLabel>
                <TextField id="mobile" value={mobile} onChange={handleMobile} />
                <FormLabel>Home Phone No.</FormLabel>
                <TextField id="home" value={home} onChange={handleHome} />
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="contained" disabled={!mandatory} onClick={handleNext}>Next</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
