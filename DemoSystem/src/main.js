// import Vue from "vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios";
import VueAxios from 'vue-axios'

axios.defaults.headers.post["Content-Type"] = "application/json";
// Vue.prototype.$axios = axios;
// 用于解决axios跨域问题，与vue.config.js中的devserver一起作用
axios.defaults.baseURL = "/api";

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use( VueAxios , axios).mount('#app')