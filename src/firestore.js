/* import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

function init (config) {
  firebase.initializeApp(config)
  firebase.firestore().enablePersistence()
    .catch(function (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    })
}

function getPage (name) {
  const db = firebase.firestore()
  // var user = firebase.auth().currentUser

  var docRef = db.collection('pages').doc(name)

  var r = docRef.get().then(function (doc) {
    if (doc.exists) {
      // console.log('Document data:', doc.data())
      // console.log('Document Contetn:', doc.data().Content)
      return doc.data()
    } else {
      // doc.data() will be undefined in this case
      // console.log('No such document!')
    }
  }).catch(function (error) {
    console.log('Error getting document:', error)
  })

  /* db.collection('pages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        context.commit('updateBook', doc.data())
      })
    }) * /

  return r
}

const firestore = {
  init,
  getPage
}
export default firestore
*/
