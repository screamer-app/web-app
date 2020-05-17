<template>
  <div>
    <input
      v-model="authUser.photoURL"
      id="url"
      name="url"
      class="form-control"
    />
    <button @click="update_photo">Zmień avatar</button>
    <input v-model="authUser.bio" id="bio" name="bio" class="form-control" />
    <button @click="update_bio">Zmień bio</button>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  name: "Edit",
  data() {
    return {};
  },
  computed: {
    authUser() {
      return this.$store.getters.userdata;
    }
  },
  methods: {
    update_photo() {
      {
        db.collection("users")
          .where("id", "==", firebase.auth().currentUser.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection("users")
                .doc(doc.id)
                .update({
                  photoURL: this.authUser.photoURL
                })
                .then(function() {});
            });
          });
      }
    },

    update_bio() {
      {
        db.collection("users")
          .where("id", "==", firebase.auth().currentUser.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection("users")
                .doc(doc.id)
                .update({
                  bio: this.authUser.bio
                })
                .then(function() {});
            });
          });
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
  }
};
</script>
