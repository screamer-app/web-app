<template>
  <div class="columns">
    <div class="column is-4">
      <img class="user-photo" :src="user.photoURL" alt="" />
      <h2>{{ user.displayName }}</h2>
      <p>{{ user.bio }}</p>
      <b-button
        @click="follow"
        v-if="!followed && $route.params.id != currentUser.id"
      >
        Obserwuj
      </b-button>
      <b-button @click="unfollow" v-if="followed">
        Anuluj obserwowanie
      </b-button>
    </div>
    <div class="column is-8">
      <UserScreams :user="user" />
    </div>
  </div>
</template>

<script>
import UserScreams from "./UserScreams";
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
      followed: false
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    currentUser() {
      return this.$store.getters.userdata;
    }
  },
  watch: {
    "$route.params.id"() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == this.$route.params.id) {
          this.user = this.users[i];
        }
      }
    }
  },
  created() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.$route.params.id) {
        this.user = this.users[i];
      }
    }
    for (let i = 0; i < this.currentUser.myScreamers.length; i++) {
      if (this.currentUser.myScreamers[i] == this.user.id) {
        this.followed = true;
      }
    }
  },
  components: {
    UserScreams
  },
  methods: {
    follow() {
      if (!firebase.auth().currentUser) {
        this.$router.push("/login");
        return;
      }
      const currentUser = this.currentUser;
      if (!currentUser.myScreamers) {
        currentUser.myScreamers = [];
      }

      if (!this.followed) {
        currentUser.myScreamers.push(this.user.id);
      }
      this.$store.dispatch("editUser", currentUser);
      this.followed = true;
    },
    unfollow() {
      const currentUser = this.$store.getters.userdata;
      var index = currentUser.myScreamers.indexOf(this.user.id);
      currentUser.myScreamers.splice(index, 1);
      console.log(currentUser);
      this.$store.dispatch("editUser", currentUser);
      this.followed = false;
    }
  }
};
</script>

<style>
.user-photo {
  max-width: 50%;
  height: auto;
}
</style>
