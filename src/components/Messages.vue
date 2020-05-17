<template>
  <div>
    <div class="columns px-5" v-for="message in messages" :key="message.docId">
      <div class="column is-12">
        <router-link :to="`/messageDialog/${message.id}`">
          <b-message
            :title="$store.getters.getUserById(message.id).displayName"
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
    messages() {
      return this.$store.getters.getMyMessages;
    }
  },
  created() {
    this.$store.dispatch("fetchAllMessages");
  }
};
</script>
