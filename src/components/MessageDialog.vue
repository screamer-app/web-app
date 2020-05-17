<template>
  <div>
    <div v-for="msg in messages" :key="msg.messageId">
      <div class="columns px-5">
        <div class="column is-2">
          <p>{{ msg.displayName }}</p>
          <img :src="msg.userPhoto" alt="" class="photoURL" />
          <p>wysłano o {{ msg.createAt }}</p>
        </div>
        <div class="column is-10">
          <p>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <input type="text" v-model="message" />
    <button class="btn btn-primary" @click="sendMessage">Wyślij</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages;
    },
    receiver() {
      return this.$store.getters.getUserById(this.$route.params.userId);
    },
    sender() {
      return this.$store.getters.userdata;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
    this.$store.dispatch("fetchMessages", [
      this.sender.id,
      this.$route.params.userId
    ]);
    this.$store.dispatch("removeUnreadMessages", this.$route.params.userId);
  },
  methods: {
    sendMessage() {
      if (this.message == "") {
        return;
      }
      const message = {
        message: this.message,
        createAt: new Date().toLocaleString(),
        senderID: this.$store.getters.userdata.id,
        receiverID: this.$route.params.userId,
        displayName: this.sender.displayName,
        userPhoto: this.sender.photoURL
      };

      this.$store.dispatch("sendMessage", message);
      this.message = "";
    }
  },
  destroyed() {
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
</style>
