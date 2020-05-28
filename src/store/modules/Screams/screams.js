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
          helper["documentID"] = doc.id;
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
  deleteScream({ dispatch }, documentID) {
    db.collection("screams")
      .doc(documentID)
      .delete();
    dispatch("deleteScreamComments", documentID);
  },
  editScream(context, scream) {
    db.collection("screams")
      .doc(scream.documentID)
      .update(scream);
  }
};

const getters = {
  getScreams(state) {
    return state.screams;
  },
  getScreamById: state => documentID => {
    var scream = {};
    for (let i = 0; i < state.screams.length; i++) {
      if (state.screams[i].documentID == documentID) {
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
