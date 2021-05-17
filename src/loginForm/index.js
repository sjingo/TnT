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
    INITIAL_FORM_STATE,
} from './../appReducer'
const LoginForm = ({ db }) => {
    const [state, dispatch] = React.useReducer(formReducer, INITIAL_FORM_STATE)
    const [formError, setFormError] = React.useState(false)
    const [formSucces, setFormSuccess] = React.useState(null)
    const handlSuccess = () => {
        setFormSuccess(true)
        setFormError(false)
        setTimeout(() => {
            window.location.href = `/`
        }, 5000)
    }
    const handleFormError = () => {
        setFormSuccess(false)
        setFormError(false)
    }
    const checkForErrors = () => {
        setFormError(false)
        let emailValid = true

        if (state.email === '' || state.emailError) {
            emailValid = false
        }
        const isValid = emailValid
        setFormError(!isValid)
        return isValid
        /* check email */
    }
    const handleSubmit = () => {
        const isValid = checkForErrors()
        if (isValid) {
            const timeStamp = Date.now()
            setFormError(false)
            const { name, mobile, email, consent, today } = state
            db.collection('TrackAndTrace')
                .doc('Hagglers')
                .update({
                    [`${today}.${name}_${timeStamp}`]: {
                        name,
                        mobile,
                        email,
                        consent,
                    },
                })
                .then(handlSuccess)
                .catch(handleFormError)
            return true
        }
    }
    const handleChange = (e, data) => {
        let { value } = data
        if (data.type === 'checkbox') {
            value = data.checked
        }
        dispatch({ type: data.name, value })
    }
    const timoutRef = React.useRef()

    React.useEffect(() => {
        clearTimeout(timoutRef.current)
        if (formSucces) {
            timoutRef.current = setTimeout(() => {
                dispatch({ type: ON_SUCCESS })
                setFormSuccess(false)
            }, 4500)
        }
    }, [formSucces])

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
                            name={NAME}
                            onChange={handleChange}
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Name"
                            value={state.name}
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
                            value={state.email}
                        />
                        <Form.Input
                            name={MOBILE}
                            onChange={handleChange}
                            fluid
                            icon="mobile"
                            iconPosition="left"
                            placeholder="Mobile"
                            value={state.mobile}
                        />
                        <Form.Field>
                            <Checkbox
                                name={MARKETING_CONSENT}
                                onChange={handleChange}
                                label="Opt-in for events and special offers"
                                checked={state.consent}
                            />
                        </Form.Field>

                        {/* <Form.Checkbox  label='remember me on this device for 90 days' placeholder='Mobile' /> */}

                        <Button color="teal" fluid size="large">
                            Save
                        </Button>
                    </Segment>
                </Form>
            </Transition>

            {formError && (
                <Message error>
                    Looks like the email address isn't valid.
                </Message>
            )}
            {formSucces && (
                <Message success size="massive">
                    Thanks for doing your bit! Order yourself a drink - happy
                    days...
                </Message>
            )}
        </>
    )
}

export default LoginForm
