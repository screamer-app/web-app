<template>
  <div class="container">
    <div class="container">
      <div
        v-for="scream in screams"
        v-bind:key="scream.documentID"
        class="incoming_msg"
      >
        <div class="media-left">
          <a href="#">
            <img
              class="media-object photo-profile"
              :src="getUserPhoto(scream.userID)"
              width="60"
              height="60"
              alt="..."
            />
          </a>
        </div>
        <div v-if="scream.sharedTo != ''" class="media-right">
          <p>
            <router-link
              class="sharedNick"
              :to="'/user-profile/' + scream.sharedTo"
              >{{ getUserName(scream.sharedTo) }}</router-link
            >podał dalej
          </p>
        </div>
        <div class="card-body">
          <router-link
            class="card-link"
            tag="a"
            :to="'/user-profile/' + scream.userID"
          >
            <h5 class="card-author">
              {{ scream.login }}
            </h5>
          </router-link>
          <h5 class="card-date">
            {{ scream.createAt }}
          </h5>
          <p class="card-text">
            {{ scream.scream.toUpperCase() }}
          </p>
          <div class="tags">
            <p v-for="tag in scream.tags" v-bind:key="tag" class="mr-2">
              <router-link :to="`/tag-screams/${tag}`">
                {{ "#" + tag }}
              </router-link>
            </p>
          </div>
        </div>
        <div v-for="com in comments" v-bind:key="com.documentID">
          <div
            class="columns comment-body mb-4"
            v-if="com.screamID == scream.documentID"
          >
            <div class="column is-one-fifth">
              <img
                class="avatar"
                :src="getUserPhoto(com.userID)"
                alt=""
              />
              <router-link class="" :to="'/user-profile/' + com.userID">
                <p>
                  {{ getUserName(com.userID) }}
                </p>
              </router-link>
              <p>{{ com.createAt }}</p>
            </div>
            <div class="column is-three-fifth d-flex align-items-center">
              <p v-if="!editingCommentId.includes(com.documentID)">
                {{ com.comment.toUpperCase() }}
              </p>
              <div
                class="w-100 "
                v-if="editingCommentId.includes(com.documentID)"
              >
                <b-field
                  class="d-flex align-items-center"
                  label="Name"
                  label-position="on-border"
                >
                  <b-input
                    class="w-100 mr-2"
                    v-model="com.comment"
                    type="is-primary"
                  ></b-input>
                  <b-button
                    @click="editComment(com)"
                    size="is-small"
                    type="is-primary"
                    >Edytuj</b-button
                  >
                </b-field>
              </div>
            </div>
            <div
              v-if="
                com.userID == $store.getters.getAuthUser.id ||
                  $route.path == '/admin-panel'
              "
              class="column is-one-fifth d-flex align-items-center justify-content-center"
            >
              <b-button
                v-if="!editingCommentId.includes(com.documentID)"
                @click="editComment(com)"
                size="is-small"
                type="is-primary"
                class="mr-2"
                >Edytuj</b-button
              >

              <b-button
                @click="deleteComment(com)"
                size="is-small"
                type="is-primary"
                >Usuń</b-button
              >
            </div>
          </div>
        </div>
        <form v-if="authUser.uid">
          <div class="form-group row">
            <div class="col-12">
              <b-field label="Napisz komentarz" :label-position="'on-border'">
                <b-input
                  placeholder="Treść komentarza"
                  v-model="comment"
                  type="textarea"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class=" row">
            <div class=" d-flex">
              <b-button
                @click="editScream(scream)"
                type="is-primary"
                class="mr-2"
                v-if="
                  $route.path == '/admin-panel' || $route.path == '/screams'
                "
                >Edytuj</b-button
              >
              <b-button
                @click="deleteScream(scream)"
                type="is-primary"
                class="mr-2"
                v-if="
                  $route.path == '/admin-panel' || $route.path == '/screams'
                "
                >Usuń</b-button
              >

              <b-button
                @click="shareScream(scream)"
                type="is-primary"
                class="mr-2"
                v-if="$route.path != '/admin-panel'"
                >Podaj dalej</b-button
              >
              <b-button
                @click="saveComment(scream.documentID)"
                type="is-primary"
                class="mr-2"
                v-if="$route.path != '/admin-panel'"
                >Dodaj komentarz</b-button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
export default {
  name: "ScreamList",
  data: function() {
    return {
      scream: null,
      comment: null,
      authUser: [],
      editingCommentId: []
    };
  },
  computed: {
    screams: function() {
      if (this.propScreams == null) {
        return this.$store.getters.getScreams;
      } else {
        return this.propScreams;
      }
    },
    comments: function() {
      return this.$store.getters.getComments;
    },
    users: function() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    saveComment: function(screamID) {
      const newComment = {
        comment: this.comment,
        createAt: new Date().toLocaleString(),
        userID: this.$store.getters.getAuthUser.id,
        login: this.$store.getters.getAuthUser.displayName,
        screamID: screamID
      };
      this.$store.dispatch("saveComment", newComment);
      this.comment = null;
    },
    getUserName: function(userID) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == userID) {
          return this.users[i].displayName;
        }
      }
    },
    getUserPhoto: function(userID) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == userID) {
          return this.users[i].photoURL;
        }
      }
    },
    shareScream: function(scream) {
      scream.sharedTo = this.authUser.uid;
      scream.createAt = new Date().toLocaleString();
      delete scream.documentID;
      this.$store.dispatch("addScream", scream);
    },
    deleteScream: function(scream) {
      this.$store.dispatch("deleteScream", scream.documentID);
    },
    editScream: function(scream) {
      this.$router.push("/edit-scream/" + scream.documentID);
    },
    editComment: function(comment) {
      if (!this.editingCommentId.includes(comment.documentID)) {
        this.editingCommentId.push(comment.documentID);
      } else {
        const indexOf = this.editingCommentId.indexOf(comment.documentID);
        this.editingCommentId.splice(indexOf, 1);
        this.$store.dispatch("editComment", comment);
      }
    },
    deleteComment: function(comment) {
      this.$store.dispatch("deleteComment", comment.documentID);
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
  props: ["propScreams"],
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
body {
  background-color: #eeeeee;
}

.h7 {
  font-size: 0.8rem;
}
.media-right {
  float: right;
  margin-left: -200px;
  padding-bottom: 15px;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}
.media-left {
  float: left;
  margin-right: -200px;
  padding-bottom: 15px;
}
.incoming_msg {
  border: 0.2px dashed #7957d5;
  padding: 40px;
  margin-bottom: 10px;
}
.photo-profile {
  border-radius: 50%;
}
.card-link {
  color: #7957d5 !important;
  text-decoration: none;
  font-size: 2rem;
}
.card-date {
  color: grey;
  font-style: italic;
  font-size: 0.9rem;
}
.card-text {
  padding: 15px;
  margin-top: 15px;
  text-align: left;
}
.card-body {
  padding-top: 0px;
}
.comment-body {
  background: #f1eaf7;
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
.avatar {
  border-radius: 50%;
  max-width: 20%;
}
.sharedNick {
  text-decoration: none !important;
  font-weight: 700;
  margin-right: 5px;
}
</style>
