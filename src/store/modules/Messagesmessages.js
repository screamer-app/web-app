import { db } from "@/main";

const state = {
  messages: null,
  allMessages: null
};

const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  REMOVE_MESSAGES(state) {
    state.messages = null;
  },
  SET_ALL_MESSAGES(state, allMessages) {
    state.allMessages = allMessages;
  }
};

const actions = {
  fetchMessages({ commit }, usersData) {
    db.collection("messages")
      .orderBy("createAt", "asc")
      .onSnapshot(querySnapshot => {
        var allMessages = [];
        querySnapshot.forEach(doc => {
          var message = {};
          if (
            usersData.includes(doc.data().receiverID) &&
            usersData.includes(doc.data().senderID)
          ) {
            message = doc.data();
            message["documentID"] = doc.id;
            allMessages.push(message);
          }
        });
        commit("SET_MESSAGES", allMessages);
      });
  },
  sendMessage({ dispatch }, message) {
    db.collection("messages").add(message);
    dispatch("setUnreadMessage", message);
  },
  setUnreadMessage({ getters }, message) {
    var authUser = getters.getAuthUser;
    if (message.senderID == authUser.id) {
      var receiverUser = getters.getUserById(message.receiverID);
      receiverUser.unreadMessages.push(message.senderID);
      db.collection("users")
        .doc(receiverUser.documentID)
        .update(receiverUser);
    }
  },
  fetchAllMessages({ commit }) {
    db.collection("messages")
      .orderBy("createAt", "asc")
      .onSnapshot(querySnapshot => {
        var allMessages = [];
        querySnapshot.forEach(doc => {
          var message = doc.data();
          message["documentID"] = doc.id;
          allMessages.push(message);
        });
        commit("SET_ALL_MESSAGES", allMessages);
      });
  },
  removeUnreadMessages({ getters }, receiverID) {
    var authUser = getters.getAuthUser;
    var unreadMessages = [];
    for (let i = 0; i < authUser.unreadMessages.length; i++) {
      if (authUser.unreadMessages[i] != receiverID) {
        unreadMessages.push(authUser.unreadMessages[i]);
      }
    }
    authUser.unreadMessages = unreadMessages;
    db.collection("users")
      .doc(authUser.documentID)
      .update(authUser);
  }
};

const getters = {
  getMessages(state) {
    return state.messages;
  },
  getMyMessages(state, getters) {
    var users = [];
    var messages = [];
    var myMessages = [];
    var unreadMessages = getters.getAuthUser.unreadMessages;
    for (let i = 0; i < state.allMessages.length; i++) {
      if (state.allMessages[i].receiverID == getters.getAuthUser.id) {
        if (!users.includes(state.allMessages[i].senderID)) {
          users.push(state.allMessages[i].senderID);
        }
      }
    }
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < unreadMessages.length; j++) {
        if (unreadMessages.includes(users[i])) {
          if (messages[users[i]] == null) {
            messages[users[i]] = 1;
          } else {
            messages[users[i]]++;
          }
        } else {
          messages[users[i]] = 0;
        }
      }
    }
    if (unreadMessages.length == 0) {
      for (let i = 0; i < users.length; i++) {
        messages[users[i]] = 0;
      }
    }

    for (let key in messages) {
      var myMessage = {};
      myMessage["id"] = key;
      myMessage["messages"] = messages[key];
      myMessages.push(myMessage);
    }
    return myMessages;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
