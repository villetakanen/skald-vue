import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  latest: []
}
const actions = {
  init (context) {
    console.log('pagelog/init')
    const db = firebase.firestore()

    db.collection('pagelog').orderBy('timestap').limit(10).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchLof', { data: doc.data() })
      })
    }).catch(function (error) {
      context.commit('error', error, { root: true })
    })
  }
}
export default {
  actions,
  state,
  namespaced: true,
  created () {
    console.log('pagelog created')
  }
}
