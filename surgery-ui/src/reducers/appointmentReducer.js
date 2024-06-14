export const initialAppointment = {}

export function appointmentReducer(state, action) {
    switch (action.type) {
        case "VIEW_APPOINTMENT":
            return {
                ...action.appointment
            }
        default:
            return state
    }
}