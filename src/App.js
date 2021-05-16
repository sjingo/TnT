import React from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'
import useFirebase from './useFirebase'
import './App.css'
import pidge_lights from './assets/pidge_lights.png'
import tenYears from './assets/10_years_logo.png'
import Main from './views/Main'
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
                    <Main />
                </Grid.Column>
            </Grid>
        </Container>
    )
}
export default App
