class UserStore {
    constructor(Vue, options) {
        // Check for existing token in localstorage
        let localToken = localStorage.getItem('user-jwt') || '';

        // Lets make a new instance to store the data
        this.storeVM = new Vue({
            data() {
                return {
                    token: localToken === '' ? null : localToken,
                };
            },
        });
    }

    get is_authenticated() {
        return this.storeVM.$data.token != null;
    }

    get info() {
        if (this.storeVM.$data.token != null) {
            return JSON.parse(atob(this.storeVM.$data.token.split('.')[1]));
        }
        return null;
    }

    get token() {
        return this.storeVM.$data.token;
    }

    set token(t) {
        this.storeVM.$data.token = t;
    }

}


export default {
    /**
     * Install plugin
     * @param {Vue} Vue - Vue instance
     * @param {Object} options - Options for the plugin
     */
    install: (Vue, options = {}) => {
        let d = new UserStore(Vue, options);
        Vue.user = d;
        Vue.prototype.$user = d;
    },
};

// Usage: import UserStore from 'plugins/store'; Vue.use(UserStore);
