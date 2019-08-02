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

  if (n.includes('.')) {
    if (context.state.Site !== name.substring(0, n.indexOf('.'))) {
      context.commit('setSite', n.substring(0, n.indexOf('.')))
      console.log('page.Site restored to: ', context.state.Site)
    }
    return n
  }

  if (context.Site !== null &&
    typeof p !== 'undefined') {
    n = context.Site + '.' + n
  } else {
    n = n + '.' + n
  }

  console.log('restored to', n, context.Site)
  return n
}

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
