<template>
  <div class="container">
    <Edit />
    <div>
      <P>Screamy:</P>
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
