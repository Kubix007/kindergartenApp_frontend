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
                    localStorage.setItem("role", JSON.stringify(response.data.user.role));
                    localStorage.setItem("id", JSON.stringify(response.data.user.id));
                }
                return response.data;
            });
    }

}

const register = (login, email, firstName, surname, parentsFirstName, parentsSurname, parentsPhone, town, street, password, passwordConfirmation) => {
    if (IsLogged()) {
        return <Redirect to="/aktualnosci" />;
    }
    else {
        return httpRequest.send("POST", `${API}/register`, {
            login: login,
            email: email,
            first_name: firstName,
            surname: surname,
            parents_first_name: parentsFirstName,
            parents_surname: parentsSurname,
            parents_phone: parentsPhone,
            town: town,
            street: street,
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
            localStorage.removeItem("role");
            localStorage.removeItem("id");
            return <Redirect to="/logowanie" />;
        }, (error) => {
            console.log(error);
        });
}

const getUser = () => {
    return httpRequest.send("GET", `${API}/user`);
}

const getUserRole = () => {
    return httpRequest.send("GET", `${API}/user`);
}

const reset = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
}

const IsLogged = () => localStorage.getItem("user");

const getRole = () => localStorage.getItem("role");

const getUserId = () => localStorage.getItem("id");

const exportObject = {
    login,
    IsLogged,
    logout,
    getUser,
    reset,
    register,
    getUserRole,
    getRole,
    getUserId,
}
export default exportObject;