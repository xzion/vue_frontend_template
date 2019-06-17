import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Index from '../components/Index';
import About from '../components/About';
import NotFound from '../components/NotFound';

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: NotFound
    }
];

export default new Router({
    mode: 'history',
    routes
});