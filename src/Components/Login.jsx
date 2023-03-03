import React from 'react'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
export const Login = () => {



    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleLogin = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            console.log(user);
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.stsTokenManager.accessToken,
            }))
            navigate('/')
        })
        .catch(()=>alert('Invalid login or password'))
    }

    return (
        <Form 
            title='sign in'
            handleClick={handleLogin}
        />
    )
}
