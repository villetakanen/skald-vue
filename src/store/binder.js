import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  // Current wikipage is here
  page: null,
  // Current wikisite is here
  site: null,
  // Here is the sites vuex cache
  sites: {},
  pages: { a: { a: 'b' } },
  baseSite: null,
  content: null,
  title: null,
  sidebar: null
}

const getters = {
  /**
   * Returns content for this page
   */
  content: (context) => () => {
    if (context.content === null) return '-'
    return context.content
  },

  /**
   * Returns title for this page
   */
  title: (context) => () => {
    if (context.title === null) return 'Nomen Nix'
    return context.title
  },

  /**
   * Returns current site sidebar
   */
  sidebar: (context) => () => {
    if (!exists(context.pages['sidebar'])) return ''
    return context.pages['sidebar'].content
  },

  /**
   * Returns the lastUpdate timestamp for the selected page
   */
  lastChange: (context) => () => {
    // No page is open! return null
    if (context.page === null) return null

    // Just in case some pages predate the lastUpdate field
    if (context.page.lastUpdate === null) {
      context.commit('error', 'We have a legacy page without lastUpdate, please save the page once to fix this.', { root: true })
      return null
    }

    // Create a date from firestore timestamp
    var lastChangeDate = new Date(1970, 0, 1) // Epoch
    lastChangeDate.setSeconds(context.page.lastUpdate.seconds)
    return lastChangeDate
  }
}

const mutations = {
  patchSites (state, { id, data, current }) {
    Vue.set(state.sites, id, data)
    if (id === current) {
      Vue.set(state, 'site', data)
      // console.log('patchSites', id, data, current)
    }
  },
  patchPage (state, { id, data }) {
    data.link = id
    Vue.set(state.pages, id, data)
    // console.log('p:', state.pages[id])
  },
  setSite (state, id) {
    if (!exists(state.sites[id])) return
    Vue.set(state, 'site', state.sites[id])
    Vue.set(state.site, 'link', id)
  },
  setPage (state, { pageid, data }) {
    data.id = pageid
    Vue.set(state, 'page', data)
  },
  setContent (context, data) {
    Vue.set(context, 'content', data)
  }
}
const actions = {
  /**
   * Takes in site id and page id, and refreshes page data
   * @param {*} context Vuex context
   * @param {*} param1 { siteid, pageid }
   */
  openPage (context, { siteid, pageid }) {
    console.log('binder/openPage', siteid, pageid)

    // if we do not have a siteid, we'll use the base-site's site id
    if (!exists(siteid)) {
      console.log('forcing siteid "skald"')
      siteid = 'skald'
    }

    // if we do not have a pageid, we'll use siteid as the page id.
    if (!exists(pageid)) {
      pageid = siteid
      console.log('defaulted to pageid ', pageid)
    }

    // empty the page content cache
    context.commit('setContent', null)

    // TODO: these need to be refactored
    Vue.set(context, 'site', null)
    Vue.set(context, 'page', null)

    // get the firestore
    const db = firebase.firestore()
    const siteRef = db.collection('sites').doc(siteid)
    siteRef.get().then((doc) => {
      if (doc.exists) {
        context.commit('patchSites', { id: siteid, data: doc.data() })
        context.commit('setSite', siteid)
        const pageRef = siteRef.collection('pages').doc(pageid)
        pageRef.get().then((doc) => {
          if (doc.exists) {
            context.commit('setContent', doc.data().content)
          } else {
            context.commit('httpStatusCode', '404', { root: true })
          }
        })
        const sidebarRef = siteRef.collection('pages').doc('sidebar')
        sidebarRef.get().then((doc) => {
          if (doc.exists) {
            context.commit('setSidebar', doc.data().content)
          }
        })
      } else {
        context.commit('httpStatusCode', '403', { root: true })
      }
    })

    // TODO: this needs to be moved to the future above, when the setPage is refactored
    db.collection('sites').doc(siteid).collection('pages').doc(pageid).get().then((doc) => {
      if (doc.exists) {
        context.commit('setPage', { pageid: pageid, data: doc.data() })
      }
    })
  },
  getPages (context, { siteid }) {
    // console.log('binder/getPages', siteid)
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
    }).catch(function (error) {
      // console.log(error.code)
      if (error.code === 'permission-denied') context.commit('error', '403', { root: true })
      else context.commit('error', error, { root: true })
    })
  },
  /**
   * Gets all sites from firebase to binder. Does not clear site cache, but does overwite all
   * site objects in binder.state.sites
   * @param {Vuex} context Vuex context
   */
  getSites (context) {
    // console.log('binder/getSites')

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
    // console.log('binder/getFullSite', siteid)
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
          // console.log('got', site)
          context.commit('patchSites', { id: siteid, data: site, current: siteid })
        })
      })
    })
  },
  createPage (context, { pageid, name, content, siteid,
    creator, creatorNick }) {
    console.log('binder/createPage', pageid, name, content, siteid, creator, creatorNick)
    // Sanity
    if (!exists(pageid)) return
    if (!exists(siteid)) return
    if (!exists(creator)) return
    if (!exists(creatorNick)) return

    // console.log('updating firestore for', siteid, pageid)

    var u = {
      creator: creator,
      creatorNick: creatorNick,
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)
    siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })

    // Ask Firebase to create the page
    pageRef.set(u).then((e) => {
      // BFF: stamp pagelog
      context.dispatch('pagelog/stamp', {
        creator: u.creatorNick,
        action: 'create',
        pageid: pageid,
        siteid: siteid }, { root: true })
      // Binder state management: open created page as the current page
      context.dispatch('openPage', { siteid: siteid, pageid: pageid })
    })
  },
  /**
   * Creates the site
   *
   * siteid: this.newSiteid,
   * name: this.newSiteid,
   * content: '# ' + this.newSiteName,
   * owner: this.$store.state.creator.uid,
   * ownerNick: this.$store.state.creator.nick
   *
   * @param {*} context vuex object
   * @param {*} param1 object
   */
  createSite (context, { siteid, name, owner, ownerNick }) {
    if (!exists(siteid)) return
    if (!exists(owner)) return
    if (!exists(ownerNick)) return
    // console.log('binder/createSite', siteid)

    const s = {
      name: name,
      siteid: siteid,
      writelock: false,
      hidden: false
    }
    const o = {
      nick: ownerNick
    }

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).set(s)
    db.collection('sites').doc(siteid).collection('owners').doc(owner).set(o)
  },
  updatePage (context, { pageid, name, content, siteid,
    creator, creatorNick }) {
    // console.log(pageid, name, content, siteid, creator, creatorNick)
    // Sanity
    if (!exists(pageid)) return
    if (!exists(siteid)) return
    if (!exists(creator)) return
    if (!exists(creatorNick)) return

    // console.log('updating firestore for', siteid, pageid)

    var u = {
      creator: creator,
      creatorNick: creatorNick,
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)
    siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
    pageRef.update(u).then((e) => {
      context.dispatch('pagelog/stamp', {
        creator: u.creatorNick,
        action: 'update',
        pageid: pageid,
        siteid: siteid }, { root: true })
      // Binder state management: open created page as the current page
      context.dispatch('openPage', { siteid: siteid, pageid: pageid })
    })
  }
}

function exists (a) {
  return a !== null && typeof a !== 'undefined'
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
