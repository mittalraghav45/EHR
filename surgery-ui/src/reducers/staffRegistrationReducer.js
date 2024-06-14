
export const initialRegister = {     
    email: "",
    password: "",
    role: "",
    firstName: "",
    surname: "",    
     
}

export function staffRegistrationReducer(state, action) {
    switch (action.type) {
        case "REGISTER_STAFF":
              
            return {
                ...state,
                firstName: action.firstName,
                surname: action.surname,
                email: action.email,
                password: action.password,
                role:action.role
            }       
                        
        default:
            return state
    }
}