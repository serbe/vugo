import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    history: ["/"]
  },
  mutations: {
    push(state, path) {
      state.history.push(path);
    }
  },
  actions: {
    add_from(context, path) {
      context.commit("push", path);
    }
  },
  getters: {
    last: state => {
      if (state && state.history && state.history.length > 1) {
        return state.history[state.history.length - 1];
      } else {
        return "/";
      }
    }
  }
});

export default store;
