<template>
    <v-container
        fluid
        fill-height
      >
        <v-layout
        >
          <Markdown v-bind:content="page"/>
        </v-layout>
      </v-container>
</template>
<script>
import Markdown from '../components/Markdown'
// import firestore from '../firestore.js'
// import firebase from 'firebase'

export default {
  data: () => ({
    content: { Content: '# A heading! \n\n And text!\n' },
    firestore_content: { Content: '- waiting for firestore to respond -' },
    name: 'index'
  }),
  created () {
    this.$store.dispatch('getPage', 'index')
  },
  /* methods: {
    firestore_update () {
      console.log('before: ', this.firestore_content)

      const db = firebase.firestore()

      var docRef = db.collection('pages').doc(this.name)

      docRef.get().then(function (doc, d) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
          this.setDoc(doc.data())
          d = doc.data()
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
      /* var r = firestore.getPage('index')
      console.log('c is: ', r) * /
      console.log('updated: ', this.firestore_content)
}, * /
    setDoc (d) {
      console.log('inbetween: ', d)
    }
}, */
  computed: {
    page () {
      return this.$store.state.page || '- page not initiated -'
    }
  },
  components: {
    Markdown
  }
}
</script>
