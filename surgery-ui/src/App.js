import React, { useReducer } from 'react'

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
import {initialAppointmentRequest} from "./reducers/appointmentRequestReducer";
import {initialMedHistory} from "./reducers/medicalHistoryReducer";
import {initialAppointment} from "./reducers/appointmentReducer";

 
function App() {

  const [ state, dispatch ] = useReducer(appReducer, {
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
      user: initialUser,
      patients: [],
      medhistory:initialMedHistory,
      medhistorys:[]
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Banner />
      <PageContent />
      <Footer />
    </StateContext.Provider>
  )
}

export default App;
