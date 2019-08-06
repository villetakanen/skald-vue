<template>
  <v-container
    fluid
    >
    <v-layout
      v-if="loading"
      column
      align-center justify-center row fill-height
      >
      <v-flex>
        <img class="loader_image" src="../assets/loading.svg"/>
      </v-flex>
    </v-layout>
    <template v-if="!loading">
      <v-layout>
        <Breadcrumbs/>
      </v-layout>
      <v-layout class="reader">
        <v-flex xs12 xl12 >
          <Markdown
            v-bind:page="page"
            :theme="selectedTheme"/>
        </v-flex>
      </v-layout>
      <v-btn
        v-if="logged"
        bottom
        color="pink"
        dark
        fab
        fixed
        right
        v-bind:to="'../edit/'+pageid"
        >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>
<script>
import Breadcrumbs from '../components/Breadcrumbs'
import Markdown from '../components/Markdown'

export default {
  props: ['pageid'],
  created () {
    this.updatePage(this.pageid)
  },
  methods: {
    updatePage (pageid) {
      var id = 'skald.welcome'
      if (pageid !== null &&
        typeof pageid !== 'undefined') id = pageid
      this.$store.dispatch('page/getPage', id)
      this.$store.commit('setSite', id.substring(0, id.indexOf('.')))
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.pageid)
    }
  },
  computed: {
    page () {
      return this.$store.state.page
    },
    loading () {
      return this.$store.state.page.content === ''
    },
    logged () {
      if (typeof this.$store.state.user === 'undefined' || this.$store.state.user === null) {
        return null
      }
      return this.$store.state.user.displayName
    },
    selectedTheme () {
      var theme = this.$store.state.theme
      console.log('reader got theme', this.$store.state.theme)
      if (typeof theme === 'undefined') return 'Skald'
      return theme
    }
  },
  components: {
    Markdown,
    Breadcrumbs
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
.loader_image{
  opacity: 0.23;
  -webkit-animation: rotation 7s infinite linear; /**/
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
.reader_fonts_fantasy h1,
.reader_fonts_fantasy h2,
.reader_fonts_fantasy h3
{
  font-family: 'Crimson Pro', serif;
  font-weight: normal;
  color:dimgray;
}
.reader h1,
.reader h2,
.reader h3{
  font-weight: 400;
}
</style>
