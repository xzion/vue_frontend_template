<template lang="pug">
.container
    p HELLO LOGIN PAGE
    button(@click="login") LOGIN
</template>

<style scoped>

</style>

<script>
export default {
    name: "Login",
    data: function () {
        return {

        }
    },
    methods: {
        login: async function () {
            // Do the login
            try {
                await this.$api.login();
                this.$router.push('/dash');
            } catch (e) {
                this.$log.debug("Login failed");
                this.$log.debug(e);
            }
        }
    }
}
</script>

