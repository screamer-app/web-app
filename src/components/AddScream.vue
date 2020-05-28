<template>
  <div class="container">
    <form>
      <div class="form-group row">
        <div class="col-12">
          <b-field class="m-2 addScreamLabel" label="Napisz screama">
            <b-input
              placeholder="Wykrzycz to co Ci leży na sercu..."
              v-model="scream"
              type="textarea"
            ></b-input>
          </b-field>
          <b-taginput v-model="tags" ellipsis icon="label" placeholder="Tagi">
          </b-taginput>
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
export default {
  name: "AddScream",
  data: function() {
    return {
      scream: null,
      screams: [],
      authUser: [],
      tags: []
    };
  },
  methods: {
    saveScream: function() {
      const scream = {
        scream: this.scream,
        createAt: new Date().toLocaleString(),
        userID: this.$store.getters.getAuthUser.id,
        login: this.$store.getters.getAuthUser.displayName,
        sharedTo: "",
        tags: this.tags
      };
      this.$store.dispatch("addScream", scream);
      this.scream = null;
      this.tags = [];
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

<style scoped>
.container {
  max-width: 1170px;
  margin: auto;
}
.addScreamLabel {
  color: #7957d5 !important;
}
</style>
