<template lang="pug">
#mainblock
    h3 This is the index page
    router-link(to="/about") About Page
    br
    a(href='#' @click="test_api") Test API (get IP address)
    p Your IP address is {{ip_address}}
    br
    a(href='#' @click="test_server") Test Server API (GET /test)
    p Your server response: {{server_response}}
    br
    button(@click="logout") LOGOUT

</template>

<script>
export default {
    name: "Index",
    data () {
        return {
            ip_address: "N/A",
            server_response: "N/A"
        }
    },
    methods: {
        test_api: async function () {
            try {
                this.ip_address = await this.$api.test();
            } catch (e) {
                this.$log.error("ERROR GETTING IP ADDRESS!");
                this.$log.error(e);
                this.ip_address = "ERROR";
            }
        },
        test_server: async function () {
            try {
                this.server_response = await this.$api.test_server();
            } catch (e) {
                this.$log.error("Error calling server /test route");
                this.$log.error(e);
                this.server_response = "ERROR";
            }
        },
        logout: async function () {
            try {
                await this.$api.logout();
                this.$router.push('/');
            } catch (e) {
                this.$log.debug("Logout failed");
                this.$log.debug(e);
            }

        }
    }
}
</script>

<style scoped>

</style>
