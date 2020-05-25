<template>
  <div class="container">
    <div class="container">
      <div
        v-for="scream in screams"
        v-bind:key="scream.screamId"
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
            <router-link class="sharedNick" :to="'/user-profile/' + scream.sharedTo">{{
              getUserName(scream.sharedTo)
            }}</router-link
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
              <router-link :to="`/tagScreams/${tag}`">
                {{ "#" + tag }}
              </router-link>
            </p>
          </div>
        </div>
        <div v-for="com in comments" v-bind:key="com.commentId">
          <div
            class="columns comment-body mb-4"
            v-if="com.screamId == scream.screamId"
          >
            <div class="column is-one-fifth">
              <img
                class="avatar"
                src="https://www.w3schools.com/howto/img_avatar.png"
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
              <p v-if="!editingCommentId.includes(com.commentId)">
                {{ com.comment.toUpperCase() }}
              </p>
              <div class="w-100 " v-if="editingCommentId.includes(com.commentId)">
                <b-field class="d-flex align-items-center" label="Name" label-position="on-border">
                  <b-input class="w-100 mr-2" v-model="com.comment" type="is-primary"></b-input>
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
                com.userID == $store.getters.userdata.id ||
                  $route.path == '/adminPanel'
              "
              class="column is-one-fifth d-flex align-items-center justify-content-center"
            >
              <b-button
                v-if="!editingCommentId.includes(com.commentId)"
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
                v-if="$route.path == '/adminPanel' || $route.path == '/screams'"
                >Edytuj</b-button
              >
              <b-button
                @click="deleteScream(scream)"
                type="is-primary"
                class="mr-2"
                v-if="$route.path == '/adminPanel' || $route.path == '/screams'"
                >Usuń</b-button
              >

              <b-button
                @click="shareScream(scream)"
                type="is-primary"
                class="mr-2"
                v-if="$route.path != '/adminPanel'"
                >Podaj dalej</b-button
              >
              <b-button
                @click="saveComment(scream.screamId)"
                type="is-primary"
                class="mr-2"
                v-if="$route.path != '/adminPanel'"
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
  props: ["propScreams"],
  name: "ScreamList",
  data() {
    return {
      scream: null,
      comment: null,
      authUser: [],
      editingCommentId: []
    };
  },
  computed: {
    screams() {
      if (this.propScreams == null) {
        return this.$store.getters.getScreams;
      } else {
        return this.propScreams;
      }
    },
    comments() {
      return this.$store.getters.getComments;
    },
    users() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    saveComment(screamId) {
      const newComment = {
        comment: this.comment,
        createAt: new Date().toLocaleString(),
        userID: this.$store.getters.userdata.id,
        login: this.$store.getters.userdata.displayName,
        screamId: screamId
      };
      console.log(newComment);
      this.$store.dispatch("saveComment", newComment);
      this.comment = null;
    },
    getUserName(userID) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == userID) {
          return this.users[i].displayName;
        }
      }
    },
    getUserPhoto(userID) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == userID) {
          return this.users[i].photoURL;
        }
      }
    },
    shareScream(scream) {
      scream.sharedTo = this.authUser.uid;
      scream.createAt = new Date().toLocaleString();
      delete scream.screamId;
      console.log(scream);
      this.$store.dispatch("addScream", scream);
    },
    deleteScream(scream) {
      this.$store.dispatch("deleteScream", scream.screamId);
    },
    editScream(scream) {
      this.$router.push("/editScream/" + scream.screamId);
    },
    editComment(comment) {
      if (!this.editingCommentId.includes(comment.commentId)) {
        this.editingCommentId.push(comment.commentId);
      } else {
        const indexOf = this.editingCommentId.indexOf(comment.commentId);
        this.editingCommentId.splice(indexOf, 1);
        this.$store.dispatch("editComment", comment);
      }
    },
    deleteComment(comment) {
      this.$store.dispatch("deleteComment", comment.commentId);
    }
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
  margin-top:15px;
  text-align:left;
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
.sharedNick{
  text-decoration: none!important;
  font-weight: 700;
  margin-right: 5px;
}
</style>
