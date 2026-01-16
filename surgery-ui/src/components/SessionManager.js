import {Alert, Button} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../contexts/contexts";
import {SESSION_DURATION_MS, SESSION_WARNING_MS} from "../constants/session";

export function SessionManager() {

    const { state, dispatch } = useContext(StateContext)
    const navigate = useNavigate()

    const { user, session } = state
    const loggedIn = user && user.role && user.role !== "none"

    const [ timeLeft, setTimeLeft ] = useState(null)

    const refreshSession = useCallback(() => {
        if (!loggedIn) {
            return
        }
        const newExpiry = Date.now() + SESSION_DURATION_MS
        dispatch({ type: "SESSION_REFRESH", expiresAt: newExpiry })
        setTimeLeft(newExpiry - Date.now())
    }, [dispatch, loggedIn])

    useEffect(() => {
        if (!session.expiresAt || !loggedIn) {
            setTimeLeft(null)
            return
        }
        const updateRemaining = () => {
            const remaining = session.expiresAt - Date.now()
            setTimeLeft(remaining)
            return remaining
        }
        updateRemaining()
        const interval = setInterval(() => {
            const remaining = updateRemaining()
            if (remaining <= 0) {
                clearInterval(interval)
                const target = user.role === "patient" ? "/patient/login" : "/staff/login"
                dispatch({ type: "LOGOUT" })
                navigate(target, { state: { sessionExpired: true } })
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [session.expiresAt, dispatch, navigate, loggedIn, user.role])

    if (!loggedIn || timeLeft === null || timeLeft > SESSION_WARNING_MS) {
        return null
    }

    const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000))
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const countdown = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

    return (
        <Alert
            severity="warning"
            action={<Button color="inherit" onClick={refreshSession}>Stay Signed In</Button>}
            sx={{ mb: 2 }}
        >
            Your session will expire in { countdown }. Select "Stay Signed In" to keep working.
        </Alert>
    )
}
