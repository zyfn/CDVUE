<template>
<div class="home">
    <header class="home-header">
        <Header></Header>
    </header>
    <div class="home-bg"></div>
    <Top-nav></Top-nav>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import TopNav from '@/components/TopNav.vue'
export default {
    data() {
        return {
            time:'a'
        }
    },
    methods: {

    },
    mounted() {
        
    },
    components: {
        Header,
        TopNav
    },
}
</script>

<style>
.home {
    width: 100%;
}
.home-header{
    /* background-color:dodgerblue; */
}
.home-bg {
    margin: auto;
    width: 70%;
    height: 200px;
    background: url('../static/zf.png');
    background-size: 100% 100%;
}
</style>
