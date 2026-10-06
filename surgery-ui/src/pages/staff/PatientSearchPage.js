import React, { useContext, useEffect, useMemo, useState } from "react";
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
import StaffOnly, { isLoggedIn } from "../../components/StaffOnly";

export default function PatientSearchPage() {
  const { dispatch, state } = useContext(StateContext);

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

  const statePatients = state.patients || [];

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return statePatients;
    return statePatients.filter((patient) => {
      const name = `${patient.title || ""} ${patient.firstName || ""} ${patient.surname || ""}`.trim();
      return [name, patient.email, patient.dateOfBirth, patient.gender]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [searchTerm, statePatients]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <Stack direction="column">
      <PageTitle title="Search Patients" />
      <StaffOnly />

      {isLoggedIn(state) && <Stack
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
      </Stack>}

      {isLoggedIn(state) && <PatientList patients={filteredPatients}/>}
      <Stack direction="row">
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
}

function PatientList({ patients = [] }) {
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
          {patients.map((patient) => (
            <PatientSummary key={"patient-" + patient.id} patient={patient} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PatientSummary({ patient }) {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();

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
