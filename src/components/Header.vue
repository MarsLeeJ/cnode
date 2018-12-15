<template>
    <div class="header clearfix">
        <router-link :to="{name:'root'}"><img src="../assets/cnodejs_light.svg" alt=""></router-link>
        <ul>
            <li><router-link :to="{name:'root'}">首页</router-link></li>
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.clearfix::after {
    content: '';
    display: block;
    clear: both;
}
.header{
    background-color: rgb(68,68,68);
}
img {
    height: 26px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 60px;
}
ul {
    float: right;
    margin-right: 65px;
}
li {
    list-style: none;
    display: inline-block;
}
a {
    height: 50px;
    line-height: 50px;
    text-decoration: none;
    color: rgb(204,204,204);
    font-size: 14px;
    display: inline-block;
    padding: 0 13px;
}
</style>
