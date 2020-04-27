<template>
  <div class="home">
    <AddScream />
    <ScreamList :propScreams="getFollowedScreams()" />
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
      authUser: [],
      followedScreams: []
    };
  },
  computed: {
    followedUsers() {
      return this.$store.getters.getFollowedUsers;
    },
    userdata() {
      return this.$store.getters.userdata;
    },
    allScreams() {
      return this.$store.getters.getScreams;
    }
  },
  created() {},
  methods: {
    getFollowedScreams() {
      const followedScreams = [];
      console.log(this.allScreams);
      for (let i = 0; i < this.allScreams.length; i++) {
        for (let j = 0; j < this.followedUsers.length; j++) {
          if (this.followedUsers[j].id == this.allScreams[i].userID) {
            followedScreams.push(this.allScreams[i]);
          }
        }
      }

      return followedScreams;
    }
  },
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
