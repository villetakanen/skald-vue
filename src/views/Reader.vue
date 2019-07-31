<template>
    <v-container
        fluid
        fill-height
      >
        <v-layout
        >
          <Markdown v-bind:content="page" class='md-rended'/>
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
