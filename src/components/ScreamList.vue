<template>
  <div class="container">
    <div class="container">
      <div v-for="scream in screams" v-bind:key="scream" class="incoming_msg">
        <div class="media-left">
          <a href="#">
            <img
              class="media-object photo-profile"
              :src="scream.photoURL"
              width="60"
              height="60"
              alt="..."
            />
          </a>
        </div>
        <div class="card-body">
          <a class="card-link" href="#">
            <h5 class="card-author">
              {{ scream.login }}
            </h5>
          </a>
          <h5 class="card-author">
            {{ scream.createAt }}
          </h5>
          <p class="card-text">
            {{ scream.scream }}
          </p>
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
  name: "ScreamList",
  data() {
    return {
      scream: null,
      screams: [],
      authUser: [],
    };
  },
  methods: {
    fetchScreams() {
      db.collection("screams")
        .orderBy("createAt", "desc")
        .onSnapshot((querySnapshot) => {
          let allScreams = [];
          querySnapshot.forEach((doc) => {
            allScreams.push(doc.data());
          });
          this.screams = allScreams;
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.fetchScreams();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  },
};
</script>

<style scoped>
body {
  background-color: #eeeeee;
}

.h7 {
  font-size: 0.8rem;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}
.media-left {
  float: left;
  margin-right: -200px;
  padding-bottom: 15px;
}

@media (min-width: 992px) {
  .gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .gedf-card {
    margin-bottom: 2.77rem;
  }
}

/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
}
</style>
