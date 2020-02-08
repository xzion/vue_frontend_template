import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Index from '../components/Index';
import About from '../components/About';
import NotFound from '../components/NotFound';
import Login from '../components/Login';

const ifNotAuthenticated = (to, from, next) => {
    if (!Vue.user.is_authenticated) {
        next();
    } else {
        next('/dash');
    }
};

const ifAuthenticated = (to, from, next) => {
    if (Vue.user.is_authenticated) {
        next();
    } else {
        next('/');
    }
};

const routes = [
    {
        path: '/dash',
        component: Index,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/about',
        component: About,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '*',
        component: NotFound,
        beforeEnter: ifAuthenticated
    }
];

export default new Router({
    mode: 'history',
    routes
});
