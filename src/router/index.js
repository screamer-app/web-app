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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
