export function appointmentsReducer(state, action) {
    switch (action.type) {
        case "FETCH_APPOINTMENTS":
            return action.appointments
        default:
            return state
    }
}