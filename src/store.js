import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import sites from './store/sites'
import page from './store/page'
import binder from './store/binder'
import creator from './store/creator'
import users from './store/users'
import pagelog from './store/pagelog'
import basesite from './store/basesite'
Vue.use(Vuex)

const getters = {
  isAuthz: state => {
    return state.creator.uid !== null
  },
  locale: state => {
    if (state.creator.locale === null) return 'en'
    return state.creator.locale
  }
}
const state = {
  user: {},
  profile: { locale: 'en' },
  siteid: 'skald',
  theme: 'Skald',
  error: null,
  httpStatusCode: null,
  version: 'env key missing'
}
export default new Vuex.Store({
  modules: {
    sites,
    page,
    binder,
    creator,
    users,
    pagelog,
    basesite
  },
  getters,
  state,
  mutations: {
    error (state, error) {
      Vue.set(state, 'error', error)
    },
    httpStatusCode (state, code) {
      Vue.set(state, 'httpStatusCode', code)
    },
    refreshTheme (state, { key, data }) {
      if (state.siteid === key) {
        console.log('setting site data from refresh:', key, data.theme)
        Vue.set(state, 'theme', data.theme)
      }
    },
    setNick (state, n) {
      Vue.set(state.profile, 'nick', n)
      // console.log('nickname set to ' + state.profile.nick)
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
    },
    version (context, v) {
      context.version = v
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
