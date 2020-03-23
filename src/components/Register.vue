<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h3 class="text-xs-center">Sign up</h3>

          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="displayName"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="bio"
                placeholder="Bio line"
              />
            </fieldset>
            <button type="submit" class="btn btn-primary" @click="signUp">
              Zarejestruj
            </button>
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
  data() {
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
              bio: this.bio
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
