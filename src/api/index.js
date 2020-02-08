import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'production' ? `${process.env.LIVE_URL}/api/` : `http://localhost:3000/api/`);
const server = axios.create({
    baseURL: BASE_URL
});

function wrapper (Vue) {
    // Check the userstore for existing auth tokens
    if (Vue.user.is_authenticated) {
        server.defaults.headers.common['x-access-token'] = Vue.user.token;
    }

    return {
        // Testing functions
        test: async function () {
            Vue.$log.debug("TEST API CALL - GETTING IP ADDRESS");
            let res = await axios.get("http://ipv4.icanhazip.com");
            Vue.$log.debug("TEST COMPLETED - IP IS " + res.data);
            return res.data;
        },
        test_server: async function () {
            Vue.$log.debug("TESTING SERVER API");
            let res = await server.get('test');
            Vue.$log.debug("GOT RESPONSE FROM SERVER" + res.data);
            return res.data;
        },

        // Auth
        login: async function () {
            // INSERT BACKEND AUTH CALL HERE
            let token = "abcd1234";
            // Update user store
            Vue.user.token = token;
            // Push it to localstorage
            localStorage.setItem('user-jwt', token);
            // Update the axios default header
            server.defaults.headers.common['x-access-token'] = token;
            Vue.$log.debug("Successful login");
        },
        logout: async function () {
            // Remove it from localstorage
            Vue.user.token = null;
            localStorage.removeItem('user-jwt');
            delete server.defaults.headers.common['x-access-token'];
            Vue.$log.debug("Successful logout");
        },

        send_enquiry: async function (enquiry_data) {
            Vue.$log.debug("Sending enquiry email");
            Vue.$log.debug(enquiry_data);
            let res = await server.post('send_enquiry', enquiry_data);
            return res.data;
        }
    }
}

export default wrapper;
