<template>
  <div class="container">
    <img class="avatar" :src="authUser.photoURL" alt="" />
    <Edit />
    <div>
      <h1 class="screams-title">Screamy:</h1>
      <ScreamList :propScreams="screams" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import Edit from "./Edit";
import ScreamList from "./ScreamList";

export default {
  name: "PrivateChat",
  data: function() {
    return {
      scream: null
    };
  },
  computed: {
    authUser: function() {
      return this.$store.getters.getAuthUser;
    },
    screams: function() {
      let allScreams = this.$store.getters.getScreams;
      let userScreams = [];

      allScreams.forEach(scream => {
        if (
          (scream.userID == this.authUser.id && scream.sharedTo == "") ||
          (scream.sharedTo == this.authUser.id &&
            scream.userID != this.authUser.id) ||
          (scream.userID == this.authUser.id &&
            scream.sharedTo == this.authUser.id)
        ) {
          userScreams.push(scream);
        }
      });
      return userScreams;
    }
  },
  created: function() {
    this.fetchScreams();
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  },
  components: {
    Edit,
    ScreamList
  }
};
</script>
<style>
.screams-title {
  font-size: 3rem;
  color: #7957d5;
  margin-bottom: 10px;
}
.avatar {
  height: auto;
  max-width: 30%;
}
</style>
