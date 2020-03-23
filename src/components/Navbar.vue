<template>
  <b-navbar wrapper-class="container" transparent spaced :shadow="!homepage">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }"
        >screamer-app</b-navbar-item
      >
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            @click="logout"
            class="button is-primary is-outlined"
            :class="{ 'is-inverted': homepage }"
            >Wyloguj</a
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
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
