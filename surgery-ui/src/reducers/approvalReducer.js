export function approvalReducer(state, action) {
    switch (action.type) {
        case "FETCH_REGISTRATIONS":
            console.log("Fetch registrations")
            return action.registrations
        default:
            return state
    }
}