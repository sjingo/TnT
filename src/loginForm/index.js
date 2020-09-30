import React from 'react'
import {
    Button,
    Form,
    Header,
    Message,
    Popup,
    Segment,
    Transition,
} from 'semantic-ui-react'
import formReducer, {
    EMAIL,
    NAME,
    NUMBER_IN_PARTY,
    MOBILE,
    ON_SUCCESS,
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
    const checkForErrors = () =>
        !state.nameError || !state.emailError || !state.numberInParty === ''
    const handleSubmit = () => {
        const isValid = checkForErrors()
        if (isValid) {
            const timeStamp = Date.now()
            setFormError(false)
            const { name, mobile, email, numberInParty, today } = state
            db.collection('TrackAndTrace')
                .doc('Hagglers')
                .update({
                    [`${today}.${name}_${timeStamp}`]: {
                        name,
                        mobile,
                        email,
                        numberInParty,
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
            <Message success={formSucces}>
                <Message.Header>Covid track and trace</Message.Header>We'll only
                use data from this form for Covid track and trace purposes. If
                you'd like to{' '}
                <Popup
                    size="large"
                    inverted
                    content="Hey, so the thing is... we're still working on the app. And it's not quite ready yet. We'll let people know, as soon as its fully baked"
                    trigger={<a href="#">download the app</a>}
                />{' '}
                - you can checkin with one click next time and keep up with
                hagglers' goings on.{' '}
            </Message>

            <Header as="h2" color="teal" textAlign="center">
                Track and trace
            </Header>

            <Transition visible={!formSucces} animation="fade" duration={500}>
                <Form
                    size="large"
                    onSubmit={handleSubmit}
                    error={formError}
                    success={formSucces}
                >
                    <Segment stacked>
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
                        <Form.Input
                            name={NUMBER_IN_PARTY}
                            onChange={handleChange}
                            min={0}
                            max={6}
                            fluid
                            icon="users"
                            iconPosition="left"
                            placeholder="Number in party"
                            type="number"
                        />

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
