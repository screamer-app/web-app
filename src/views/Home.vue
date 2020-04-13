<template>
  <div class="home">
        <AddScream />
  </div>
</template>

<script>
import firebase from "firebase";
import AddScream from '@/components/AddScream'
export default {
  name: "Home",
  components: {
    AddScream
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
