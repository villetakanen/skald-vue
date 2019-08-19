import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
// import firestore from './firestore.js'
import firebase from 'firebase/app'
import store from './store'
import router from './router'
import skaldfire from './plugins/skaldfire'

Vue.config.productionTip = false

// Firestore is initiated here!
Vue.use(skaldfire)

new Vue({
  vuetify,
  i18n,
  skaldfire,
  created: function () {
    // We push version to the vuex, as some components want to display it
    store.commit('version', process.env.VUE_APP_SKALD_VERSION)

    // Fetch current site catalog to Vuex store from Firebase or Firebase cache
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
