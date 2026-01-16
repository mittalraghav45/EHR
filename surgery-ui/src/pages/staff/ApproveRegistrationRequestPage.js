import {useNavigate} from "react-router-dom";
import {Button, Container, FormLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook";
import {Registration} from "../../components/Registration";

export default function ApproveRegistrationRequestPage () {

    const title = 'Cloud Surgery Approve Registration Request'
    useEffect(() => { document.title = title; }, [])

    const { state, dispatch } = useContext(StateContext)
    const { register, employees } = state
    const navigate = useNavigate()

    const [ comments, setComments ] = useState(register.comments)
    const [ doctor, setDoctor ] = useState(-1)

    const rejectMandatory = comments !== ""
    const approveMandatory = doctor !== -1

    const doctors = employees.filter(employee => employee.role === "Doctor")

    const [ , updateRegistration ] = useResource(() => ({
        url: "registration/" + register.id,
        method: "put",
        data: {
            ...register,
            comments: comments,
            status: "Rejected"
        }
    }))

    const [ , deleteRegistration ] = useResource(() => ({
        url: "registration/" + register.id,
        method: "delete"
    }))

    const [ , upsertPatient ] = useResource((data) => {
        if (register.patientId) {
            return {
                url: "patient/" + register.patientId,
                method: "put",
                data: {
                    ...data,
                    id: register.patientId
                }
            }
        }
        return {
            url: "patient",
            method: "post",
            data: data
        }
    })

    function handleComments(event) {
        setComments(event.target.value)
    }

    function handleDoctor(event) {
        setDoctor(event.target.value)
    }

    function handleApprove(event) {
        const staff = doctors[doctor]
        const data = {
            email: register.email,
            password: register.password,
            title: register.title,
            firstName: register.firstName,
            surname: register.surname,
            dateOfBirth: register.dateOfBirth.format("DD/MM/YYYY"),
            gender: register.gender,
            phoneNumbers: register.phoneNumbers,
            staffId: staff.id,
            staffName: staff.title + " " + staff.firstName + " " + staff.surname,
            address: register.address,
            consent: register.consent,
            patientStatus: "Active"
        }
        upsertPatient(data)
        deleteRegistration()
        navigate("/staff/registrations")
    }

    function handleReject(event) {
        updateRegistration()
        navigate("/staff/registrations")
    }

    function handleCancel(event) {
        navigate("/staff/registrations")
    }

    return (
        <Container>
            <Typography spacing={1} margin={1} color="textSecondary" variant="h4">{ title }</Typography>
            <Stack direction="column" spacing={1} margin={1}>
                <Registration registration={ register } />
                <FormLabel>Register With</FormLabel>
                <Select id="doctor" value={doctor} onChange={handleDoctor}>
                    <MenuItem key={ -1 } value={ -1 }>Please select...</MenuItem>
                    { doctors.map((doctor, index) => (
                        <MenuItem key={ doctor.id } value={ index }>
                            { doctor.title + " " + doctor.firstName + " " + doctor.surname }
                        </MenuItem>
                    ))}
                </Select>
                <FormLabel>Comments</FormLabel>
                <TextField id="comments" value={comments} onChange={handleComments} multiline rows={4} />
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" disabled={ !approveMandatory } onClick={handleApprove}>Approve</Button>
                    <Button variant="contained" onClick={handleReject} disabled={ !rejectMandatory }>Reject</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
