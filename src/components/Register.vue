<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h3 class="text-xs-center headerlogin">Sign up</h3>

          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>
            <b-field label="Username">
              <b-input v-model="displayName"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" v-model="password" password-reveal>
              </b-input>
            </b-field>
            <b-field label="Bio line">
              <b-input v-model="bio"></b-input>
            </b-field>
            <b-button type="is-primary" class="mb-2" @click="signUp"
              >Zarejestruj</b-button
            >

            <p>
              lub zaloguj się
              <router-link to="/login">TUTAJ</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main.js";

export default {
  name: "signUp",
  data: function() {
    return {
      email: "",
      password: "",
      authUser: []
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            // eslint-disable-next-line no-unused-vars
            db.collection("users").add({
              id: firebase.auth().currentUser.uid,
              displayName: this.displayName,
              createAt: new Date(),
              bio: this.bio,
              photoURL: "https://www.w3schools.com/howto/img_avatar.png",
              myScreamers: [],
              isAdmin: false,
              unreadMessages: []
            });
            this.$router.replace("/");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>
