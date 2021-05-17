import React from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'
import './App.css'
import pidge_lights from './assets/pidge_lights.png'
import tenYears from './assets/10_years_logo.png'
import Main from './views/Main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserLogin from './views/Optins'
const App = () => {
    return (
        <Container>
            <Image
                id="tenYears"
                src={tenYears}
                alt="Hagglers Corner is ten years old"
                onClick={() => (window.location.href = '/')}
                style={{ cursor: 'pointer' }}
            />
            <Image id="pidge_lights" src={pidge_lights} />
            <Grid
                textAlign="center"
                style={{ minHeight: '100vh', height: 'auto' }}
                verticalAlign="middle"
                stackable
            >
                <Router>
                    <Switch>
                        <Route match exact path="/optins">
                            <UserLogin />
                        </Route>
                        <Route match path="/">
                            <Main />
                        </Route>
                    </Switch>
                </Router>
            </Grid>
        </Container>
    )
}
export default App
