import Vue from "vue";
import Vuex from "vuex";
import userdata from "./modules/userData/userData";
import Screams from "./modules/Screams/screams";
import Comments from "./modules/Comments/comments";
import AllUsers from "./modules/AllUsers/allUsers";
import SearchingResults from "./modules/searchingResults/searchingResults";
import FollowedUsers from "./modules/followedUsers/followedUsers";
import Messages from "./modules/messages/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userdata,
    Screams,
    Comments,
    AllUsers,
    SearchingResults,
    FollowedUsers,
    Messages
  }
});
