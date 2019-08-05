import firebase from 'firebase'
import Vue from 'vue'

const state = {
  current: null,
  theme: null,
  list: {}
}

const mutations = {
  /**
   * State change of current site, Current Site metadata is collected and persisted at the root level
   * @param {*} state Vuex state
   * @param {*} id Id for the site swapped to. If this does not exist in state.list, the Site is not changed.
   */
  setCurrentSite (state, id) {
    if (state.list[id] === null ||
      typeof state.list[id] === 'undefined') {
      id = 'skald'
    }
    Vue.set(state, 'current', id)
    /* if (state.list[id].theme === null) {
      Vue.set(state, 'theme', 'default')
    }
    Vue.set(state, 'theme', state.list[id].theme) */
  },
  /**
   * Adds a Site to site listing, with doc.key as it's JSON key value with
   * Vue.set() to force the refresh of the object
   * @param {*} state Vuex store.state
   * @param {*} param1 firebase Sites json { doc.key(), doc.data() }
   */
  patchSite (state, { key, data }) {
    if (data.Link === null ||
      typeof data.Link === 'undefined') {
      data.Link = key + '.' + key
    }
    console.log('Got site', key, data)
    Vue.set(state.list, key, data)
  }
}

const actions = {
  /**
   * Updates store.Sites metadata from firebase snapshot
   * @param {*} contex Vuex context
   */
  getSites (context) {
    const db = firebase.firestore()
    db.collection('sites').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('getSites() is adding to sites :', doc.id, doc.data())
        context.commit('patchSite', { key: doc.id, data: doc.data() })
      })
    })
  },
  /**
   * Create a new site to firebase
   * @param {*} contex the Vuex context
   * @param {*} param1 is { Name, URL, Owner, OwnerNick, Theme }
   */
  createSite (contex, { Name, URL, Owner, OwnerNick, Theme }) {
    var t = Theme || 'skald'
    var Site = {
      Name: Name,
      Owners: [{ uid: Owner, Nick: OwnerNick }],
      Theme: t
    }

    const sURI = encodeURIComponent(URL)

    console.log('Creating a Site', sURI, Site)

    const db = firebase.firestore()
    const siteRef = db.collection('sites')
    siteRef.doc(sURI).set(Site)
  }
}

export default {
  actions,
  mutations,
  namespaced: true,
  state
}
