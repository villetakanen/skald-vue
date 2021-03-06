import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  list: {}
  // current: null,
  // theme: null,
  // list: {},
  // owners: {}
}
const getters = {
  /**
   * Returns pagelog (filtered with user if needed)
   */
  list: (context) => () => {
    return context.list
  }

}

const mutations = {
  /**
   * State change of current site
   * @param {*} state Vuex state
   * @param {*} id Id for the site swapped to. If this does not exist in state.list, the Site is not changed.
   */
  setCurrentSite (state, id) {
    Vue.set(state, 'current', id)
    console.log('current site set to', id, state.list[id])
  },
  /**
   * Adds a Site to site listing, with doc.key as it's JSON key value with
   * Vue.set() to force the refresh of the object
   * @param {*} state Vuex store.state
   * @param {*} param1 firebase Sites json { doc.key(), doc.data() }
   */
  patchSite (state, { key, data }) {
    if (data.link === null ||
      typeof data.link === 'undefined') {
      data.link = key + '.' + key
    }
    // console.log('patching site', key, data)
    // console.log(state.list)
    Vue.set(state.list, key, data)
    // console.log(state.list[key])
  },
  patchOwner (state, { key, data }) {
    Vue.set(state.owners, key, data)
  }
}

const actions = {
  /**
   * Updates store.Sites metadata from firebase snapshot
   * @param {*} contex Vuex context
   */
  init (context) {
    const db = firebase.firestore()
    db.collection('sites').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('getSites() is adding to sites :', doc.id, doc.data())
        context.commit('patchSite', { key: doc.id, data: doc.data() })
      })
    })
  },
  /*
  getOwners (context, id) {
    context.state.owners = {}
    const db = firebase.firestore()
    db.collection('sites').doc(id).collection('owners').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('owner', doc.id, doc.data())
        context.commit('patchOwner', { key: doc.id, data: doc.data() })
        context.commit('refreshTheme', { key: doc.id, data: doc.data() }, { root: true })
        // context.state.owners[doc.key()] = doc.data()
      })
    })
  }, */
  /**
   * Create a new site to firebase
   * @param {*} contex the Vuex context
   * @param {*} param1 is { Name, URL, Owner, OwnerNick, Theme }
   */
  createSite (contex, { Name, URL, Owner, OwnerNick, Theme }) {
    var t = Theme || 'skald'
    var Site = {
      name: Name,
      theme: t,
      owners: { [Owner]: { nickName: OwnerNick } }
    }

    // console.log('Createsite', Name, URL, Owner, OwnerNick, Theme)

    const sURI = encodeURIComponent(URL)

    const db = firebase.firestore()
    // Add the Site to the db
    const siteRef = db.collection('sites')
    siteRef.doc(sURI).set(Site)
    // Init the Owners collection
    // const ownersRef = db.collection('sites').doc(sURI).collection('owners')
    // ownersRef.doc(Owner).set({ Nickname: OwnerNick })
  },
  saveTheme (contex, { id, theme }) {
    // console.log('save theme for', id, theme)
    const db = firebase.firestore()
    const siteRef = db.collection('sites')
    siteRef.doc(id).update({ theme: theme })
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
