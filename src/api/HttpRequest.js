import axios from "axios"
import { AuthHeader } from "./AuthHeader";

const send = (httpMethod, url, data) => {
    try {
        return axios.request({
            method: httpMethod,
            url: url,
            data: data,
            headers: AuthHeader()
        });
    } catch (err) {
        throw err;
    }
}

const exportObject = {
    send,
}
export default exportObject;