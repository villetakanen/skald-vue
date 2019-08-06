import firebase from 'firebase'
import Vue from 'vue'

/**
 * The page default values are
 *
 * content: '',
 * site: 'skald',
 * name: '',
 * id: 'skald.404'
 * history: {}
 * lastCreator: '...'
 */
const state = {
  content: '',
  site: 'skald',
  name: '',
  id: 'skald.404',
  lastCreator: '...',
  history: {}
}
const mutations = {
  setPage (state, { key, page }) {
    console.log('setting page to ', key, page)
    Vue.set(state, 'content', page.content)
    state.name = page.name
    state.id = key
    state.site = page.site
    console.log('page set')
  },
  setSite (state, key) {
    Vue.set(state, 'site', key)
  },
  setContent (state, c) {
    // console.log('wait!', c)
    Vue.set(state, 'content', c)
  }
}
const actions = {
  /**
   * Load a page from the Firebase
   * @param {*} context vuex context
   * @param {*} name page name. The action does nothing, if the name is emtpy.
   */
  getPage (context, { siteid, pageid }) {
    console.log('Vuex page getting firestore page', siteid, pageid)

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).collection('pages').doc(pageid).get().then((doc) => {
      if (doc.exists) {
        console.log('Got doc from firebase', doc.data())
        context.commit('setPage', { key: pageid, page: doc.data() })
        // context.commit('sites/setCurrentSite', sname.substring(0, sname.indexOf('.')), { root: true })
      } else {
        db.collection('pages').doc('404').get().then((doc) => {
          console.log('Got 404 from firebase', doc.data())
          context.commit('setPage', { key: '404', page: doc.data() })
        })
      }
    })
  },
  savePage (context, { siteid, pageid, creator }) {
    // This is the payload we save
    var page = {
      site: siteid,
      content: context.state.content// ,
      // creators: context.state.creators
    }

    // var sname = restoreSite(name, context)

    console.log('savePage', siteid, pageid, context, creator)

    // var profile = context.state.profile
    var db = firebase.firestore()

    /* / Check creators, if the last creator is not current user - add current users id
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
    } */

    // Migrate theme
    var pagesRef = db.collection('sites').doc(siteid).collection('pages')
    pagesRef.doc(pageid).set(page)
  }
}
/**
 * Restores the Site data to n and p respectively
 * @param {*} n name
 * @param {*} p a Page JSON, updated as object
 * /
function restoreSite (n, context) {
  console.log('Checking site for', n, context.site)

  if (context.site === n.substring(0, n.indexOf('.'))) return

  console.log('aand restoring the site def')

  // Case 1, there is a Site def, and it needs to be encoded to the name
  if (context.site !== null &&
    typeof context.site !== 'undefined') {
    console.log('Case 1, there is a Site def, and it needs to be encoded to the name')
    if (n.includes('.')) {
      return context.site + '.' + n.substring(n.indexOf('.'))
    } else {
      return context.site + '.' + n
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
} */

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
