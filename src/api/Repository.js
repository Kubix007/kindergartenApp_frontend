import HttpRequest from '../api/HttpRequest';

const API = "http://localhost:8000/api/";

const getAll = (resource) => {
    return HttpRequest.send("GET", `${API}${resource}`);
}

const getById = (resource, id) => {
    return HttpRequest.send("GET", `${API}${resource}/${id}`);
}

const add = (resource, data) => {
    return HttpRequest.send("POST", `${API}${resource}`, data);
}

const update = (resource, id, data) => {
    return HttpRequest.send("PUT", `${API}${resource}/${id}`, data);
}

const deleteRequest = (resource, id) => {
    return HttpRequest.send("DELETE", `${API}${resource}/${id}`);
}

const exportObject = {
    getAll,
    getById,
    add,
    update,
    deleteRequest,
}

export default exportObject;