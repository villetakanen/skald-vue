import firebase from 'firebase'
import Vue from 'vue'

const state = {
  nick: null,
  locale: null
}
const mutations = {
  setCreator (state, data) {
    Vue.set(state, 'nick', data.nick)
    Vue.set(state, 'locale', data.locale)
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
      // console.log(context.nick, context.locale)
    })
  }
}
export default {
  actions,
  mutations,
  namespaced: true,
  state
}
