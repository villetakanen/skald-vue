import firebase from 'firebase'
import Vue from 'vue'

const state = {
  nick: null,
  locale: null,
  uid: null,
  editorPreview: true
}
const mutations = {
  setCreator (state, data) {
    Vue.set(state, 'nick', data.nick)
    Vue.set(state, 'locale', data.locale)
    Vue.set(state, 'editorPreview', data.editorPreview)
  },
  setUid (state, data) {
    console.log('creator/setUid', data)
    Vue.set(state, 'uid', data)
  },
  setEditorPreview (state, data) {
    Vue.set(state, 'editorPreview', data)
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
  },
  /**
   * Takes the uid from context, and pushes the boolean from the value param to the setting
   * @param {*} context Vuex context
   * @param {boolean} value preview on/off
   */
  updateEditorPreview (context, value) {
    console.log('creator/setEditorPreview', context)
    // Sanity check
    if (exists(value) && value) value = true
    else value = false
    // Save value to firebase
    const db = firebase.firestore()
    var userRef = db.collection('profiles').doc(context.state.uid)
    userRef.update({
      editorPreview: value
    })
    context.commit('setEditorPreview', value)
  },
  logout (context) {
    console.log('creator/logout')
    Vue.set(context.state, 'nick', null)
    Vue.set(context.state, 'locale', null)
    Vue.set(context.state, 'uid', null)
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
