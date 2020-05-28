<template>
  <div>
    <div
      class="messageDialog mt-2"
      v-for="msg in messages"
      :key="msg.messageId"
    >
      <div
        v-if="msg.senderID == $route.params.userId"
        class="columns px-5 receiverUserMessage"
      >
        <div class="column is-2 ">
          <p>{{ msg.displayName }}</p>
          <img :src="msg.userPhoto" alt="" class="photoURL" />
          <p>wysłano o {{ msg.createAt }}</p>
        </div>
        <div class="column is-10 receiverUserMessageContent">
          <p>{{ msg.message }}</p>
        </div>
      </div>

      <div
        v-if="msg.senderID != $route.params.userId"
        class="columns px-5 authUserMessage"
      >
        <div class="column is-10 authUserMessageContent">
          <p class="">{{ msg.message }}</p>
        </div>
        <div class="column is-2">
          <p>{{ msg.displayName }}</p>
          <img :src="msg.userPhoto" alt="" class="photoURL" />
          <p>wysłano o {{ msg.createAt }}</p>
        </div>
      </div>
    </div>
    <b-field class="px-5 py-3" :label-position="'on-border'" label="Wiadomość">
      <b-input class="w-100" type="is-primary" v-model="message" />
      <b-button type="is-primary" @click="sendMessage">Wyślij</b-button>
    </b-field>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: ""
    };
  },
  computed: {
    messages: function() {
      return this.$store.getters.getMessages;
    },
    receiver: function() {
      return this.$store.getters.getUserById(this.$route.params.userId);
    },
    sender: function() {
      return this.$store.getters.getAuthUser;
    }
  },
  created: function() {
    this.fetchAuthUser();
    this.fetchMessages();
    this.removeUnreadMessages();
  },
  methods: {
    sendMessage: function() {
      if (this.message == "") {
        return;
      }
      const message = {
        message: this.message,
        createAt: new Date().toLocaleString(),
        senderID: this.$store.getters.getAuthUser.id,
        receiverID: this.$route.params.userId,
        displayName: this.sender.displayName,
        userPhoto: this.sender.photoURL
      };

      this.$store.dispatch("sendMessage", message);
      this.message = "";
    },
    removeUnreadMessages: function() {
      this.$store.dispatch("removeUnreadMessages", this.$route.params.userId);
    },
    fetchMessages: function() {
      this.$store.dispatch("fetchMessages", [
        this.sender.id,
        this.$route.params.userId
      ]);
    },
    fetchAuthUser: function() {
      this.$store.dispatch("fetchAuthUser");
    }
  },

  destroyed: function() {
    this.$store.commit("REMOVE_MESSAGES");
  }
};
</script>

<style>
.photoURL {
  max-width: 20%;
  height: auto;
  border-radius: 50%;
}
.authUserMessage {
  background-color: #ccb4fb;
  margin-bottom: 10px !important;
}
.messageDialog {
  padding: 0px 40px;
  padding-bottom: 10px !important;
}
.authUserMessageContent {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.receiverUserMessageContent {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.receiverUserMessage {
  background-color: #e5d4ff;
  margin-bottom: 10px !important;
}
</style>
