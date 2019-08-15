<template>
  <v-container fluid>
    <v-layout wrap>
      <v-card xs12 md12>
        <v-card-title>{{siteid}} {{$t('attachments')}}</v-card-title>
        <v-card-text>
            <table>
          <template v-for="(file, index) in files">
            <tr v-bind:key="index">
              <td>
              <a v-if="file.url" :href="file.url">{{file.name}}</a>
              <span v-if="!file.url">{{file.name}}</span>
              </td>
              <td>
              <span style="font-family: monospace">[attach:{{file.name}}]</span>
              </td>
            </tr>
          </template>
          </table>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
import Vue from 'vue'

export default {
  props: [
    'siteid'
  ],
  data: () => ({
    files: []
  }),
  created () {
    const storage = firebase.storage()

    const sRef = storage.ref()

    const siteRef = sRef.child(this.siteid)

    // console.log(siteRef)

    siteRef.listAll().then((res) => {
      // console.log(res)
      res.items.forEach((itemRef) => {
        // console.log(itemRef)
        this.files.push({ name: itemRef.name })
        itemRef.getDownloadURL().then((url) => {
          for (const i in this.files) {
            if (this.files[i].name === itemRef.name) {
              // console.log(itemRef.name, url)
              Vue.set(this.files[i], 'url', url)
            }
          }
        })
      })
    })

    /* siteRef.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        this.files.push(itemRef)
      })
    }).catch((error) => {
      console.log(error)
    }) */
  }
}
</script>
