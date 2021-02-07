import React, { useState } from 'react';
import {registration} from '../../../api/index';
import './registration.scss';

const Registration = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const regBtn = () => {
        if(username.length < 3 || username.length > 15 ){
            setError('Логин должен быть от 4 до 15 символов')
        }else if (password.length < 4 || password.length > 10 ){
            setError('Пароль должен быть от 4 до 10 символов')
        }else{
            alert('Пользователь был добавлен')
            registration(username, password)
            setError('')
        }
    }

    return(
        <div className="Registration">
            <span className="error">{error}</span>
            <div className="username">
                <input onChange = {(event) => setUsername(event.target.value)} type = "text"></input>
            </div>
            <div className="password">
                <input onChange = {(event) => setPassword(event.target.value)} type = "password"></input>
            </div>
            <div className="registration_btn">
                <button onClick={() => regBtn(username, password)}>Зарегистрироваться</button>
            </div>
        </div>
    );
}

export default Registration;