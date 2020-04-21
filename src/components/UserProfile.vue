<template>
  <div class="columns">
    <div class="column is-4">
      <img class="user-photo" :src="user.photoURL" alt="" />
      <h2>{{ user.displayName }}</h2>
      <p>{{ user.bio }}</p>
    </div>
    <div class="column is-8">
      <UserScreams :user="user" />
    </div>
  </div>
</template>

<script>
import UserScreams from "./UserScreams";

export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    }
  },
  created() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.$route.params.id) {
        this.user = this.users[i];
      }
    }
  },
  components: {
    UserScreams
  }
};
</script>

<style>
.user-photo {
  max-width: 50%;
  height: auto;
}
</style>
