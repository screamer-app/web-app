<template>
  <div>
    <div
      v-for="user in searchingResults.users"
      :key="user.id"
      @click="cleanSearchBar"
      class="searchingResult"
    >
    <img class="userPhoto" :src="user.photoURL" alt="">
      <router-link class="" :to="`/user-profile/${user.id}`"
        >{{ user.displayName }}</router-link
      >
    </div>
    <div
      v-for="scream in searchingResults.screams"
      :key="scream.id"
      @click="cleanSearchBar"
    >
      Screamy z tagami: 
      <p class="tags" v-for="(tag, index) in scream.tags" tag="router-link" :key="index">#{{ tag }}</p>
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
<style>
  .userPhoto{
    border-radius: 50%;
    height: auto;
    max-width: 3%;
    margin-right: 7px; 
  }
  .searchingResult{
    border-bottom: 1px dashed #7957d5;
    padding:15px;
  }
  .searchingResult:first-child{
    border-top: 1px dashed #7957d5;
  }
  .tags{

  }
</style>
