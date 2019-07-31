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
      }
    },
    setContent (state, n) {
      Vue.set(state.page, 'Content', n)
    }
  },
  actions: {
    getPage (context, name) {
      name = name || 'index'
      // console.log('getPage (' + name + ')')
      var db = firebase.firestore()
      // var user = firebase.auth().currentUser
      db.collection('pages').doc(name).get().then((doc) => {
        if (doc.exists) {
          // console.log('doc data:' + doc.data())
          context.commit('updatePage', doc.data())
        } else {
          context.commit('updatePage', { Content: 'No wikipage with this name!' })
        }
      })
    },
    savePage (context, name) {
      // console.log('store.savePage(' + name + ', ' + context.state.page.Content + ')')

      var db = firebase.firestore()

      var pagesRef = db.collection('pages')
      pagesRef.doc(name).set(context.state.page)
    }
  }
})
