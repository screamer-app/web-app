<template>
  <div>
    <input v-model="url" id="url" name="url" class="form-control" />
    <button @click="update_photo">Zmień avatar</button>
    <input v-model="bio" id="bio" name="bio" class="form-control" />
    <button @click="update_bio">Zmień bio</button>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  name: "Edit",
  data() {
    return {
      url: "",
      bio: ""
    };
  },
  computed: {
    authUser() {
      return this.$store.getters.userdata;
    }
  },
  watch:{
    authUser(){
      this.url = this.authUser.photoURL;
      this.bio = this.authUser.bio;
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
                  photoURL: this.url
                })
                .then(function() {});
            });
            this.url = "";
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
                  bio: this.bio
                })
                .then(function() {});
            });
            this.bio = "";
          });
      }
    },
    created() {
      console.log(this.authUser);
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
