import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./components/App.vue";
import "./main.scss";

Vue.use(BootstrapVue);

new Vue({
  render: createElement => createElement(App)
}).$mount("#app");
