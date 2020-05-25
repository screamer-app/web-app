<template>
  <div class="container">
    <img class="avatar" :src="authUser.photoURL" alt="">
    <Edit />
    <div>
      <h1 class="screams-title">Screamy:</h1>
      <ScreamList :propScreams="screams" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import Edit from "./Edit";
import { db } from "@/main.js";
import ScreamList from "./ScreamList";

export default {
  name: "PrivateChat",
  data() {
    return {
      scream: null,
      screams: []
    };
  },
  methods: {
    fetchScreams() {
      db.collection("screams")
        .orderBy("createAt", "desc")
        .onSnapshot(querySnapshot => {
          let allScreams = [];
          querySnapshot.forEach(doc => {
            var scream = {};
            if (doc.data().userID == firebase.auth().currentUser.uid) {
              scream = doc.data();
              scream["screamId"] = doc.id;
              allScreams.push(scream);
            }
          });
          this.screams = allScreams;
        });
    }
  },
  computed: {
    authUser() {
      return this.$store.getters.userdata;
    }
  },
  created() {
    this.fetchScreams();
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
  },
  components: {
    Edit,
    ScreamList
  }
};
</script>
<style>
  .screams-title{
    font-size:3rem;
    color: #7957d5;
    margin-bottom: 10px;
  }
  .avatar{
    height: auto;
    max-width: 30%;
  }
</style>
