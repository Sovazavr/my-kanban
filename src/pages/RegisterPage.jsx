import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div>
        <h1>Регистрация</h1>
        <p>Если у вас уже есть аккаунт: <Link to="/login">войти</Link></p>
    </div>
  )
}

export default RegisterPage