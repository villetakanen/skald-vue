import * as firebase from 'firebase'

function init (config) {
  firebase.initializeApp(config)
}

function getPage (name) {
  const db = firebase.firestore()
  // var user = firebase.auth().currentUser

  var docRef = db.collection('pages').doc(name)

  var r = docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log('Document data:', doc.data())
      console.log('Document Contetn:', doc.data().Content)
      return doc.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }).catch(function (error) {
    console.log('Error getting document:', error)
  })

  /* db.collection('pages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        context.commit('updateBook', doc.data())
      })
    }) */

  return r
}

const firestore = {
  init,
  getPage
}
export default firestore
