<template>
  <div class="container">
    <Edit />
    <div>
      <P>Screamy:</P>
      <div
        v-for="scream in screams"
        v-bind:key="scream.createAt"
        class="incoming_msg"
      >
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
import Edit from "./Edit";
import { db } from "@/main.js";
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
            if (doc.data().userID == firebase.auth().currentUser.uid) {
              allScreams.push(doc.data());
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
    Edit
  }
};
</script>
