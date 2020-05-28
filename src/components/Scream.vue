<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Board
        <b-link href="/">(Screams)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{ message.userID }}
        </template>
        <template slot="lead">
          Description: {{ message.message }}<br />
        </template>
        <hr class="my-4" />
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "firebase";
export default {
  name: "scream",
  data: function() {
    return {
      key: "",
      scream: {}
    };
  },
  created: function() {
    const ref = firebase
      .firestore()
      .collection("screams")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.key = doc.id;
        this.scream = doc.data();
      } else {
        alert("No such document!");
      }
    });
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>
