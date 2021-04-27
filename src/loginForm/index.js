import React from 'react'
import {
    Button,
    Checkbox,
    Form,
    Header,
    Message,
    Segment,
    Transition,
} from 'semantic-ui-react'
import formReducer, {
    EMAIL,
    NAME,
    MOBILE,
    ON_SUCCESS,
    MARKETING_CONSENT,
} from './../appReducer'
const now = new Date()
const d = now.getDate()
const m = now.getMonth() + 1
const y = now.getFullYear()
const INITIAL_FORM_STATE = {
    email: '',
    emailError: true,
    name: '',
    nameError: true,
    mobile: '',
    consent: false,
    numberInParty: '',
    today: `${d}-${m}-${y}`,
    touched: {
        name: false,
        email: false,
    },
}

const LoginForm = ({ db }) => {
    const [state, dispatch] = React.useReducer(formReducer, INITIAL_FORM_STATE)
    const [formError, setFormError] = React.useState()
    const [formSucces, setFormSuccess] = React.useState()
    const handlSuccess = () => {
        setFormSuccess(true)
        setFormError(false)
        dispatch({ type: ON_SUCCESS, state: INITIAL_FORM_STATE })
        // setTimeout(()=> {window.location.href= `https://www.facebook.com/hagglers.corner/`}, 1500)
    }
    const handleFormError = () => {
        setFormSuccess(false)
        setFormError(false)
    }
    const checkForErrors = () => !state.nameError || !state.emailError === ''
    const handleSubmit = () => {
        const isValid = checkForErrors()
        if (isValid) {
            const timeStamp = Date.now()
            setFormError(false)
            const { name, mobile, email, today } = state
            db.collection('TrackAndTrace')
                .doc('Hagglers')
                .update({
                    [`${today}.${name}_${timeStamp}`]: {
                        name,
                        mobile,
                        email,
                    },
                })
                .then(handlSuccess)
                .catch(handleFormError)
            return true
        }
        setFormError(true)
        return false
    }
    const handleChange = (e, data) => {
        setFormError(false)
        dispatch({ type: data.name, value: data.value })
    }
    return (
        <>
            <Message success={formSucces} raised size="small">
                <Message.Header>Check in</Message.Header>This form's for track
                and trace and the data will only be shared with NHS track and
                trace, if required. Opt-in for special offers, events and more
                good times.
            </Message>
            <Header as="h2" color="black" textAlign="center">
                Track and trace
            </Header>

            <Transition visible={!formSucces} animation="fade" duration={500}>
                <Form
                    size="large"
                    onSubmit={handleSubmit}
                    error={formError}
                    success={formSucces}
                >
                    <Segment stacked raised>
                        <Form.Input
                            error={
                                (formError && state.nameError) ||
                                (state.nameError && state.touched.name)
                            }
                            name={NAME}
                            onChange={handleChange}
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Name"
                        />
                        <Form.Input
                            name={EMAIL}
                            error={
                                (formError && state.emailError) ||
                                (state.emailError && state.touched.email)
                            }
                            onChange={handleChange}
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="E-mail address"
                        />
                        <Form.Input
                            name={MOBILE}
                            onChange={handleChange}
                            fluid
                            icon="mobile"
                            iconPosition="left"
                            placeholder="Mobile"
                        />
                        <Form.Field>
                            <Checkbox
                                name={MARKETING_CONSENT}
                                onChange={handleChange}
                                label="Opt-in for events and special offers"
                            />
                        </Form.Field>

                        {/* <Form.Checkbox  label='remember me on this device for 90 days' placeholder='Mobile' /> */}

                        <Button
                            color="teal"
                            fluid
                            size="large"
                            disabled={formError}
                        >
                            Save
                        </Button>
                    </Segment>
                </Form>
            </Transition>

            {formError && (
                <Message error>
                    Looks like just need some info - see errors
                </Message>
            )}
            {formSucces && (
                <Message success>
                    Thanks for doing your bit! Order yourself a drink - happy
                    days...
                </Message>
            )}
        </>
    )
}

export default LoginForm
