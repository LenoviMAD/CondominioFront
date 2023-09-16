import axios from "axios";

const authApi = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
});

// console.log( process.env.NODE_ENV ) // TEST durante testing,

export default authApi;
