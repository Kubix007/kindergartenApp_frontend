import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Auth from './api/Auth';
import Page404 from './pages/Page404';
import Navbar from './components/Navbar';
import News from './pages/News';
import Shop from './pages/Shop';
import Activities from './pages/Activities';
import Myitems from './pages/MyItems';
import ColoringBook from './pages/ColoringBook';

const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
        if (Auth.IsLogged()) {
            next();
        }
        next.redirect('/logowanie');
    } else if (to.meta.guestOnly) {
        if (!Auth.IsLogged()) {
            next();
        }
        next.redirect("/aktualnosci");
    } else {
        next();
    }

};

export const Router = () => {
    return (
        <BrowserRouter>
            <GuardProvider guards={[requireLogin]}>
                {Auth.IsLogged() ? <Navbar /> : null}
                <Switch>
                    <GuardedRoute exact path="/logowanie" component={Login} meta={{ guestOnly: true }} />
                    <GuardedRoute exact path="/rejestracja" component={Register} meta={{ guestOnly: true }} />
                    <GuardedRoute exact path="/aktualnosci" component={News} meta={{ auth: true }} />
                    <GuardedRoute exact path="/sklep" component={Shop} meta={{ auth: true }} />
                    <GuardedRoute exact path="/zajecia" component={Activities} meta={{ auth: true }} />
                    <GuardedRoute exact path="/przedmioty" component={Myitems} meta={{ auth: true }} />
                    <GuardedRoute exact path="/kolorowanka" component={ColoringBook} meta={{ auth: true }} />
                    <GuardedRoute exact path="/" component={News} meta={{ auth: true }} />
                    <GuardedRoute path="*" component={Page404} />
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
}

