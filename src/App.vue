<template>
  <div id="app">
    <Navbar />
    <SearchingResults />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SearchingResults from "@/components/SearchingResults";

export default {
  components: {
    Navbar,
    SearchingResults
  },
  created() {
    this.$store.dispatch("fetchUser");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchScreams");
    this.$store.dispatch("fetchComments");
    this.$store.dispatch("fetchFollowedUsers");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
