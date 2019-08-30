<template>
  <v-card
    outlined>
    <v-toolbar
      dense
      flat
      style="border-bottom:solid 1px #efefef;">

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-btn
        v-if="isAuthz"
        color="secondary"
        small
        absolute
        bottom
        right
        fab
        v-bind:to="editlink"
        elevation="0">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

    </v-toolbar>
    <v-card-text>
      <WikiPage
        :page="content"
        :theme="theme"
        :siteid="siteid"
        :title="title"/>
      <p style="margin: 0; color: silver; font-style: italic">{{$t("page-infoLastEdit")}} {{lastEditDate}}</p>
    </v-card-text>
  </v-card>
</template>
<script>
import WikiPage from '../components/WikiPage'

export default {
  props: [
    'pageid',
    'siteid',
    'title',
    'theme',
    'content'
  ],
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz
    },
    editlink () {
      var page = this.pageid
      if (typeof page === 'undefined') {
        page = this.siteid
        // console.log('Pageid defaulted to', page)
      }
      return '/e/' + this.siteid + '/' + page
    },
    lastEditDate () {
      const t = this.$store.getters['binder/lastChange']()
      if (t === null) return '-'
      const s = t.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
  },
  components: {
    WikiPage
  }
}
</script>
