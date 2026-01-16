// Patient Pages

import AppointmentRequestPage from "../pages/patient/AppointmentRequestPage";
import HomePage from "../pages/patient/HomePage";
import PatientLoginPage from "../pages/patient/PatientLoginPage";
import PatientMenuPage from "../pages/patient/PatientMenuPage";
import PersonalDetailsPage from "../pages/patient/PersonalDetailsPage";
import SelfRegistrationAddressPhonePage from "../pages/patient/SelfRegistrationAddressPhonePage";
import SelfRegistrationConfirmPage from "../pages/patient/SelfRegistrationConfirmPage";
import SelfRegistrationConsentPage from "../pages/patient/SelfRegistrationConsentPage";
import SelfRegistrationNameEmailPage from "../pages/patient/SelfRegistrationNameEmailPage"
import SelfRegistrationPersonalDetailsPage from "../pages/patient/SelfRegistrationPersonalDetailsPage";
import ViewAppointmentsPage from "../pages/patient/ViewAppointmentsPage";
import ViewMedicalHistoryPage from "../pages/patient/ViewMedicalHistoryPage";
import ViewPrescriptionsPage from "../pages/patient/ViewPrescriptionsPage";
import ViewTestsPage from "../pages/patient/ViewTestsPage";
import ForgotPasswordPage from "../pages/patient/ForgotPasswordPage";
import ResetPasswordPage from "../pages/patient/ResetPasswordPage";

// Staff Pages

import AppointmentRequestDetailsPage from "../pages/staff/AppointmentRequestDetailsPage";
import CalendarPage from "../pages/staff/CalendarPage";
import EmployeeDetailsPage from "../pages/staff/EmployeeDetailsPage";
import MedicalHistoryPage from "../pages/staff/MedicalHistoryPage";
import MedicalHistoryDetails from "../pages/staff/MedicalHistoryDetails";
import PatientDetailsPage from "../pages/staff/PatientDetailsPage";
import PrescriptionsPage from "../pages/staff/PrescriptionsPage";
import StaffLoginPage from "../pages/staff/StaffLoginPage";
import StaffMenuPage from "../pages/staff/StaffMenuPage";
import TestDetailsPage from "../pages/staff/TestDetailsPage";
import ViewTestPage from "../pages/staff/ViewTestPage";
import RegistrationPage from "../pages/staff/RegistrationPage";
import PatientSearchPage from "../pages/staff/PatientSearchPage";
import ViewPrescriptionPage from "../pages/staff/ViewPrescriptionPage";
import PrescriptionDetailsPage from "../pages/staff/PrescriptionDetailsPage";
import ResetEmployeePasswordPage from "../pages/staff/ResetEmployeePasswordPage";
import ViewEmployeesPage from "../pages/staff/ViewEmployeesPage";
import ViewRegistrationRequestsPage from "../pages/staff/ViewRegistrationRequestsPage";
import ApproveRegistrationRequestPage from "../pages/staff/ApproveRegistrationRequestPage";
import ViewAppointmentRequestsPage from "../pages/staff/ViewAppointmentRequestsPage";

import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import {Container} from "@mui/material";
import TodaysAppointmentsPage from "../pages/staff/TodaysAppointmentsPage";
import AppointmentDetailsPage from "../pages/staff/AppointmentDetailsPage";

export function PageContent() {
    return (
        <Container>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/patient/register" element={<Navigate to="/register/start" replace />} />
                    <Route path="/patient/appointmentRequest" element={<AppointmentRequestPage />} />
                    <Route path="/patient/appointments" element={<ViewAppointmentsPage />} />
                    <Route path="/patient/details" element={<PersonalDetailsPage />} />
                    <Route path="/patient/login" element={<PatientLoginPage />} />
                    <Route path="/patient/medicalhistory" element={<ViewMedicalHistoryPage />} />
                    <Route path="/patient/menu" element={<PatientMenuPage />} />
                    <Route path="/patient/prescriptions" element={<ViewPrescriptionsPage />} />
                    <Route path="/patient/tests" element={<ViewTestsPage />} />
                    <Route path="/patient/password/forgot" element={<ForgotPasswordPage />} />
                    <Route path="/patient/password/reset" element={<ResetPasswordPage />} />
                    <Route path="/register/confirm" element={<SelfRegistrationConfirmPage />} />
                    <Route path="/register/consent" element={<SelfRegistrationConsentPage />} />
                    <Route path="/register/contact" element={<SelfRegistrationAddressPhonePage />} />
                    <Route path="/register/personal" element={<SelfRegistrationPersonalDetailsPage />} />
                    <Route path="/staff/appointment" element={<AppointmentDetailsPage />} />                    <Route path="/register/start" element={<SelfRegistrationNameEmailPage />} />
                    <Route path="/staff/appointments" element={<TodaysAppointmentsPage />} />
                    <Route path="/staff/appointmentRequest" element={<AppointmentRequestDetailsPage />} />
                    <Route path="/staff/appointmentRequests" element={<ViewAppointmentRequestsPage />} />
                    <Route path="/staff/calendar" element={<CalendarPage />} />
                    <Route path="/staff/employee" element={<EmployeeDetailsPage />} />
                    <Route path="/staff/employeepassword" element={<ResetEmployeePasswordPage />} />
                    <Route path="/staff/employees" element={<ViewEmployeesPage />} />
                    <Route path="/staff/login" element={<StaffLoginPage />} />
                    <Route path="/staff/register" element={<RegistrationPage />} />
                    <Route path="/staff/menu" element={<StaffMenuPage />} />
                    <Route path="/staff/registrations" element={<ViewRegistrationRequestsPage />} />
                    <Route path="/staff/approve" element={<ApproveRegistrationRequestPage />} />
                    <Route path="/staff/prescriptions" element={<ViewPrescriptionPage />} />
                    <Route path="/staff/prescriptiondetail" element={<PrescriptionDetailsPage />} /> 
                    <Route path="/staff/search" element={<PatientSearchPage />} />
                    <Route path="/staff/patient" element={<PatientDetailsPage />} />

                    {/* Medical Tests */}
                    <Route path="/staff/tests" element={<ViewTestPage />} />
                    <Route path="/staff/testdetail" element={<TestDetailsPage />} />
                    <Route path="/staff/medicalhistory" element={<MedicalHistoryPage />} />
                    <Route path="/staff/medicalhistorydetail" element={<MedicalHistoryDetails />} />
                </Routes>
            </Router>
        </Container>
    )
}
