import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import AddScream from "../components/AddScream.vue";
import ScreamList from "../components/ScreamList.vue";
import Com from "../components/Com.vue";
import Edit from "../components/Edit.vue";
import MyScreams from "../components/MyScreams.vue";
import UserProfile from "../components/UserProfile.vue";
import TagScreams from "../components/TagScreams.vue";
import AdminPanel from "../components/AdminPanel.vue";
import EditScream from "../components/EditScream.vue";
import MessageDialog from "../components/MessageDialog.vue";
import Messages from "../components/Messages.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/add-scream",
    name: "AddScream",
    component: AddScream
  },
  {
    path: "/scream-list",
    name: "ScreamList",
    component: ScreamList
  },
  {
    path: "/com",
    name: "Com",
    component: Com
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit
  },
  {
    path: "/screams",
    name: "MyScreams",
    component: MyScreams
  },
  {
    path: "/user-profile/:id",
    name: "UserProfile",
    component: UserProfile
  },
  {
    path: "/tag-screams/:tag",
    name: "TagScreams",
    component: TagScreams
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: AdminPanel
  },
  {
    path: "/edit-scream/:screamId",
    name: "EditScream",
    component: EditScream
  },
  {
    path: "/message-dialog/:userId",
    name: "MessageDialog",
    component: MessageDialog
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
