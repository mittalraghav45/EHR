import React, { useEffect, useReducer } from 'react'

import './App.css';
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
import { PageContent } from "./components/PageContent";

import { StateContext } from "./contexts/contexts"
import appReducer from "./reducers/reducers";
import { initialRegister } from "./reducers/registrationReducer";
import { initialUser } from "./reducers/userReducer";
import { initialEmployee} from "./reducers/employeeReducer";
import { initialPrescription } from './reducers/prescriptionReducer';
import { initialTest } from './reducers/testReducer';
import { initialPatient } from "./reducers/patientReducer";
import {initialAppointmentRequest} from "./reducers/appointmentRequestReducer";
import {initialMedHistory} from "./reducers/medicalHistoryReducer";
import {initialAppointment} from "./reducers/appointmentReducer";

 
function App() {

  const persistedUser = (() => {
      if (typeof window === "undefined") return initialUser;
      try {
          const stored = localStorage.getItem("user");
          return stored ? JSON.parse(stored) : initialUser;
      } catch (e) {
          return initialUser;
      }
  })();

  const initialState = {
      appointment: initialAppointment,
      appointments: [],
      appointmentRequest: initialAppointmentRequest,
      appointmentRequests: [],
      employee: initialEmployee,
      employees: [],
      prescriptions: [],
      prescription: initialPrescription,
      tests: [],
      test: initialTest,
      error: '',
      register: initialRegister,
      registrations: [],
      user: persistedUser,
      patient: initialPatient,
      patients: [],
      medhistory:initialMedHistory,
      medhistorys:[]
  }

  const [ state, dispatch ] = useReducer(appReducer, initialState)

  useEffect(() => {
      try {
          localStorage.setItem("user", JSON.stringify(state.user));
      } catch (e) {
          // Ignore storage failures (e.g., private mode)
      }
  }, [state.user])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Banner />
      <PageContent />
      <Footer />
    </StateContext.Provider>
  )
}

export default App;
