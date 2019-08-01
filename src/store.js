import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: { Content: 'aaa' },
    space: null,
    user: {},
    profile: {}
  },
  mutations: {
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
    },
    setSpace (state, s) {
      state.space = s
    },
    setUserNick (state, u) {
      Vue.set(state.profile, 'nick', u)
      console.log('nickname set to ' + state.profile.nick)
    },
    setActiveUser (state, u) {
      console.log('setting active user to', u)
      Vue.set(state, 'user', u)
      if (state.profile == null) {
        Vue.set(state, 'profile', {})
      }
      if (state.profile.nick == null) {
        Vue.set(state.profile, 'nick', u.displayName)
        console.log('nickname defaulted to ' + state.profile.nick)
      }
    }
  },
  actions: {
    getPage (context, name) {
      name = name || 'index'

      if (name.includes('.')) {
        context.commit('setSpace', name.substring(0, name.indexOf('.')))
      }
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
      console.log('store.savePage(' + name + ', ' + context.state.page.Content + ')')
      console.log('creator is' + context.state.user.uid + '/' + context.state.profile.nick)

      var db = firebase.firestore()

      var pagesRef = db.collection('pages')

      if (context.state.page.creators == null) {
        console.log('adding empty table to creators')
        context.state.page.creators = []
      }
      if (context.state.page.creators.length === 0 ||
        context.state.page.creators[context.state.page.creators.length - 1].uid !== context.state.user.uid) {
        console.log('adding ' + context.state.profile.nick + ' to editor ' + context.state.page.creators)
        context.state.page.creators.push({
          nick: context.state.profile.nick,
          uid: context.state.user.uid })
      }
      pagesRef.doc(name).set(context.state.page)
    },
    getProfile (context, id) {
      if (id == null) return {}

      console.log('store.getProfile (' + id + ')')
      var db = firebase.firestore()
      // var user = firebase.auth().currentUser
      db.collection('profiles').doc(id).get().then((doc) => {
        if (doc.exists) {
          console.log('profile doc data:' + doc.data())
          context.commit('setUserNick', doc.data().nick)
        } else {
          context.commit('setUserNick', null)
        }
      })
    },
    saveProfile (context, id) {
      console.log('store.saveProfile(' + id + ', ' + context.state.profile.nick + ')')

      var db = firebase.firestore()

      var pagesRef = db.collection('profiles')
      pagesRef.doc(id).set(context.state.profile)
    }
  }
})
