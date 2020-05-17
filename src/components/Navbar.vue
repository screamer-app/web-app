<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">screamer-app</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item v-if="visible" class="" tag="router-link" to="/screams"
        >Mój profil</b-navbar-item
      >
      <b-navbar-item
        v-if="$store.getters.userdata.isAdmin"
        class=""
        tag="router-link"
        to="/adminPanel"
        >Admin</b-navbar-item
      >
      <b-navbar-item v-if="visible" tag="router-link" to="/messages">
        Wiadomości({{ $store.getters.userdata.unreadMessages.length }})
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="visible" tag="div" class="navbar-end">
        <b-input
          placeholder="Wpisz nazwę lub tag..."
          type="search"
          icon="magnify"
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
  data() {
    return {
      homepage: false,
      search: "",
      visible: false
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
  watch: {
    cleanSearchingBar() {
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
      this.$router.replace("login");
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
  created() {
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
