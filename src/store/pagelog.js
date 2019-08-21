import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  latest: []
}
const mutations = {
  patchLog (context, { data }) {
    console.log('patchLog', data)
    var l = context.latest
    var r = [data]
    for (var i in l) {
      if (!(l[i].pageid === data.pageid && l[i].pageid === data.pageid)) r.push(l[i])
      if (i > 9) break
    }
    // if (!l.includes(data)) l.push(data)
    Vue.set(state, 'latest', r)
  }
}
const actions = {
  init (context) {
    console.log('pagelog/init')
    const db = firebase.firestore()

    db.collection('pagelog').orderBy('timestamp').limit(10).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchLog', { data: doc.data() })
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
    var logRef = db.collection('pagelog').doc()
    logRef.set(log)
  }
}
function exists (a) {
  return a !== null && typeof a !== 'undefined'
}

export default {
  actions,
  mutations,
  state,
  namespaced: true,
  created () {
    console.log('pagelog created')
  }
}