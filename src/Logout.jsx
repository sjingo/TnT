import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import useFirebase from './useFirebase'

const Logout = () => {
    const [loading, setLoading] = useState(false)
    const { auth } = useFirebase()
    const handleLogout = () => {
        setLoading(true)
        auth.signOut()
            .then(() => {
                setLoading(false)
                console.log('signed out')
                // Sign-out successful.
            })
            .catch((error) => {
                setLoading(false)
                // An error happened.
            })
    }
    return (
        <Button
            onClick={handleLogout}
            content="Logout"
            color="pink"
            loading={loading}
        />
    )
}
export default Logout
