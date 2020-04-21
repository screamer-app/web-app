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
              :src="scream.photoURL"
              width="60"
              height="60"
              alt="..."
            />
          </a>
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
          <h5 class="card-author">
            {{ scream.createAt }}
          </h5>
          <p class="card-text">
            {{ scream.scream }}
          </p>
        </div>
        <div v-for="com in comments" v-bind:key="com.commentId">
          <div class="columns" v-if="com.screamId == scream.screamId">
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
            <div class="column">
              <p>{{ com.comment }}</p>
            </div>
          </div>
        </div>
        <form>
          <div class="form-group row">
            <div class="col-12">
              <textarea
                v-model="comment"
                id="textarea"
                placeholder="Treść komentarza"
                name="textarea"
                cols="10"
                rows="5"
                class="form-control"
              ></textarea>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-6 col-11">
              <button
                @click="shareScream(scream)"
                class="btn btn-primary mr-2"
                type="button"
              >
                Podaj dalej
              </button>
              <button
                @click="saveComment(scream.screamId)"
                class="btn btn-primary"
                type="button"
              >
                Dodaj komentarz
              </button>
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
  data() {
    return {
      scream: null,
      comment: null,
      authUser: []
    };
  },
  computed: {
    screams() {
      return this.$store.getters.getScreams;
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
        createAt: new Date().toString(),
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
    shareScream(scream) {
      scream.sharedTo = this.authUser.uid;
      scream.createAt = new Date().toLocaleString();
      delete scream.screamId;
      console.log(scream);
      this.$store.dispatch("addScream", scream);
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
    this.$store.dispatch("fetchScreams");
    this.$store.dispatch("fetchComments");
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
.avatar {
  border-radius: 50%;
  max-width: 20%;
}
</style>
