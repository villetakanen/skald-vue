import firebase from 'firebase'
import Vue from 'vue'

const state = {
  Content: null,
  Site: null,
  Name: null,
  Creators: [],
  Id: null
}
const mutations = {
  setPage (state, { key, page }) {
    console.log('setting page to ', key, page)
    Vue.set(state, 'Content', page.Content)
    Vue.set(state, 'Creators', page.Creators)
    state.Name = key
    state.Id = key
    state.Site = key.substring(0, key.indexOf('.'))
    console.log('page set')
  }
}
const actions = {
  /**
   * Load a page from the Firebase
   * @param {*} context vuex context
   * @param {*} name page name. The action does nothing, if the name is emtpy.
   */
  getPage (context, name) {
    // sanity check
    if (name === null) return
    // check if this is a root level page, or a sub-page of a site
    // If a root page, encode the site name to it.
    if (!name.includes('.')) {
      name = name + '.' + name
    }
    const db = firebase.firestore()
    db.collection('pages').doc(name).get().then((doc) => {
      if (doc.exists) {
        context.commit('setPage', { key: name, page: doc.data() })
        context.commit('sites/setCurrentSite', name.substring(0, name.indexOf('.')), { root: true })
      } else {
        // return a new page
        context.commit('setPage', { key: name, page: { Content: ' ', Id: name, Site: name.substring(0, name.indexOf('.')) } })
        context.commit('sites/setCurrentSite', name.substring(0, name.indexOf('.')), { root: true })
      }
    })
  },
  savePage (context, { name, creator }) {
    // This is the payload we save
    var page = {
      Content: context.state.Content,
      Creators: context.state.Creators
    }
    if (!name.includes('.')) {
      name = name + '.' + name
    }

    console.log('savePage', context, page, creator)

    // var profile = context.state.profile
    var db = firebase.firestore()

    // Check creators, if the last creator is not current user - add current users id
    // and nickname to the creators list as the last creator
    var c = creator.uid
    var n = creator.nick

    console.log('c, n', c, n)

    if (page.Creators === null ||
      typeof page.Creators === 'undefined') {
      page.Creators = []
    }
    if (page.Creators.length < 1 ||
      page.Creators[page.Creators.length - 1].uid !== n) {
      page.Creators.push({ uid: c, nick: n })
    }

    // Migrate theme

    var pagesRef = db.collection('pages')
    pagesRef.doc(name).set(page)
  }
}

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
