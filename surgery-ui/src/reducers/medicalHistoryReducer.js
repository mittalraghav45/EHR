export const initialMedHistory = {    
    patientId: "",
    staffId: "",
    date: "",
    summary:"",
    details: "", 
}
export function medicalHistoryReducer(state, action) {
    switch (action.type) {
        case "VIEW_MEDHISTORY":
            return {
                ...action.medhistory
            }
        case "CREATE_MEDHISTORY": 
            return {
                ...initialMedHistory
            }
        
        default:
            return state
    }
}