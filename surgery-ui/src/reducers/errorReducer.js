export function errorReducer(state, action) {
    switch (action.type) {
        case "REST_ERROR":
            return "Failed to connect to the server. Please try later."
        case "LOGIN_ERROR":
            return "Your user name and/or password were not recognised."
        default:
            return ""
    }
}