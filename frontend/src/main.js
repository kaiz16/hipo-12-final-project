import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import { routes } from "./router/routes";
import { authPlugin } from "@/plugins/auth";
import { API } from '../config.json'
Vue.config.productionTip = false;
import "./styles/styles.css";
Vue.use(Vuesax, {
  // options here
});
Vue.use(authPlugin);

Vue.use(VueRouter);
Vue.prototype.$api = API;
const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history",
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
