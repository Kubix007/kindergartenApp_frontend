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
import MyCharacter from './pages/MyCharacter';
import ColoringBook from './pages/ColoringBook';
import AdminDashboard from './pages/AdminDashboard';
import HistoryPoints from './pages/HistoryPoints';
import HistoryPointsAdmin from './pages/HistoryPointsAdmin';

const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
        if (Auth.IsLogged()) {
            if (to.meta.admin) {
                if (JSON.parse(Auth.getRole()) === "ADMIN") {
                    next();
                }
                else if (to.meta.employee) {
                    if (JSON.parse(Auth.getRole()) === "EMPLOYEE") {
                        next();
                    }
                }
                next.redirect("/aktualnosci");
            }
            else if (to.meta.user) {
                if (JSON.parse(Auth.getRole()) === "USER") {
                    next();
                }
                else if (to.meta.employee) {
                    if (JSON.parse(Auth.getRole()) === "EMPLOYEE") {
                        next();
                    }
                }
                next.redirect("/aktualnosci");
            }
            else if (to.meta.employee) {
                if (JSON.parse(Auth.getRole()) === "EMPLOYEE") {
                    next();
                }
                next.redirect("/aktualnosci");
            }
            else {
                next();
            }
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
                    <GuardedRoute exact path="/sklep" component={Shop} meta={{ auth: true, user: true, employee: true }} />
                    <GuardedRoute exact path="/zajecia" component={Activities} meta={{ auth: true }} />
                    <GuardedRoute exact path="/przedmioty" component={Myitems} meta={{ auth: true, user: true, employee: true }} />
                    <GuardedRoute exact path="/kolorowanka" component={ColoringBook} meta={{ auth: true, user: true, employee: true }} />
                    <GuardedRoute exact path="/panel" component={AdminDashboard} meta={{ auth: true, admin: true }} />
                    <GuardedRoute exact path="/postac" component={MyCharacter} meta={{ auth: true, user: true, employee: true }} />
                    <GuardedRoute exact path="/punkty" component={HistoryPoints} meta={{ auth: true, user: true }} />
                    <GuardedRoute exact path="/historia" component={HistoryPointsAdmin} meta={{ auth: true, admin: true, employee: true }} />
                    <GuardedRoute exact path="/" component={News} meta={{ auth: true }} />
                    <GuardedRoute path="*" component={Page404} />
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
}

