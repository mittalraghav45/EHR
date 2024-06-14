export const initialTest = {
    patientId: "",
    staffId: "",
    appointmentId: "",
    condition: "",
    type: "",
    date: "",
    time: "",
    location: "",
    results: ""
};


export function testReducer(state, action) {
    switch (action.type) {
      
        case "VIEW_TEST":
            return {
                ...action.test
            }
            case "CREATE_TEST":
            return {
                ...initialTest
            }
        case "REST_ERROR":
            return "Failed to connect to the server. Please try later."
        
        default:
            return state;
    }
}
 