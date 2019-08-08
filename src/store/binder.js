import firebase from 'firebase'
import Vue from 'vue'

const state = {
  // Current wikipage is here
  page: null,
  // Current wikisite is here
  site: null,
  // Here is the sites vuex cache
  sites: {}
}
const mutations = {
  patchSites (state, { id, data }) {
    Vue.set(state.sites, id, data)
  },
  setSite (state, id) {
    if (!exists(state.sites[id])) {
      state.commit('error', 'Binder could not find site id from sites cache', { root: true })
      return
    }
    Vue.set(state, 'site', state.sites[id])
    Vue.set(state.site, 'link', id)
  },
  setPage (state, { pageid, data }) {
    data.id = pageid
    Vue.set(state, 'page', data)
  }
}
const actions = {
  /**
   * Takes in site id and page id, and refreshes the cache and page data accordingly
   * @param {*} context Vuex context
   * @param {*} param1 { siteid, pageid }
   */
  openPage (context, { siteid, pageid }) {
    // Sanity check
    if (!exists(pageid) ||
      !exists(siteid)) {
      context.commit('error', 'Binder can not open page without page and site id', { root: true })
      return
    }
    Vue.set(context, 'site', null)
    Vue.set(context, 'page', null)

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).get().then((doc) => {
      if (doc.exists) {
        context.commit('patchSites', { id: siteid, data: doc.data() })
        context.commit('setSite', siteid)
      }
    })
    db.collection('sites').doc(siteid).collection('pages').doc(pageid).get().then((doc) => {
      if (doc.exists) {
        context.commit('setPage', { pageid: pageid, data: doc.data() })
      }
    })
  },
  createPage (context, { pageid, name, content, siteid,
    creator, creatorNick }) {
    console.log(pageid, name, content, siteid, creator, creatorNick)
    // Sanity
    if (!exists(pageid)) return
    if (!exists(siteid)) return
    if (!exists(creator)) return
    if (!exists(creatorNick)) return

    console.log('updating firestore for', siteid, pageid)

    var u = {
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)
    siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
    pageRef.set(u)
  },
  updatePage (context, { pageid, name, content, siteid,
    creator, creatorNick }) {
    console.log(pageid, name, content, siteid, creator, creatorNick)
    // Sanity
    if (!exists(pageid)) return
    if (!exists(siteid)) return
    if (!exists(creator)) return
    if (!exists(creatorNick)) return

    console.log('updating firestore for', siteid, pageid)

    var u = {
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)
    siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
    pageRef.update(u)
  }
}

function exists (a) {
  return a !== null && typeof a !== 'undefined'
}

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
