<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="headerlogin">Sign in</h1>
          <form @submit.prevent="">
            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" v-model="password" password-reveal>
              </b-input>
            </b-field>

            <b-button type="is-primary" class="mb-2" @click="login"
              >Zaloguj</b-button
            >

            <p>
              Nie masz jeszcze swojego konta? Stwórz je
              <router-link to="/register">TUTAJ</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.push("/");
          },
          function(err) {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>
<style>
.headerlogin {
  font-size: 3rem !important;
  margin-bottom: 1rem;
  color: #7957d5;
}
</style>
