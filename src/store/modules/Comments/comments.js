import { db } from "@/main.js";

const state = {
  comments: null
};

const mutations = {
  FETCH_COMMENTS(state, allComments) {
    state.comments = allComments;
  }
};

const actions = {
  fetchComments({ commit }) {
    db.collection("comments")
      .orderBy("createAt", "asc")
      .onSnapshot(querySnapshot => {
        let allComments = [];
        querySnapshot.forEach(doc => {
          var comment = {};
          for (var key in doc.data()) {
            comment[key] = doc.data()[key];
          }
          comment["commentId"] = doc.id;
          allComments.push(comment);
        });
        commit("FETCH_COMMENTS", allComments);
      });
  },
  saveComment({ state }, commentData) {
    db.collection("users")
      .where("id", "==", commentData.userID)
      .get()
      .then(() => {
        db.collection("comments").add(commentData);
        state.comments.push(commentData);
      });
  }
};

const getters = {
  getComments(state) {
    return state.comments;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
