import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/user';
import './userbar.scss'

const Userbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    return(
        <div className="Userbar">
            
            <div className="user">
            {isAuth ?
                <p>Вы вошли под ником {user.nickname}</p>
            :
                <p>Добро пожаловать на сайт</p>
            }
            </div>

            {!isAuth ?
            <div className="auth">
                <div className="registration">
                    <a href = "/registration">Регистрация</a>
                </div>
                <div className="login">       
                    <a href = "/login">Войти</a>
                </div> 
            </div>
            :
            <div className="logout">       
                <span onClick = {()=>dispatch(logout())}>Выйти</span>
            </div> 
            }
        </div>
    );
};

export default Userbar;