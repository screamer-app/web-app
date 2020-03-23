<template>
  <div class="home">
    <Navbar v-if="!homePage" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    Navbar
  },
  data() {
    return {
      message: null,
      messages: [],
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
