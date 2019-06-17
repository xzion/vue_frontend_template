import Vue from 'vue';
import App from './App.vue';

import router from './router';
import api from './api';

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

const apiPlugin = {
    install (Vue) {
        Vue.api = api(Vue);
        Vue.prototype.$api = api(Vue);
    }
};
Vue.use(apiPlugin);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});