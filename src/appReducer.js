export const EMAIL = 'email'
export const NAME = 'name'
export const MOBILE = 'mobile'
export const NUMBER_IN_PARTY = 'numberInParty'
export const MARKETING_CONSENT = 'marketingConsent'
export const ON_SUCCESS = 'onSuccess'
const now = new Date()
const d = now.getDate()
const m = now.getMonth() + 1
const y = now.getFullYear()
export const INITIAL_FORM_STATE = {
    email: '',
    emailError: false,
    name: '',
    nameError: true,
    mobile: '',
    consent: false,
    numberInParty: '',
    today: `${y}-${m}-${d}`,
    touched: {
        name: false,
        email: false,
    },
}

export default function formReducer(state, action) {
    switch (action.type) {
        case EMAIL:
            let email = action.value
            let emailError = !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                email
            )
            return {
                ...state,
                email,
                emailError,
                touched: {
                    ...state.touched,
                    email: true,
                },
            }
        case NAME:
            let name = action.value
            let nameError = name === ''
            return {
                ...state,
                name,
                nameError,
                touched: {
                    ...state.touched,
                    name: true,
                },
            }
        case MARKETING_CONSENT:
            let consent = action.value
            return {
                ...state,
                consent,
            }
        case MOBILE:
            var mobile = action.value
            return {
                ...state,
                mobile,
            }
        case NUMBER_IN_PARTY:
            var numberInParty = action.value
            return {
                ...state,
                numberInParty,
            }
        case ON_SUCCESS:
            return {
                email: '',
                emailError: false,
                name: '',
                nameError: true,
                mobile: '',
                consent: false,
                numberInParty: '',
                today: `${y}-${m}-${d}`,
                touched: {
                    name: false,
                    email: false,
                },
            }
        default:
            return {
                ...state,
            }
    }
}
