<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
      <CardReader
        :content='content'
        theme='skald'
        siteid='u'
        :pageid='nick'
        :title="nick"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CardReader from '../components/CardReader'

export default {
  props: [
    'uid',
    'nick'
  ],
  components: {
    CardReader
  },
  computed: {
    /* nick () {
      return this.$store.state.creator.nick
    } */
    content () {
      if (this.$store.state.binder.page === null) return ''
      return this.$store.state.binder.page.content
    }
  },
  created () {
    this.$store.dispatch('binder/openPage', { siteid: 'u', pageid: this.nick })
    this.$store.dispatch('pagelog/loadUserLog', { nick: this.nick })
  }
}
</script>
