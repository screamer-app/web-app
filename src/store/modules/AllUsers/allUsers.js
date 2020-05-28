import { db } from "@/main.js";
const state = {
  users: {}
};
const mutations = {
  FETCH_USERS(state, users) {
    state.users = users;
  }
};

const actions = {
  fetchUsers({ commit }) {
    db.collection("users").onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        var user = doc.data();
        user["documentID"] = doc.id;
        users.push(user);
      });
      commit("FETCH_USERS", users);
    });
  }
};
const getters = {
  getUsers(state) {
    return state.users;
  },
  getUserById: state => userID => {
    for (let i = 0; i < state.users.length; i++) {
      if (state.users[i].id == userID) {
        return state.users[i];
      }
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
