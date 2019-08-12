import firebase from 'firebase'
// import Vue from 'vue'

const state = {
  all: []
}
const getters = {
  nonOwners: (state) => (siteid) => {
    if (state.all === {}) return {}
    var a = state.all
    console.log(a)
    return a.filter(owns => Object.prototype.hasOwnProperty.call(owns, siteid))
  }
}
const actions = {
  getAll () {
    console.log('users/getAll')

    const db = firebase.firestore()
    db.collection('profiles').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('setting user', doc.id, doc.data())
        var u = doc.data()
        u.uid = doc.id
        state.all.push(u)
        // Vue.set(state.all, doc.data().nick, u)
      })
    })
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  state
}
