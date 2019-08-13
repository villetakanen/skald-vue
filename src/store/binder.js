import firebase from 'firebase'
import Vue from 'vue'

const state = {
  // Current wikipage is here
  page: null,
  // Current wikisite is here
  site: null,
  // Here is the sites vuex cache
  sites: {},
  pages: { a: { a: 'b' } }
}
const mutations = {
  patchSites (state, { id, data, current }) {
    Vue.set(state.sites, id, data)
    if (id === current) {
      Vue.set(state, 'site', data)
      console.log('patchSites', id, data, current)
    }
  },
  patchPage (state, { id, data }) {
    data.link = id
    Vue.set(state.pages, id, data)
    // console.log('p:', state.pages[id])
  },
  /* patchOwner (state, { id, data }) {
    data.link = id
    Vue.set(state.site.owners, id, data)
    console.log('o:', state.site.owners[id])
  }, */
  setSite (state, id) {
    if (!exists(state.sites[id])) return
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
  getPages (context, { siteid }) {
    console.log('binder/getPages', siteid)
    // Sanity
    if (!exists(siteid)) {
      context.commit('error', 'Binder can not get pages for undefined site', { root: true })
      return
    }

    // Erase page cache
    context.state.pages = {}

    const db = firebase.firestore()
    const siteRef = db.collection('sites').doc(siteid)
    siteRef.collection('pages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('patching page', doc.id, doc.data())
        context.commit('patchPage', { id: doc.id, data: doc.data() })
      })
    })
  },
  /**
   * Gets all sites from firebase to binder. Does not clear site cache, but does overwite all
   * site objects in binder.state.sites
   * @param {Vuex} context Vuex context
   */
  getSites (context) {
    console.log('binder/getSites')

    const db = firebase.firestore()
    db.collection('sites').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('patching page', doc.id, doc.data())
        context.commit('patchSites', { id: doc.id, data: doc.data() })
      })
    }).catch(function (error) {
      context.commit('error', error, { root: true })
    })
  },

  /**
   * Get a site from the firestore, with metadata subcollections.
   * @param {Vuex} context Vuex context
   * @param {json} siteid for { siteid }
   */
  getFullSite (context, { siteid }) {
    console.log('binder/getFullSite', siteid)
    // Sanity
    if (!exists(siteid)) {
      context.commit('error', 'Binder can not get sige data for undefined site', { root: true })
      return
    }
    const db = firebase.firestore()
    db.collection('sites').doc(siteid).get().then((doc) => {
      var site = {}
      site = doc.data()
      site.link = siteid
      site.owners = {}
      site.members = {}
      db.collection('sites').doc(siteid).collection('owners').get().then((querySnapshot) => {
        querySnapshot.forEach((own) => {
          var o = own.data()
          o.uid = own.id
          site.owners[own.id] = o
        })
        db.collection('sites').doc(siteid).collection('members').get().then((querySnapshot) => {
          querySnapshot.forEach((mem) => {
            var m = mem.data()
            m.uid = mem.id
            site.members[mem.id] = m
          })
          console.log('got', site)
          context.commit('patchSites', { id: siteid, data: site, current: siteid })
        })
      })
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
