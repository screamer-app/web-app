<template>
  <div>
    <div
      v-for="user in searchingResults.users"
      :key="user.id"
      @click="cleanSearchBar"
    >
      <router-link class="" :to="`/user-profile/${user.id}`"
        >użytkownik: {{ user.displayName }}</router-link
      >
    </div>
    <div
      v-for="scream in searchingResults.screams"
      :key="scream.id"
      @click="cleanSearchBar"
    >
      scream tag: {{ scream.tags }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    searchingResults() {
      return this.$store.getters.getSearchingResults;
    }
  },
  methods: {
    cleanSearchBar() {
      this.$store.commit("RESET_SEARCHING_RESULTS");
    }
  }
};
</script>
