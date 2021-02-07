import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/user';
import './login.scss';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const isAuth = useSelector(state => state.user.isAuth)
    const [error, setError] = useState("")

    const dispatch = useDispatch();
    const pushBtnLogin = () => {
        const user = {
            username,
            password
        }
        if(!isAuth) {
            setError('Неверный логин или пароль')
        }
        dispatch(login(user))
    }

    return(
        <div className="Login">

            <span className="error">{error}</span>

            <input className="username" onChange = {(event) => setUsername(event.target.value)} type = "text"></input>

            <input className="password" onChange = {(event) => setPassword(event.target.value)}  type = "password"></input>

            <button className="login_btn" onClick={() => pushBtnLogin()}>Войти</button>

        </div>
    );
}

export default Login;