import { errorReducer } from "./errorReducer";
import { registrationReducer } from "./registrationReducer";
import { approvalReducer } from "./approvalReducer";
import { userReducer } from "./userReducer";
import {employeeListReducer} from "./employeeListReducer";
import {employeeReducer} from "./employeeReducer";
import { prescriptionReducer } from "./prescriptionReducer";
import { prescriptionListReducer } from "./prescriptionListReducer";
import { testListReducer } from "./testListReducer";
import { testReducer } from "./testReducer";
import { patientListReducer } from "./patientListReducer";
import { patientReducer } from "./patientReducer";
import {appointmentRequestReducer} from "./appointmentRequestReducer";
import {appointmentRequestsReducer} from "./appointmentRequestsReducer";
import { medicalHistoryReducer } from "./medicalHistoryReducer";
import { medicalHistoryListReducer } from "./medicalHistoryListReducer";
import {appointmentsReducer} from "./appointmentsReducer";
import {appointmentReducer} from "./appointmentReducer";
import {sessionReducer} from "./sessionReducer";


export default function appReducer(state, action) {
    return {
        appointment: appointmentReducer(state.appointment, action),
        appointments: appointmentsReducer(state.appointments, action),
        appointmentRequests: appointmentRequestsReducer(state.appointmentRequests, action),
        appointmentRequest: appointmentRequestReducer(state.appointmentRequest, action),
        employee: employeeReducer(state.employee, action),
        employees: employeeListReducer(state.employees, action),
        error: errorReducer(state.error, action),
        register: registrationReducer(state.register, action),
        registrations: approvalReducer(state.registrations, action),
        user: userReducer(state.user, action),
        prescription:prescriptionReducer(state.prescription,action),
        prescriptions:prescriptionListReducer(state.prescriptions,action),
        test:testReducer(state.test,action),
        tests:testListReducer(state.tests,action),
        patients: patientListReducer(state.patients,action),
        patient: patientReducer(state.patient, action),
        medhistorys:medicalHistoryListReducer(state.medhistorys,action),
        medhistory:medicalHistoryReducer(state.medhistory,action),
        session: sessionReducer(state.session, action)
    }
}
