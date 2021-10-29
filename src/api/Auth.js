import React from 'react';
import httpRequest from '../api/HttpRequest';
import { Redirect } from 'react-router';

const API = "http://localhost:8000/api";

const login = (email, password) => {
    if (IsLogged()) {
        return <Redirect to="/aktualnosci" />;
    }
    else {
        return httpRequest.send("POST", `${API}/login`, {
            email: email,
            password: password
        })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.token));
                }
                return response.data;
            });
    }

}

const register = (login, email, password, passwordConfirmation) => {
    if (IsLogged()) {
        return <Redirect to="/logowanie" />;
    }
    else {
        return httpRequest.send("POST", `${API}/register`, {
            login: login,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        })
            .then((reponse) => {
                console.log(reponse);
            });
    }
}

const logout = () => {
    return httpRequest.send("POST", `${API}/logout`)
        .then(() => {
            localStorage.removeItem("user");
            return <Redirect to="/logowanie" />;
        }, (error) => {
            console.log(error);
        });
}

const getUser = () => {
    return httpRequest.send("GET", `${API}/user`);
}

const reset = () => {
    localStorage.removeItem("user");
}

const IsLogged = () => localStorage.getItem("user");

const exportObject = {
    login,
    IsLogged,
    logout,
    getUser,
    reset,
    register,
}
export default exportObject;