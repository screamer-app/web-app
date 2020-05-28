import firebase from "firebase";
import { db } from "@/main.js";

const state = {
  authUser: {}
};

const mutations = {
  FETCH_AUTH_USER(state, authUser) {
    state.authUser = authUser;
  },
  REMOVE_AUTH_USER(state) {
    state.authUser = {};
  }
};

const actions = {
  fetchAuthUser({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .where("id", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              commit("FETCH_AUTH_USER", doc.data());
            });
          });
      }
    });
  },
  editAuthUser({ commit }, authUser) {
    var documentID = "";
    db.collection("users").onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id == authUser.id) {
          documentID = doc.id;
        }
      });
      db.collection("users")
        .doc(documentID)
        .update(authUser);
    });
    commit("FETCH_AUTH_USER", authUser);
  },
  logout({ commit }) {
    commit("REMOVE_AUTH_USER");
  }
};

const getters = {
  getAuthUser(state) {
    return state.authUser;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
