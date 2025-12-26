Application User Guide

Browser Entry Points

Patient Entry
• URL: http://localhost:3000/
• Component: HomePage in HomePage.js
• Description: Patient-facing entry with buttons for patient login or self-registration flow

Staff Entry
• URL: http://localhost:3000/staff/login
• Route Map: PageContent.js
• Note: No staff link is shown on the home page, so browse directly to this URL


Patient Journey

Login & Main Menu
• Login URL: /patient/login
• On successful login, users land on the Patient Menu Page (PatientMenuPage)
• Sample credentials from README.md: martin@test.com / bananas

Available Features
The patient menu provides access to the following features:

• Update Details (/patient/details)
• Request Appointment (/patient/appointmentRequest)
• View Appointments (/patient/appointments)
• Medical History (/patient/medicalhistory)
• Prescriptions (/patient/prescriptions)
• Test Details (/patient/tests)
• Log Out (returns to /)

Self-Registration Flow
All registration buttons are on-page:

1. Start: /register/start
2. Personal Info: /register/personal
3. Contact Info: /register/contact
4. Consent: /register/consent
5. Confirmation: /register/confirm
6. Submit: Returns to /

Navigation Notes
• Back buttons on patient pages always return to the patient menu
• Cancel buttons on login/registration return to /


Staff Journey

Login & Main Menu
• Login URL: /staff/login
• On successful login, users go to the Staff Menu (StaffMenuPage)
• Sample credentials from README.md: smith@lostinspace.com / pain

Available Features
The staff menu provides access to:

• Appointment Requests (/staff/appointmentRequests)
• Registration Requests (/staff/registrations)
• Search Patient (/staff/search)
• My Appointments (/staff/appointments)
• Employees (/staff/employees)
• Log Out (returns to /)

Working with Appointment Requests
1. From Appointment Requests, click "View" to open the request detail at /staff/appointmentRequest
2. Pick doctor, date, and time
3. Click "Save" to create the appointment and return

Working with Patient Search
1. From Search Patient, click "View" to open patient details at /staff/patient
2. Patient details page has buttons to jump to:
   • Medical History (/staff/medicalhistory)
   • Prescriptions (/staff/prescriptions)
   • Tests (/staff/tests)

Staff Registration
• Registration Form: /staff/register (if you need to create staff users)
• Employees and Registration Requests pages list existing records with on-page controls to view/approve









