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
        
        default:
            return state;
    }
}
 
