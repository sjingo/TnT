export const EMAIL = 'email'
export const NAME = 'name'
export const MOBILE = 'mobile'
export const NUMBER_IN_PARTY = 'numberInParty'
export const MARKETING_CONSENT = 'marketingConsent'
export const ON_SUCCESS = 'onSuccess'

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
            let consent = action.payload
            console.log(consent)
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
            var newState = action.state
            return {
                ...newState,
            }
        default:
            return {
                ...state,
            }
    }
}
