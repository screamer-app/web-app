<template>
  <div class="mb-5">
    <div
      v-for="user in searchingResults.users"
      :key="user.id"
      @click="cleanSearchBar"
      class="searchingResult"
    >
      <img class="userPhoto" :src="user.photoURL" alt="" />
      <router-link class="" :to="`/user-profile/${user.id}`">{{
        user.displayName
      }}</router-link>
    </div>
    <div
      v-for="scream in searchingResults.screams"
      :key="scream.id"
      @click="cleanSearchBar"
      class="searchingTags"
    >
      Screamy z tagami:
      <router-link
        v-for="(tag, index) in scream.tags"
        :key="index"
        class=""
        :to="`/tag-screams/${tag}`"
      >
        <p class="">#{{ tag }}</p></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    searchingResults: function() {
      return this.$store.getters.getSearchingResults;
    }
  },
  methods: {
    cleanSearchBar: function() {
      this.$store.commit("RESET_SEARCHING_RESULTS");
    }
  }
};
</script>
<style>
.userPhoto {
  border-radius: 50%;
  height: auto;
  max-width: 3%;
  margin-right: 7px;
}
.searchingResult {
  border-bottom: 1px dashed #7957d5;
  padding: 15px;
}
.searchingResult:first-child {
  border-top: 1px dashed #7957d5;
}
.searchingTags {
  border-bottom: 1px dashed #7957d5;
  text-align: center;
}
</style>
