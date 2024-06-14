export const initialPatient = {
    email: "",
    title: "",
    firstName: "",
    surname: "",
    gender: "",
    dateOfBirth: ""
}

export function patientReducer(state, action) {
    switch (action.type) {
        case "VIEW_PATIENT":
            return {
                ...action.patient
            }
        default:
            return state
    }
}