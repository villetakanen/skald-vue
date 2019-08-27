import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  pages: {}
}
const mutations = {
  setPage (context, { pageid, data }) {
    Vue.set(context.pages, pageid, data)
  }
}
const getters = {
  page (pageid) {
    if (typeof state.pages[pageid] === 'undefined') return null
    return state.pages[pageid]
  }
}
const actions = {
  init (context) {
    const db = firebase.firestore()
    console.log('init', db)
    db.collection('sites').doc('skald').collection('pages').onSnapshot((querySnapshot) => {
      var pages = []
      querySnapshot.forEach((doc) => {
        pages.push(doc.id)
        context.commit('setPage', { pageid: doc.id, data: doc.data() })
      })
      console.log('Current pages from skaldbase: ', pages.join(', '))
      console.log('Current pages in state: ', context.state.pages)
    })
  }
}

export default {
  actions,
  mutations,
  getters,
  namespaced: true,
  state
}
