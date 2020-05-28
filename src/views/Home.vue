<template>
  <div class="home">
    <AddScream v-if="authUser != null" />
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
  data: function() {
    return {
      followedScreams: []
    };
  },
  computed: {
    followedUsers: function() {
      return this.$store.getters.getFollowedUsers;
    },
    authUser: function() {
      return this.$store.getters.getAuthUser;
    },
    allScreams: function() {
      return this.$store.getters.getScreams;
    }
  },
  methods: {
    getFollowedScreams: function() {
      const followedScreams = [];
      if (firebase.auth().currentUser != null) {
        for (let i = 0; i < this.allScreams.length; i++) {
          if (this.allScreams[i].userID == this.authUser.id) {
            if (!followedScreams.includes(this.allScreams[i])) {
              followedScreams.push(this.allScreams[i]);
            }
          }
          for (let j = 0; j < this.followedUsers.length; j++) {
            if (
              this.followedUsers[j].id == this.allScreams[i].userID ||
              this.allScreams[i].sharedTo == this.followedUsers[j].id
            ) {
              if (!followedScreams.includes(this.allScreams[i])) {
                followedScreams.push(this.allScreams[i]);
              }
            }
          }
        }
        return followedScreams;
      } else {
        return firebase.auth().currentUser != null
          ? followedScreams
          : this.allScreams;
      }
    }
  }
};
</script>
