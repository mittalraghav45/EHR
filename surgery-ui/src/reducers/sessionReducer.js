import {SESSION_DURATION_MS} from "../constants/session";

export const initialSession = {
    expiresAt: null
}

export function sessionReducer(state, action) {
    switch (action.type) {
        case "SESSION_REFRESH":
            return {
                expiresAt: action.expiresAt ?? Date.now() + SESSION_DURATION_MS
            }
        case "LOGOUT":
            return initialSession
        default:
            return state
    }
}
