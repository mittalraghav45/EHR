import {useNavigate} from "react-router-dom";
import {Button, FormLabel, Stack, TextField} from "@mui/material";
import {PageTitle} from "../../components/PageTitle";
import {useContext, useState} from "react";
import {StateContext} from "../../contexts/contexts";
import {useResource} from "react-request-hook"; 
import {today} from "../../utils/workingDays.js"
import StaffOnly, {isLoggedIn} from "../../components/StaffOnly";

export default function TestDetailsPage() {
    const navigate = useNavigate()
    const { state } = useContext(StateContext)
    const { test } = state
    const [condition, setCondition] = useState(test.condition)
    const [type, setType] = useState(test.type)
    const [time, setTime] = useState(test.time)
    const [location, setLocation] = useState(test.location)
    const [results, setResults] = useState(test.results)

    function handleCondition(event) { setCondition(event.target.value) }
    function handleType(event) { setType(event.target.value) }
    function handleTime(event) { setTime(event.target.value) }
    function handleLocation(event) { setLocation(event.target.value) }
    function handleResults(event) { setResults(event.target.value) }
    function handleBack(event) { navigate("/staff/tests") } 

    const mandatory = condition !== "" && type !== "" && time !== "" && location !== "" && results !== "";
    const isNew = state.test.id === undefined;
    const deletable = !isNew

    function handleSave(event) {
        if (isNew) createTest()
        else updateTest()
        navigate("/staff/tests");
    }
    
    const [, createTest] = useResource(() => ({
        url: "/test", method: "post",
        data: {patientId:state.patient.id, staffId:state.user.id, condition, type, date:today(), time, location, results}
    }))
    const [, deleteTest] = useResource(() => ({url: "/test/"+state.test.id, method: "delete"})) 
    const [, updateTest] = useResource(() => ({url: "test/" + state.test.id, method: "put", data: {...test,condition,type,time,location,results}}))

    function handleDelete(event) { deleteTest(); navigate("/staff/tests") } 

    return (
        <Stack direction="column">
            <StaffOnly />
            {isLoggedIn(state) && (
                <>
                    <PageTitle title="Test Details" />
                    <FormLabel>Patient Id</FormLabel>
                    <TextField id="patientId" value={state.patient.id} disabled={true}/>
                    <FormLabel>Staff Id</FormLabel>
                    <TextField id="staffId" value={state.user.id} disabled={true} />
                    <FormLabel>Condition</FormLabel>
                    <TextField id="condition" value={condition} onChange={handleCondition} />
                    <FormLabel>Type</FormLabel>
                    <TextField id="type" value={type} onChange={handleType} />
                    <FormLabel>Date</FormLabel>
                    <TextField id="date" value={today()} disabled={true} />
                    <FormLabel>Time</FormLabel>
                    <TextField id="time" value={time} onChange={handleTime} />
                    <FormLabel>Location</FormLabel>
                    <TextField id="location" value={location} onChange={handleLocation} />
                    <FormLabel>Results</FormLabel>
                    <TextField id="results" value={results} onChange={handleResults} />
                    <Stack direction="row">
                        <Button onClick={handleSave} disabled={!mandatory}>Save</Button>
                        <Button onClick={handleDelete} disabled={!deletable}>Delete</Button>
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                    </Stack>
                </>
            )}
        </Stack>
    )
}