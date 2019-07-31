<template>
    <v-container
        fluid
        fill-height
      >
        <v-layout
        >
          <Markdown v-bind:content="page"/>
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
      name = name || 'index'
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
