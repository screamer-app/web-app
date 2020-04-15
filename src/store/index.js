import Vue from "vue";
import Vuex from "vuex";
import userdata from "./modules/userData/userData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userdata
  }
});
