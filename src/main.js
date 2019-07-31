import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import firestore from './firestore.js'
import firebase from 'firebase'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  firestore,

  created: function () {
    // Firebase APP init
    var config = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    }
    firestore.init(config)

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.commit('setActiveUser', user)
      } else {
        // No user is signed in.
        store.commit('setActiveUser', null)
      }
    })
  },

  store,
  router,
  render: h => h(App)
}).$mount('#app')
