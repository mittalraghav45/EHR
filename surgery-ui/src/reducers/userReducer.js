export const initialUser = {
    id: -1,
    name: "",
    role: "none"
}

export function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                id: action.id,
                name: action.name,
                role: action.role,
                email: action.email,
                postCode: action.postCode,
                doctorId: action.doctorId
            }
        case "LOGOUT":
            return initialUser
        default:
            return state
    }
}