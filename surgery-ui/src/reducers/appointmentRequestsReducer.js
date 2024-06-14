export function appointmentRequestsReducer(state, action) {
    switch (action.type) {
        case "FETCH_APPOINTMENT_REQUESTS":
            return action.appointmentRequests
        default:
            return state
    }
}