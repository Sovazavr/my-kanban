import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div>
            <h1>Login</h1>
            <p>Или <Link to='/register'>зарегистрируйтесь</Link></p>
        </div>
    )
}

export default LoginPage