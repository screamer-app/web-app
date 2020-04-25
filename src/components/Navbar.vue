<template>
  <b-navbar wrapper-class="container" transparent spaced :shadow="!homepage">
    <b-navbar-item tag="router-link" to="/"
      >screamer-app</b-navbar-item
    >

    <b-navbar-item tag="div" class="navbar-end">
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
      homepage: false
    };
  },
  components: {},
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
