import { db } from "@/main.js";

const state = {
  screams: null
};

const mutations = {
  FETCH_SCREAMS(state, allScreams) {
    state.screams = allScreams;
  }
};

const actions = {
  fetchScreams({ commit }) {
    db.collection("screams")
      .orderBy("createAt", "desc")
      .onSnapshot(querySnapshot => {
        let allScreams = [];
        querySnapshot.forEach(doc => {
          const helper = {};
          for (var key in doc.data()) {
            helper[key] = doc.data()[key];
          }
          helper["screamId"] = doc.id;
          allScreams.push(helper);
        });
        commit("FETCH_SCREAMS", allScreams);
      });
  },
  addScream({ state }, scream) {
    db.collection("users")
      .where("id", "==", scream.userID)
      .get()
      .then(() => {
        db.collection("screams").add(scream);
        state.screams.push(scream);
      });
  },
  deleteScream({ dispatch }, screamId) {
    db.collection("screams")
      .doc(screamId)
      .delete();
    dispatch("deleteScreamComments", screamId);
  },
  editScream(context, scream) {
    db.collection("screams")
      .doc(scream.screamId)
      .update(scream);
  }
};

const getters = {
  getScreams(state) {
    return state.screams;
  },
  getScreamById: state => screamId => {
    var scream = {};
    for (let i = 0; i < state.screams.length; i++) {
      if (state.screams[i].screamId == screamId) {
        scream = state.screams[i];
      }
    }
    return scream;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
