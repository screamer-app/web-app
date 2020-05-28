import Vue from "vue";
import Vuex from "vuex";
import AuthUser from "./modules/AuthUser/authUser";
import Screams from "./modules/Screams/screams";
import Comments from "./modules/Comments/comments";
import AllUsers from "./modules/AllUsers/allUsers";
import SearchingResults from "./modules/searchingResults/searchingResults";
import FollowedUsers from "./modules/FollowedUsers/followedUsers";
import Messages from "./modules/Messages/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthUser,
    Screams,
    Comments,
    AllUsers,
    SearchingResults,
    FollowedUsers,
    Messages
  }
});
