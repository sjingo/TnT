import React, { useEffect, useState } from 'react'
import UserLogin from './../user-login'
import OptinsData from './../optins-data'
import Logout from './../Logout'
import useFirebase from './../useFirebase'

const Optins = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [error, setError] = useState(null)
    const { auth, db } = useFirebase()

    const handleAuth = (email, password) => {
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user
                console.log('logged in')
                if (user) {
                    setUser(user)
                } else {
                    setUser(false)
                }
                setLoading(false)

                // ...
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                setLoading(false)
            })
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                setUser(false)
            }
        })
    }, [auth, user])
    return (
        <>
            {!user && (
                <UserLogin
                    auth={auth}
                    handleAuth={handleAuth}
                    loading={loading}
                />
            )}
            {user && <Logout />}
            {user && <OptinsData db={db} />}
        </>
    )
}
export default Optins
