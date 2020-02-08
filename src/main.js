import Vue from 'vue';
import App from './App.vue';

import router from './router';


import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
Vue.use(VueLogger, options);

import UserStore from './plugins/store';
Vue.use(UserStore);

import api from './api';
const apiPlugin = {
    install (Vue) {
        Vue.api = api(Vue);
        Vue.prototype.$api = api(Vue);
    }
};
Vue.use(apiPlugin);

// Global functions
Vue.mixin({
    methods: {
        logError: function (e) {
            this.$log.debug(e);
            if (e instanceof Object && e.response != null) {
                this.$log.debug(e.response);
                if (e.response.data != null && e.response.data.err != null) {
                    return e.response.data.err;
                }
            }
            return 'Something went wrong =['
        },
        waitSecondsAsync: async function (sec) {
            return new Promise((resolve) => {
                setTimeout(resolve, sec * 1000);
            });
        },
    }
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
