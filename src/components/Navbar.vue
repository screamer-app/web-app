<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item
        type="is-primary"
        class="navbartitle"
        tag="router-link"
        to="/"
        >SCREAMER
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        v-if="visible"
        class="navbar-item"
        tag="router-link"
        to="/screams"
        >Mój profil</b-navbar-item
      >
      <b-navbar-item
        v-if="$store.getters.getAuthUser.isAdmin"
        class="navbar-item"
        tag="router-link"
        to="/admin-panel"
        >Admin</b-navbar-item
      >
      <b-navbar-item
        v-if="visible"
        tag="router-link"
        class="navbar-item"
        to="/messages"
      >
        Wiadomości({{ $store.getters.getAuthUser.unreadMessages.length }})
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="visible" tag="div" class="navbar-end">
        <b-input
          placeholder="Wpisz nazwę lub tag..."
          type="search"
          v-model="search"
          @keyup.native="searching"
        ></b-input>

        <div class="buttons">
          <a
            @click="logout"
            class="button is-primary is-outlined"
            :class="{ 'is-inverted': homepage }"
            >Wyloguj</a
          >
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="!visible" class="navbar-end">
        <div class="buttons">
          <a
            @click="login"
            class="button is-primary is-outlined"
            :class="{ 'is-inverted': homepage }"
            >Zaloguj się!</a
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["cleanSearchingBar"],
  name: "home",
  data: function() {
    return {
      homepage: false,
      search: "",
      visible: false
    };
  },
  computed: {
    users: function() {
      return this.$store.getters.getUsers;
    },
    screams: function() {
      return this.$store.getters.getScreams;
    }
  },
  watch: {
    cleanSearchingBar: function() {
      console.log(this.cleanSearchingBar);
      this.search = "";
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push("/login");
        });
    },
    login: function() {
      this.$router.push("/login");
    },
    searching: function() {
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
      var searchingResult = {
        users: null,
        screams: null
      };
      if (this.search != "") {
        searchingResult = {
          users: users,
          screams: screams
        };
      }
      this.$store.commit("SET_SEARCHING_RESULTS", searchingResult);
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    });
  }
};
</script>
<style>
.navbartitle {
  text-decoration: none !important;
  color: #7957d5 !important;
}
.navbar-item {
  text-decoration: none !important;
}
</style>
