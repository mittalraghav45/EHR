import {useNavigate} from "react-router-dom";
import {Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect} from "react";
import {useResource} from "react-request-hook";
import {StateContext} from "../../contexts/contexts";
import {PageTitle} from "../../components/PageTitle";
import {AlternatingTableRow} from "../../components/AlternatingTableRow";

export default function ViewEmployeesPage () {

    const { dispatch } = useContext(StateContext)

    const navigate = useNavigate()

    const [ employees, getEmployees ] = useResource(() => ({
        url: "/employee",
        method: "get"
    }))

    useEffect(getEmployees, [])

    useEffect(() => {
        if (employees && employees.error) {
            dispatch({ type: "REST_ERROR" })
        }
        if (employees && employees.data) {
            dispatch({ type: "FETCH_EMPLOYEES", employees: employees.data })
        }
    }, [employees])

    function handleAdd(event) {
        dispatch({ type: "ADD_EMPLOYEE" })
        navigate("/staff/employee")
    }

    function handleBack(event) {
        navigate("/staff/menu")
    }

    return (
        <Stack direction="column">
            <PageTitle title="View Employees" />

            <EmployeeList />
            <Stack direction="row">
                <Button onClick={handleAdd}>Add</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </Stack>
        </Stack>
    )
}

function EmployeeList() {
    const { state } = useContext(StateContext)
    const { employees } = state
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { employees.map((employee, index) => (
                        <EmployeeSummary key={'employee-' + index} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function EmployeeSummary({ index }) {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()
    const { employees } = state
    const employee = employees[index]

    function handleView(event) {
        dispatch({ type: "VIEW_EMPLOYEE", employee: employee })
        navigate("/staff/employee")
    }

    function handleResetPassword(event) {
        dispatch({ type: "RESET_EMPLOYEE_PASSWORD", employee: employee })
        navigate("/staff/employeepassword")
    }

    return (
        <AlternatingTableRow>
            <TableCell>{employee.title} { employee.firstName } { employee.surname }</TableCell>
            <TableCell>{ employee.email }</TableCell>
            <TableCell>{ employee.role }</TableCell>
            <TableCell>
                <Stack direction="row" paddingTop={0} paddingBottom={0}>
                    <Button variant="contained" onClick={ handleView }>View</Button>
                    <Button variant="contained" onClick={ handleResetPassword }>Reset Password</Button>
                </Stack>
            </TableCell>
        </AlternatingTableRow>
    )
}