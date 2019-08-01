<template>
    <v-container
        fluid grid-list-xs
      >
        <v-layout
        >
          <v-flex xs12>
          <Markdown v-bind:content="page" class='md-rended'/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 class="pink lighten-5">
          Last edit by: {{lasteditor}}, created by {{creator}}
          </v-flex>
        </v-layout>
        <v-btn
      bottom
      color="blue"
      dark
      fab
      fixed
      right
      v-bind:to="'../edit/'+name"
    >
      <v-icon>mdi-code-array</v-icon>
    </v-btn>
      </v-container>
</template>
<script>
import Markdown from '../components/Markdown'

export default {
  props: ['name'],
  data: () => ({
    content: { Content: '# A heading! \n\n And text!\n' }
  }),
  created () {
    this.updatePage(this.name)
  },
  methods: {
    updatePage (name) {
      name = name || 'skald.welcome'
      // console.log('using: ' + this.name)
      this.$store.dispatch('getPage', name)
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.name)
    }
  },
  computed: {
    page () {
      return this.$store.state.page || '- page not initiated -'
    },
    lasteditor () {
      const t = this.$store.state.page.creators
      if (t == null || t.length === 0) return 'none'
      return t[t.length - 1].nick
    },
    creator () {
      const t = this.$store.state.page.creators
      if (t == null || t.length === 0) return 'none'
      return t[0].nick
    }
  },
  components: {
    Markdown
  }
}
</script>
<style>
.md-rended table td{
  background-color: RGBA(50, 100, 200, 0.1);
  padding: 0.5em;
}
.md-rended table th{
  background-color: RGBA(50, 100, 200, 0.3);
  padding: 0.5em;
}
</style>
