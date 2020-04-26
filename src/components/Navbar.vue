<template>
  <b-navbar wrapper-class="container" transparent spaced :shadow="!homepage">
    <b-navbar-item tag="router-link" to="/">screamer-app</b-navbar-item>

    <b-navbar-item tag="div" class="navbar-end">
      <b-input
        placeholder="Wpisz nazwę lub tag..."
        type="search"
        icon="magnify"
        v-model="search"
        @keyup="searching"
      >
      </b-input>
      <div class="buttons">
        <a
          @click="logout"
          class="button is-primary is-outlined"
          :class="{ 'is-inverted': homepage }"
          >Wyloguj</a
        >
      </div>
    </b-navbar-item>
  </b-navbar>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      homepage: false,
      isPublic: true,
      search: ""
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    screams() {
      return this.$store.getters.getScreams;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    searching() {
      const users = [];
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].displayName.toLowerCase().includes(this.search)) {
          users.push(this.users[i]);
        }
      }
      const screams = [];
      for (i = 0; i < this.screams.length; i++) {
        this.screams[i].tags.forEach(tag => {
          if (tag.toLowerCase().includes(this.search)) {
            screams.push(this.screams[i]);
          }
        });
      }
      this.$store.commit("setSearchingResults", {
        users: users,
        screams: screams
      });
    }
  }
};
</script>
