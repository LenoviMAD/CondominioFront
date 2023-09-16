import axios from "axios";

const dollarApi = axios.create({
        baseURL: "https://s3.amazonaws.com/dolartoday/data.json",
});

// console.log( process.env.NODE_ENV ) // TEST durante testing,

export default dollarApi;
