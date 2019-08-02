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
  },
  setSite (state, key) {
    Vue.set(state, 'Site', key)
  }
}
const actions = {
  /**
   * Load a page from the Firebase
   * @param {*} context vuex context
   * @param {*} name page name. The action does nothing, if the name is emtpy.
   */
  getPage (context, name) {
    console.log('getting page for', name)
    // sanity check
    if (name === null) return // name = 'Skald.Welcome'
    // check if this is a root level page, or a sub-page of a site
    // If a root page, encode the site name to it.

    var sname = restoreSite(name, context)

    const db = firebase.firestore()
    db.collection('pages').doc(sname).get().then((doc) => {
      if (doc.exists) {
        console.log('got doc', doc.data())
        context.commit('setPage', { key: sname, page: doc.data() })
        context.commit('sites/setCurrentSite', sname.substring(0, sname.indexOf('.')), { root: true })
      } else {
        // return a new page
        context.commit('setPage', { key: name, page: { Content: ' ', Id: sname, Site: sname.substring(0, sname.indexOf('.')) } })
        context.commit('sites/setCurrentSite', name.substring(0, name.indexOf('.')), { root: true })
      }
    })
  },
  savePage (context, { name, creator }) {
    // This is the payload we save
    var page = {
      Site: context.state.Site,
      Content: context.state.Content,
      Creators: context.state.Creators
    }

    var sname = restoreSite(name, context)

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
      page.Creators[page.Creators.length - 1].uid !== c) {
      page.Creators.push({ uid: c, Nick: n, Content: page.Content })
    }

    // Migrate theme
    var pagesRef = db.collection('pages')
    pagesRef.doc(sname).set(page)
  }
}
/**
 * Restores the Site data to n and p respectively
 * @param {*} n name
 * @param {*} p a Page JSON, updated as object
 */
function restoreSite (n, context) {
  console.log('restoring site for', n, context)

  // Case 1, there is a Site def, and it needs to be encoded to the name
  if (context.Site !== null &&
    typeof context.Site !== 'undefined') {
    console.log('Case 1, there is a Site def, and it needs to be encoded to the name')
    if (n.includes('.')) {
      return context.Site + '.' + n.substring(n.indexOf('.'))
    } else {
      return context.Site + '.' + n
    }
  }

  // Case 2, the Site def is missing, and we need to restore it from the name
  if (n.includes('.')) {
    console.log('Case 2, the Site def is missing, and we need to restore it from the name')
    context.commit('setSite', n.substring(0, n.indexOf('.')))
    context.commit('sites/setCurrentSite', n.substring(0, n.indexOf('.')), { root: true })
    return n
  }

  // Case 3, there is no Site def, nor is the Site encoded to the name - we forcibly return Skald.404'
  console.log('Case 3, there is no Site def, nor is the Site encoded to the name - we forcibly return Skald.404')
  return 'skald.404'
}

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
