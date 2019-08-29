import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  nick: null,
  locale: null,
  uid: null,
  displayName: null,
  editorPreview: true,
  needsProfile: false
}
const getters = {
  needsProfile: (context) => () => {
    return state.needsProfile // !(this.uid === null && this.nick === null)
  }
}
const mutations = {
  setCreator (state, data) {
    Vue.set(state, 'nick', data.nick)
    Vue.set(state, 'locale', data.locale)
    Vue.set(state, 'editorPreview', data.editorPreview)
  },
  setUID (state, data) {
    console.log('creator/setUID', data)
    Vue.set(state, 'uid', data)
  },
  setEditorPreview (state, data) {
    Vue.set(state, 'editorPreview', data)
  },
  profileExists (state, exists) {
    Vue.set(state, 'needsProfile', !exists)
  },
  setDisplayName (state, name) {
    console.log('setDisplayName', name)
    Vue.set(state, 'displayName', name)
  }
}
const actions = {

  /**
   * Signs in a user with OAUTH
   * @param {*} context vuex context
   * @param {*} user OAUTH user json
   */
  signIn (context, user) {
    console.log('creator/signIn', user.uid)

    // Log in the user
    context.commit('setUID', user.uid)
    context.commit('setDisplayName', user.displayName)

    // Just in case, reset the creator fielfs
    context.commit('setCreator', { nick: null, locale: null })

    // Get user profile, if it does not exist, flag it to
    // this store-module as `needsProfile: true`
    const db = firebase.firestore()
    db.collection('profiles').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        context.commit('setCreator', doc.data())
        context.commit('profileExists', true)
        console.log('set a profile')
      } else {
        context.commit('profileExists', false)
        console.log('did not set a profile')
      }
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
  },
  /**
   * Deletes the current user profile, and logs out the user
   * @param {*} context Vuex context with context.state.uid of the profile to be erased
   */
  deleteProfile (context) {
    console.log('creator/deleteProfile', context.state.uid, context.state.nick)

    // First lets remove profile data from firebase users
    const db = firebase.firestore()
    const userRef = db.collection('profiles').doc(context.state.uid)

    console.log('got', userRef, 'deleting...')

    userRef.delete().then(() => {
      console.log('Profile successfully deleted!')
      const user = firebase.auth().currentUser
      user.delete().then(() => {
        // User deleted.
      }).catch((error) => {
        // An error happened.
        console.error('Error removing Profile: ', error)
        context.commit('error', error, { root: true })
      })
    }).catch((error) => {
      console.error('Error removing Profile: ', error)
      context.commit('error', error, { root: true })
    })

    // Then we'll ask the firebase app to remove the account!
  }
}
function exists (a) {
  return a !== null && typeof a !== 'undefined'
}
export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
