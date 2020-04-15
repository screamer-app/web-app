import firebase from "firebase";
import { db } from "@/main.js";

const state = {
  userdata: {}
};

const mutations = {
  FETCH_USER_DATA(state, userdata) {
    state.userdata = userdata;
  }
};

const actions = {
  fetchUser({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .where("id", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              commit("FETCH_USER_DATA", doc.data());
            });
          });
      }
    });
  }
};

const getters = {
  userdata(state) {
    return state.userdata;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
