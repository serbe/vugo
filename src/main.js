import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import auth from "./auth";
import store from "./store";
import "./assets/sass/main.scss";
// import "./assets/css/main.css";

auth.checkAuth();

Vue.config.productionTip = false;

Vue.router = router;

router.beforeEach((to, from, next) => {
  store.dispatch("add_from", from.path);
  if (to.matched.some(record => record.meta.title)) {
    document.title = to.meta.title;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuth()) {
      if (to.name !== "login") {
        auth.right_page = to.name;
      }
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
