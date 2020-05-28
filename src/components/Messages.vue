<template>
  <div>
    <div class="columns px-5" v-for="message in messages" :key="message.docId">
      <div class="column is-12">
        <router-link :to="`/message-dialog/${message.id}`">
          <b-message
            :title="$store.getters.getUserById(message.id).displayName"
            type="is-primary"
          >
            {{ message.messages }} nieprzeczytanych wiadomości.
          </b-message>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages: function() {
      return this.$store.getters.getMyMessages;
    }
  },
  created: function() {
    this.fetchAllMessages();
  },
  methods: {
    fetchAllMessages: function() {
      this.$store.dispatch("fetchAllMessages");
    }
  }
};
</script>
