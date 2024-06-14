export function prescriptionListReducer(state, action) {
    switch (action.type) {
        case "FETCH_PRESCRIPTION":
            console.log("FETCH_PRESCRIPTION prescriptionListReducer");
            return action.prescriptions
        default:
            return state
    }
}