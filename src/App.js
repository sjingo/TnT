import React from 'react'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import LoginForm from './loginForm'
import Menus from './menus'
import useFirebase from './useFirebase'
import './App.css'
import pidge_lights from './assets/pidge_lights.png'
import tenYears from './assets/10_years_logo.png'

const App = () => {
    const { db } = useFirebase()
    return (
        <Container>
            <Image id="tenYears" src={tenYears} />
            <Image id="pidge_lights" src={pidge_lights} />
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
