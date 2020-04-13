<template>
<div class="container">
  <form>
    <div class="form-group row">
      <div class="col-12">
        <textarea
          v-model="scream"
          id="textarea"
          placeholder="Treść screama"
          name="textarea"
          cols="40"
          rows="5"  
          class="form-control"
        ></textarea>
      </div>
    </div>
    <div class="form-group row">
      <div class="offset-6 col-11">
        <button @click="saveScream" class="btn btn-primary" type="button">
          Dodaj
        </button>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  name: "AddScream",
  data() {
    return {
      scream: null,
      screams: [],
      authUser: [],
    };
  },
  methods: {
    saveScream() {
      db.collection("users").where("id", "==", this.authUser.uid)
    .get()
.then(querySnapshot => {
querySnapshot.forEach(doc =>{
      db.collection('screams').add({
      scream: this.scream,
      createAt: new Date().toLocaleString(),
      userID: this.authUser.uid,
      photoURL: doc.data().photoURL,
      login: doc.data().displayName
    })
      this.scream = null;
})
})

    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
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
};
</script>

<style scoped>
.container {
  max-width: 1170px;
  margin: auto;
}