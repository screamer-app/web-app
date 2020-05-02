import firebase from "firebase";
import { db } from "@/main.js";

const state = {
  userdata: {}
};

const mutations = {
  FETCH_USER_DATA(state, userdata) {
    state.userdata = userdata;
  },
  REMOVE_USER_DATA(state) {
    state.userdata = null;
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
  },
  editUser({ commit }, currentUser) {
    var docId = "";
    db.collection("users").onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id == currentUser.id) {
          docId = doc.id;
        }
      });
      db.collection("users")
        .doc(docId)
        .update(currentUser);
    });
    commit("FETCH_USER_DATA", currentUser);
  },
  logout({ commit }) {
    commit("REMOVE_USER_DATA");
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
