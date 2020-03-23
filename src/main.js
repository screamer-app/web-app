import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import router from "./router";
import store from "./store";
import firebase from "firebase";

require("firebase/firestore");
const Config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(Config);

export const db = firebase.firestore();

const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");