import React from 'react'
import firebase,{firebaseConfig} from './firebase-config'

const useFirebase =()=>{
    // Initialize Firebase
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth()
    const db = firebase.firestore()

    window.auth = auth
    window.db = db
    window.firebase = firebase

    return{
        firebase,
        auth,
        db,
    }

}

export default useFirebase