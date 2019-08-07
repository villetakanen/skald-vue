import firebase from 'firebase'
import Vue from 'vue'

const state = {
  nick: null,
  locale: null,
  uid: null
}
const mutations = {
  setCreator (state, data) {
    Vue.set(state, 'nick', data.nick)
    Vue.set(state, 'locale', data.locale)
  },
  setUid (state, data) {
    Vue.set(state, 'uid', data)
  }
}
const actions = {
  signIn (context, user) {
    console.log('creator/signIn', user.uid)

    context.commit('setCreator', { nick: null, locale: null })

    const db = firebase.firestore()
    db.collection('profiles').doc(user.uid).get().then((doc) => {
      // console.log(doc.data())
      context.commit('setCreator', doc.data())
      context.commit('setUid', user.uid)
      // console.log(context.nick, context.locale)
    })
  },
  update (context, { uid, nick, locale }) {
    console.log('creator/update', nick, locale)

    if (!exists(uid)) return

    if (!(exists(nick) &&
      exists(locale))) return

    var u = {}
    if (exists(nick)) u.nick = nick
    if (exists(locale)) u.locale = locale

    const db = firebase.firestore()
    var userRef = db.collection('profiles').doc(uid)
    userRef.update(u)

    context.commit('setCreator', u)
  }
}
function exists (a) {
  return a !== null && typeof a !== 'undefined'
}
export default {
  actions,
  mutations,
  namespaced: true,
  state
}
