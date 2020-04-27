<template>
  <div>
    <div v-for="user in searchingResults.users" :key="user.id">
      <router-link class="" :to="`/user-profile/${user.id}`"
        >użytkownik: {{ user.displayName }}</router-link
      >
    </div>
    <div v-for="scream in searchingResults.screams" :key="scream.id">
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
  }
};
</script>
