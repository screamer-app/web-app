/*eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueResource from 'vue-resource';

require("firebase/firestore");

const Config = {
    apiKey: "AIzaSyBrJbhxONYQDprXw-kqmzHUEWl83e89Ky0",
    authDomain: "screamer-app.firebaseapp.com",
    databaseURL: "https://screamer-app.firebaseio.com",
    projectId: "screamer-app",
    storageBucket: "screamer-app.appspot.com",
    messagingSenderId: "215139518869",
    appId: "1:215139518869:web:f0ca47413af624c26e0e9c",
    measurementId: "G-LP0HYFSR1Y"
};

firebase.initializeApp(Config);


Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueResource);

Vue.http.options.root = 'https://screamer-app.firebaseio.com/';

export const db = firebase.firestore();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");