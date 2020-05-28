<template>
  <div id="app">
    <Navbar :cleanSearchingBar="cleanSearchingBar" />
    <SearchingResults @cleanSearchBar="cleanSearchBar($event)" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SearchingResults from "@/components/SearchingResults";

export default {
  data() {
    return {
      cleanSearchingBar: ""
    };
  },
  components: {
    Navbar,
    SearchingResults
  },
  created() {
    this.$store.dispatch("fetchAuthUser");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchScreams");
    this.$store.dispatch("fetchComments");
    this.$store.dispatch("fetchFollowedUsers");
    this.$store.dispatch("fetchAllMessages");
  },
  methods: {
    cleanSearchBar(e) {
      this.cleanSearchingBar = e;
    }
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
