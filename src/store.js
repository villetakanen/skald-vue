import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import sites from './store/sites'
import page from './store/page'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sites,
    page
  },
  state: {
    user: {},
    profile: { locale: 'en' },
    siteid: 'skald',
    theme: 'Skald'
  },
  mutations: {
    refreshTheme (state, { key, data }) {
      if (state.siteid === key) {
        console.log('setting site data from refresh:', key, data.theme)
        Vue.set(state, 'theme', data.theme)
      }
    },
    updatePage (state, n) {
      console.log('update page', n)
      if (n && n.Content) {
        Vue.set(state, 'page', n)
      }
    },
    setContent (state, n) {
      Vue.set(state.page, 'Content', n)
    },
    setNick (state, n) {
      Vue.set(state.profile, 'nick', n)
      // console.log('nickname set to ' + state.profile.nick)
    },
    setSite (state, { s, t }) {
      console.log('setting site to', s, t)
      Vue.set(state, 'siteid', s)
      Vue.set(state, 'theme', t)
    },
    setLocale (state, u) {
      if (u === null || typeof u === 'undefined') return
      Vue.set(state.profile, 'locale', u)
      // this.$i18n.locale = u
      // console.log('locale set to ' + state.profile.locale)
    },
    setActiveUser (state, u) {
      // console.log('setting active user to', u)
      if (u === null) return
      Vue.set(state, 'user', u)
      if (state.profile == null) {
        Vue.set(state, 'profile', {})
      }
      if (state.profile.nick == null) {
        Vue.set(state.profile, 'nick', u.displayName)
        // console.log('nickname defaulted to ' + state.profile.nick)
      }
      if (state.profile.uid == null) {
        Vue.set(state.profile, 'uid', u.uid)
        console.log('uid defaulted to ' + state.profile.uid)
      }
    }
  },
  actions: {
    getProfile (context, id) {
      if (id == null) return {}

      // console.log('store.getProfile (' + id + ')')
      var db = firebase.firestore()
      // var user = firebase.auth().currentUser
      db.collection('profiles').doc(id).get().then((doc) => {
        if (doc.exists) {
          // console.log('profile doc data:' + doc.data())
          context.commit('setNick', doc.data().nick)
          context.commit('setLocale', doc.data().locale)
        } else {
          context.commit('setNick', null)
        }
      })
    },
    saveProfile (context, id) {
      // console.log('store.saveProfile(' + id + ', ' + context.state.profile.nick + ')')

      var db = firebase.firestore()

      var pagesRef = db.collection('profiles')
      pagesRef.doc(id).set(context.state.profile)
    }
  }
})
