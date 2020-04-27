import { db } from "@/main";
import firebase from "firebase";

const state = {
  followedUsers: null
};

const mutations = {
  SET_FOLLOWED_USERS(state, followedUsers) {
    state.followedUsers = followedUsers;
  }
};

const actions = {
  fetchFollowedUsers({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .where("id", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection("users").onSnapshot(querySnapshot2 => {
                var followedUsers = [];
                querySnapshot2.forEach(doc2 => {
                  var followedUser = doc2.data();
                  followedUser["followedUserId"] = doc2.id;
                  if (doc.data().myScreamers.includes(followedUser.id)) {
                    followedUsers.push(followedUser);
                  }
                });

                commit("SET_FOLLOWED_USERS", followedUsers);
              });
            });
          });
      }
    });
  }
};

const getters = {
  getFollowedUsers(state) {
    return state.followedUsers;
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
