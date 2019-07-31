import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: { Content: 'aaa' }
  },
  mutations: {
    updatePage (state, n) {
      if (n && n.Content) {
        Vue.set(state, 'page', n)
        // const test = JSON.stringify(state.books)
        // console.log(test)
        console.log('content is:' + n.Content)
      }
    }

  },
  actions: {
    getPage (context, name) {
      name = name || 'index'
      var db = firebase.firestore()
      // var user = firebase.auth().currentUser
      db.collection('pages').doc(name).get().then((doc) => {
        console.log(doc.data())
        context.commit('updatePage', doc.data())
      })
    }
  }
})
