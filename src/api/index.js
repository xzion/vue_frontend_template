import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'production' ? `${process.env.LIVE_URL}/api/` : `http://localhost:3000/api/`);

const server = axios.create({
    baseURL: BASE_URL
});

function wrapper (Vue) {
    let api = {};

    api.test = async function () {
        Vue.$log.debug("TEST API CALL - GETTING IP ADDRESS");
        let res = await axios.get("http://ipv4.icanhazip.com");
        Vue.$log.debug("TEST COMPLETED - IP IS " + res.data);
        return res.data;
    };

    api.test_server = async function () {
        Vue.$log.debug("TESTING SERVER API");
        let res = await server.get('test');
        Vue.$log.debug("GOT RESPONSE FROM SERVER" + res.data);
        return res.data;
    };

    return api;
}



module.exports = wrapper;