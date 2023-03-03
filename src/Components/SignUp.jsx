import React from 'react'
import { useDispatch } from 'react-redux'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';


export const SignUp = () => {



    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleRegister = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.stsTokenManager.accessToken,
                }))
                navigate('/')
            })
            .catch(console.error)
    }

    return (
        <Form
            title='register'
            handleClick={handleRegister}
        />
    )
}