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
        users.push(doc.data());
      });
      commit("FETCH_USERS", users);
    });
  }
};
const getters = {
  getUsers(state) {
    return state.users;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
