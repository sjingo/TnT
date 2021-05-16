import React from 'react'
import LoginForm from './../loginForm'
import { Divider } from 'semantic-ui-react'
import Menus from './../menus'
import useFirebase from './../useFirebase'

const Main = () => {
    const { db } = useFirebase()

    return (
        <>
            <LoginForm db={db} />
            <Divider />
            <Menus />
            <Divider />
        </>
    )
}

export default Main
