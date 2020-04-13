<template>
  <div class="home">
      <p>Strona główna</p>
  </div>
</template>

<script>

import firebase from "firebase";
export default {
  name: "Home",
  components: {

  },
  data() {
    return {
      authUser: []
    };
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  }
};
</script>
