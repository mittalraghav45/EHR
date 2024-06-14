export function patientListReducer(state, action) {
    switch (action.type) {
        case "FETCH_PATIENTS":
            return action.patients
        default:
            return state
    }
}