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
        <v-flex xs12 xl12 v-bind:class="{ reader_fonts_fantasy: theme == 'fantasy' }">
          <Markdown  v-bind:page="page"
            class='md-rended'/>
        </v-flex>
      </v-layout>
        <v-btn
        v-if="displayname"
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
  data: () => ({
    content: { Content: '# A heading! \n\n And text!\n' }
  }),
  created () {
    this.updatePage(this.pageid)
  },
  methods: {
    updatePage (pageid) {
      var id = pageid || 'skald.welcome'
      // console.log('using: ', id)
      this.$store.dispatch('page/getPage', id)
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.pageid)
    }
  },
  computed: {
    theme () {
      // if (typeof this.$store.state.sites === 'undefined') return null
      return this.$store.state.sites.theme
    },
    page () {
      console.log('p: ', this.$store.state.page)
      // return { Content: null }
      return this.$store.state.page
    },
    loading () {
      return this.$store.state.page.content === ''
    },
    /* lasteditor () {
      const t = this.$store.state.page.Creators
      if (t == null || t.length === 0) return 'none'
      return t[t.length - 1].Nick
    },
    creator () {
      const t = this.$store.state.page.Creators
      if (t == null || t.length === 0) return 'none'
      return t[0].Nick
    }, */
    displayname () {
      if (typeof this.$store.state.user === 'undefined' || this.$store.state.user === null) {
        return null
      }
      return this.$store.state.user.displayName
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
