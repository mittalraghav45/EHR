export const initialPrescription = {
    patientId: "",
    staffId: "",
    appointmentId: "",
    condition: "",
    medication: "",
    pharmacy: "",
};

export function prescriptionReducer(state, action) {
    switch (action.type) {
      
        case "VIEW_PRESCRIPTION":
            return {
                ...action.prescription
            }
            case "CREATE_PRESCRIPTION":
            return {
                ...initialPrescription
            }
        case "REST_ERROR":
            return "Failed to connect to the server. Please try later."
        
        default:
            return state;
    }
}
 