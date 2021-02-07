import React from 'react';
import AddForm from './addForm/AddForm';
import PostsList from './postsList/PostsList';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './content.scss';
import Registration from './registration/Registration';
import Login from './login/Login';
import { useSelector } from 'react-redux';


const Content = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return(
        <BrowserRouter>
            <div className="Content">
                <Switch>
                    <Route exact path = "/" component = {PostsList} />
                    {isAuth ?
                    <Switch>
                        <Route path = "/add" component = {AddForm} />
                    </Switch>
                    :
                        <Switch> 
                            <Route path = "/registration" component = {Registration} />
                            <Route path = "/login" component = {Login} />
                        </Switch>
                    }
                    <Redirect to = "/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Content;