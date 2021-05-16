import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
const UserLogin = ({ handleAuth, loading = false }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        if (email && password) {
            handleAuth(email, password)
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Segment raised>
                <Form.Input
                    name="email"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e, data) => setEmail(data.value)}
                />
                <Form.Input
                    name="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e, data) => setPassword(data.value)}
                />
                <Button type="submit" content="Login" loading={loading} />
            </Segment>
        </Form>
    )
}
export default UserLogin
