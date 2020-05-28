<template>
  <div class="columns">
    <div class="column is-4">
      <img class="user-photo" :src="user.photoURL" alt="" />
      <h2 class="user-name">{{ user.displayName }}</h2>
      <h2 class="bio-name">Biografia:</h2>
      <p class="bio">{{ user.bio }}</p>
      <b-button
        @click="follow"
        v-if="!followed && $route.params.id != currentUser.id"
      >
        Obserwuj
      </b-button>
      <b-button type="is-light" @click="unfollow" v-if="followed">
        Anuluj obserwowanie
      </b-button>
      <b-button
        v-if="$route.params.id != currentUser.id"
        type="is-primary"
        tag="router-link"
        :to="`/message-dialog/${$route.params.id}`"
        class="message-button"
        >Napisz wiadomość</b-button
      >
    </div>
    <div class="column is-8">
      <ScreamList :propScreams="screams" />
    </div>
  </div>
</template>

<script>
import ScreamList from "./ScreamList";
import firebase from "firebase";

export default {
  data: function() {
    return {
      user: null,
      followed: false
    };
  },
  computed: {
    users: function() {
      return this.$store.getters.getUsers;
    },
    currentUser: function() {
      return this.$store.getters.getAuthUser;
    },
    screams: function() {
      let allScreams = this.$store.getters.getScreams;
      let userScreams = [];
      allScreams.forEach(scream => {
        if (
          (scream.userID == this.$route.params.id && scream.sharedTo == "") ||
          (scream.sharedTo == this.$route.params.id &&
            scream.userID != this.$route.params.id) ||
          (scream.userID == this.$route.params.id &&
            scream.sharedTo == this.$route.params.id)
        ) {
          userScreams.push(scream);
        }
      });
      return userScreams;
    }
  },
  watch: {
    "$route.params.id": function() {
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
    ScreamList
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
      this.$store.dispatch("editAuthUser", currentUser);
      this.followed = true;
    },
    unfollow() {
      const currentUser = this.$store.getters.getAuthUser;
      var index = currentUser.myScreamers.indexOf(this.user.id);
      currentUser.myScreamers.splice(index, 1);
      this.$store.dispatch("editAuthUser", currentUser);
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
.user-name {
  margin-top: 10px;
  font-size: 3rem;
  color: #7957d5;
}
.bio-name {
  font-weight: 700;
  font-style: italic;
  font-size: 1rem;
}
.bio {
  padding: 10px;
}
.message-button {
  text-decoration: none !important;
}
</style>
