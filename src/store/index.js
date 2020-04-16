import Vue from "vue";
import Vuex from "vuex";
import userdata from "./modules/userData/userData";
import Screams from "./modules/Screams/screams";
import Comments from "./modules/Comments/comments";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userdata,
    Screams,
    Comments
  }
});
