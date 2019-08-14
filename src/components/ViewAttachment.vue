<template>
    <div>
        <img style="max-width:100%" v-if="!loading" :src="url"/>
        <p v-if="loading"><i>{{message}}</i>
          &nbsp;<v-btn @click="uploader" color="primary" text>upload it</v-btn>
        </p>
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
  props: [
    'path'
  ],
  data: () => ({
    loading: true,
    url: '',
    message: 'Loading...'
  }),
  created () {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage()

    var pathRef = storage.ref(this.path)

    pathRef.getDownloadURL().then((url) => {
      this.url = url
      this.loading = false
    }).catch((err) => {
      this.message = this.path + ' not found.'
      console.log(err.message)
    })
  }
}
</script>
