<template>
  <div>
    <b-field class="mt-2" :label-position="'on-border'" label="Awatar">
      <b-input
        placeholder="Wklej link do zdjęcia"
        v-model="authUser.photoURL"
      ></b-input>
    </b-field>

    <b-button class="mb-2" @click="update_photo" type="is-primary"
      >Zmień avatar</b-button
    >
    <b-field :label-position="'on-border'" label="Biografia">
      <b-input
        placeholder="Napisz coś o sobie..."
        v-model="authUser.bio"
      ></b-input>
    </b-field>
    <b-button class="mb-2" @click="update_bio" type="is-primary"
      >Zmień bio</b-button
    >
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  name: "Edit",
  data: function() {
    return {
      isComponentModalActive: false
    };
  },
  computed: {
    authUser: function() {
      return this.$store.getters.getAuthUser;
    }
  },
  methods: {
    update_photo: function() {
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

    update_bio: function() {
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
    }
  }
};
</script>
