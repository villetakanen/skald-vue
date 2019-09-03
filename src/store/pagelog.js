import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  latest: [],
  userLog: {},
  all: []
}
const getters = {
  /**
   * Returns pagelog (filtered with user if needed)
   */
  latest: (context) => (count) => {
    const latestArray = context.all// .reverse()
    if (count === null) count = 10
    if (count > context.all.length) count = context.all.length
    return latestArray.slice(0, count)
  }
}
const mutations = {
  reset (context) {
    Vue.set(state, 'latest', [])
  },
  patchLog (context, { data }) {
    // Add to all if not found
    if (context.all.length === 0) context.all.push(data)
    else {
      var filtered = context.all.filter((value, index, arr) => {
        if ((value.siteid + '.' + value.pageid) === (data.siteid + '.' + data.pageid)) {
          // console.log('found, replacing', value.pageid)
          return false
        }
        return true
      })
      filtered = filtered.reverse()
      filtered.push(data)
      filtered = filtered.reverse()
      Vue.set(context, 'all', filtered)
    }
    // console.log('context.all', context.all)

    // console.log('patchLog', data)
    var l = context.latest
    var r = [data]
    for (var i in l) {
      if (!(l[i].pageid === data.pageid && l[i].pageid === data.pageid)) r.push(l[i])
      if (i > 9) break
    }
    // console.log('patchLog', r)
    // if (!l.includes(data)) l.push(data)
    Vue.set(state, 'latest', r)
  },
  patchUserLog (context, { nick, data }) {
    // console.log('patchUserLog', nick, data)
    var l = context.userLog[nick]
    if (typeof l === 'undefined') l = []
    var r = [data]
    for (var i in l) {
      if (!(l[i].pageid === data.pageid && l[i].pageid === data.pageid)) r.push(l[i])
      if (i > 8) break
    }
    // if (!l.includes(data)) l.push(data)
    Vue.set(state.userLog, nick, r)
  }
}
const actions = {
  init (context) {
    console.log('pagelog/init')

    context.commit('reset')

    const db = firebase.firestore()

    db.collection('pagelog').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      // .limit(20)ß
      querySnapshot.forEach((doc) => {
        context.commit('patchLog', { data: doc.data() })
      })
    }).catch(function (error) {
      context.commit('error', error, { root: true })
    })
  },
  loadUserLog (context, { nick }) {
    console.log('pagelog/loadUserLog')
    const db = firebase.firestore()

    db.collection('pagelog').where('nick', '==', nick).orderBy('timestamp').limit(10).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchUserLog', { nick: nick, data: doc.data() })
      })
    }).catch(function (error) {
      context.commit('error', error, { root: true })
    })
  },
  stamp (context, { action, pageid, siteid, creator }) {
    console.log('pagelog/stamp', action, pageid, siteid, creator)
    // Sanity
    if (!exists(pageid)) return
    if (!exists(siteid)) return
    if (!exists(creator)) return
    if (!exists(action)) return

    // console.log('updating firestore for', siteid, pageid)

    var log = {
      action: action,
      pageid: pageid,
      siteid: siteid,
      creator: creator,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var logRef = db.collection('pagelog').doc(siteid + '.' + pageid)
    logRef.set(log).then((a) => {
      context.dispatch('init')
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
  state,
  namespaced: true,
  created () {
    console.log('pagelog created')
  }
}
