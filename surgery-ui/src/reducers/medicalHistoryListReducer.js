export const initialMedHistory = {
    id: "",
    patientId: "",
    staffId: "",
    date: "",
    summary:"",
    details: "",  
}


export function medicalHistoryListReducer(state, action) {
    switch (action.type) {
        case "FETCH_MEDHISTORY":
            return action.medhistorys
        
        default:
            return state
    }
}