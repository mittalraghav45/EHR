export const initialAppointmentRequest = {}

export function appointmentRequestReducer(state, action) {
    switch (action.type) {
        case "VIEW_APPOINTMENT_REQUEST":
            return {
                ...action.appointmentRequest
            }
        default:
            return state
    }
}