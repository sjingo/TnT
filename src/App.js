import React from 'react'
import { Container, Divider, Grid } from 'semantic-ui-react'
import LoginForm from './loginForm'
import Menus from './menus'
import useFirebase from './useFirebase'

const App = () => {
    const { db } = useFirebase()
    return (
        <Container>
            <Grid
                textAlign="center"
                style={{ minHeight: '100vh', height: 'auto' }}
                verticalAlign="middle"
                stackable
            >
                <Grid.Column style={{ maxWidth: 450 }} width={16}>
                    <LoginForm db={db} />
                    <Divider />
                    <Menus />
                    <Divider />
                </Grid.Column>
            </Grid>
        </Container>
    )
}
export default App
