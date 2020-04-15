<template>
  <div class="home">
    <AddScream />
    <ScreamList />
  </div>
</template>

<script>
import AddScream from "@/components/AddScream.vue";
import ScreamList from "@/components/ScreamList.vue";
import firebase from "firebase";
export default {
  name: "Home",
  components: {
    AddScream,
    ScreamList
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
