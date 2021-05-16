import React from 'react'
import LoginForm from './../loginForm'
import { Divider, Grid } from 'semantic-ui-react'
import Menus from './../menus'
import useFirebase from './../useFirebase'

const Main = () => {
    const { db } = useFirebase()

    return (
        <Grid.Column style={{ maxWidth: 450 }} width={16}>
            <LoginForm db={db} />
            <Divider />
            <Menus />
            <Divider />
        </Grid.Column>
    )
}

export default Main
