export const initialEmployee = {
    email: "",
    password: "",
    title: "",
    firstName: "",
    surname: "",
    role: ""
}

export function employeeReducer(state, action) {
    switch (action.type) {
        case "VIEW_EMPLOYEE":
            return {
                ...action.employee
            }
        case "RESET_EMPLOYEE_PASSWORD":
            return {
                ...action.employee
            }
        case "ADD_EMPLOYEE":
            return {
                ...initialEmployee
            }
        default:
            return state
    }
}