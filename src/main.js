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
    // console.log('m', process.env.VUE_APP_SKALD_VERSION)
    store.commit('version', process.env.VUE_APP_SKALD_VERSION)

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

    // get current site catalog to Vuex store
    store.dispatch('binder/getSites')

    // parse site name from router to vuex, for any components outside router views
    // or the case we enter with a direct url to route with site or page id
    if (this.$router.currentRoute.params.siteid !== null &&
      typeof this.$router.currentRoute.params.siteid !== 'undefined') {
      const s = this.$router.currentRoute.params.siteid
      store.commit('binder/setSite', s)
    }
    // console.log('Vuex state.site is ', store.state.siteid)

    // get signed in profile, and update Vuex state accordingly
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // store.commit('setActiveUser', user)
        // store.dispatch('getProfile', user.uid)
        store.dispatch('creator/signIn', user)
        if (store.state.profile.locale !== null &&
          typeof store.state.profile.locale !== 'undefined') {
          // console.log('i18n.locale =' + store.state.profile.locale)
          i18n.locale = store.getters.locale
        }
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
