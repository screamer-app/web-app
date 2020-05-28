<template>
  <div class="container">
    <div>
      <div v-for="scream in screams" v-bind:key="scream" class="incoming_msg">
        <div class="mt-4">
          <b-card
            img-src="https://babeltechreviews.com/wp-content/uploads/2018/07/rendition1.img_.jpg"
            img-width="180"
            img-height="180"
            img-alt="Card image"
            img-left
            class="mb-3"
          >
            <b-card-title>
              <a>{{ scream.login }} </a>
            </b-card-title>
            <b-card-sub-title>
              {{ scream.createAt }}
            </b-card-sub-title>
            <b-card-text>
              {{ scream.scream }}
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  name: "PrivateChat",
  data: function() {
    return {
      scream: null,
      screams: [],
      authUser: []
    };
  },
  methods: {
    fetchScreams: function() {
      db.collection("screams")
        .orderBy("createAt", "desc")
        .onSnapshot(querySnapshot => {
          let allScreams = [];
          querySnapshot.forEach(doc => {
            allScreams.push(doc.data());
          });
          this.screams = allScreams;
        });
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.fetchScreams();
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
};
</script>
