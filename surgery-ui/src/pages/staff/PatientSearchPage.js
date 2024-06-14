import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useResource } from "react-request-hook";
import { AlternatingTableRow } from "../../components/AlternatingTableRow";
import { StateContext } from "../../contexts/contexts";

export default function PatientSearchPage() {
  const { dispatch } = useContext(StateContext);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [patients, getPatients] = useResource(() => ({
    url: "/patient",
    method: "get",
  }));

  useEffect(getPatients, []);

  useEffect(() => {
    if (patients && patients.error) {
      dispatch({ type: "REST_ERROR" });
    }
    if (patients && patients.data) {
      dispatch({ type: "FETCH_PATIENTS", patients: patients.data });
    }
  }, [patients]);

  function handleBack(event) {
    navigate("/staff/menu");
  }

  const handleSearch = () => {
    console.log("Helllooooo");
  };

  console.log(searchTerm);

  return (
    <Stack direction="column">
      <PageTitle title="Search Patients" />

      <Stack
        direction="row"
        paddingTop={5}
        paddingBottom={5}
        justifyContent={"right"}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      <PatientList/>
      <Stack direction="row">
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
}

function PatientList() {
  const { state } = useContext(StateContext);
  const { patients } = state;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient, index) => (
            <PatientSummary key={"patient-" + index} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PatientSummary({ index }) {
  const { state, dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  const { patients } = state;
  const patient = patients[index];

  function handleView(event) {
    dispatch({ type: "VIEW_PATIENT", patient: patient });
    navigate("/staff/patient");
  }

  return (
    <AlternatingTableRow>
      <TableCell>
        {patient.title} {patient.firstName} {patient.surname}
      </TableCell>
      <TableCell>{patient.email}</TableCell>
      <TableCell>{patient.gender}</TableCell>
      <TableCell>{patient.dateOfBirth}</TableCell>
      <TableCell>
        <Stack direction="row" paddingTop={0} paddingBottom={0}>
          <Button variant="contained" onClick={handleView}>
            View
          </Button>
        </Stack>
      </TableCell>
    </AlternatingTableRow>
  );
}
