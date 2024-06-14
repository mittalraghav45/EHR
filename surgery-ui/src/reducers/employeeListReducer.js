export function employeeListReducer(state, action) {
    switch (action.type) {
        case "FETCH_EMPLOYEES":
            return action.employees
        default:
            return state
    }
}