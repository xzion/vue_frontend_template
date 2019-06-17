<template lang="pug">
#app
    h1 {{msg}}
    keep-alive
        router-view
</template>

<style scoped>
#app {
    color: #56b983;
}
</style>

<script>
export default {
    name: "app",
    data () {
        return {
            msg: 'Welcome to the VUE JS template'
        }
    },
    methods: {
        waitSecondsAsync: async function (sec) {
            return new Promise((resolve) => {
                setTimeout(resolve, sec*1000);
            });
        },
        test: async function () {
            await this.waitSecondsAsync(2);
            console.log("Finished waiting");
        }
    }
}
</script>
