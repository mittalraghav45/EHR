import dayjs from "dayjs";

export const initialRegister = {
    status: "Pending",
    comments: "",
    patientId: null,
    email: "",
    password: "",
    title: "",
    firstName: "",
    surname: "",
    dateOfBirth: dayjs("1990/01/01"),
    gender: "",
    phoneNumbers: {
        mobile: "",
        home: ""
    },
    address: {
        street: "",
        line2: "",
        townCity: "",
        postCode: ""
    },
    consent: {
        email: false,
        sms: false,
        nextOfKin: false
    }
}

export function registrationReducer(state, action) {
    switch (action.type) {
        case "REGISTER_NAME_EMAIL":
            return {
                ...state,
                firstName: action.firstName,
                surname: action.surname,
                email: action.email,
                password: action.password
            }
        case "REGISTER_PERSONAL":
            return {
                ...state,
                title: action.title,
                dateOfBirth: action.dateOfBirth,
                gender: action.gender,
            }
        case "REGISTER_ADDRESS_PHONE":
            const address = {
                street: action.street,
                line2: action.line2,
                townCity: action.townCity,
                postCode: action.postCode
            }
            const phoneNumbers = {
                mobile: action.mobile,
                home: action.home
            }
            return {
                ...state,
                address: address,
                phoneNumbers: phoneNumbers
            }
        case "REGISTER_CONSENT":
            const consent = {
                email: action.emailConsent,
                sms: action.smsConsent,
                nextOfKin: action.nextOfKinConsent
            }
            return {
                ...state,
                consent: consent
            }
        case "APPROVE_REGISTRATION":
            const dateOfBirth = dayjs(action.register.dateOfBirth)
            return {
                ...action.register,
                dateOfBirth: dateOfBirth
            }
        case "RESET_REGISTER":
            return initialRegister
        default:
            return state
    }
}
