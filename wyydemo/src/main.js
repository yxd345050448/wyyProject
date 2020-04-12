import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


//vant-ui
import Vant from "vant";
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload } from "vant";
Vue.use(Lazyload);

//qs模块
import qs from 'qs'
Vue.prototype.$qs = qs;

//animate.css
import 'animate.css';

//rem.js
import '@/assets/js/rem';

//reset.css
import '@/assets/CSS/reset.css';

//iconfont
import "@/assets/CSS/iconfont.css";

//axios
import axios from "axios";
Vue.prototype.$axios = axios;

//fastclick
import FastClick from 'fastclick';
FastClick.attach(document.body);

//全局过滤
import filters from './filters/index';
for (let i in filters) {
  Vue.filter(i, filters[i]);
}

//全局组件
import components from './components/index';
for (let i in components) {
  Vue.component(i, components[i]);
}

//响应拦截
axios.interceptors.response.use(response => {
  //数据回来都会经过这里
  console.log("====数据回来了====");
  console.log(response);
  console.log("====over====");
  return response;
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
