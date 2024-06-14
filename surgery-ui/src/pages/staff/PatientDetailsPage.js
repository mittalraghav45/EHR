import { useNavigate } from "react-router-dom";
import {
  Button,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
} from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { useContext, useState } from "react";
import { StateContext } from "../../contexts/contexts";
import { AlternatingTableRow } from "../../components/AlternatingTableRow";

export default function PatientDetailsPage() {

  const navigate = useNavigate();
  const { state } = useContext(StateContext)
  const { patient } = state;

  const [ title, setTitle ] = useState(patient.title)
    const [ firstName, setFirstName ] = useState(patient.firstName)
    const [ surname, setSurname ] = useState(patient.surname)
    const [ email, setEmail ] = useState(patient.email)
    const [ gender, setGender ] = useState(patient.gender)
    const [ dateOfBirth, setDateOfBirth ] = useState(patient.dateOfBirth)

  function handleCancel(event) {
    navigate("/staff/search");
  }

  function handleMedicalHistory(event) {
    navigate("/staff/medicalhistory");
  }

  function handlePrescriptions(event) {
    navigate("/staff/prescriptions");
  }

  function handleTests(event) {
    navigate("/staff/tests");
  }

  function handleUpdateProfile(event) {
    //navigate("/staff/search");
  }

  return (
    <Stack direction="column">
      <PageTitle title="Patient Details" />

        <TableContainer>
          <Table>
            <TableBody>
              <AlternatingTableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{patient.title} { patient.firstName } { patient.surname }</TableCell>
              </AlternatingTableRow>
              <AlternatingTableRow>
                <TableCell>Email:</TableCell>
                <TableCell>{patient.email}</TableCell>
              </AlternatingTableRow>
              <AlternatingTableRow>
                <TableCell>Gender:</TableCell>
                <TableCell>{patient.gender}</TableCell>
              </AlternatingTableRow>
              <AlternatingTableRow>
                <TableCell>Date Of Birth:</TableCell>
                <TableCell>{dateOfBirth}</TableCell>
              </AlternatingTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      
      <Stack direction="row">
        <Button onClick={handleMedicalHistory}>View Medical History</Button>
        <Button onClick={handlePrescriptions}>View Prescriptions</Button>
        <Button onClick={handleTests}>View Tests</Button>
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        
      </Stack>
    </Stack>
  );
}
