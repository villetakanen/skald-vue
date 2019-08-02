<template>
  <v-container
    fluid
    >
    <v-layout
      v-if="!page.Content"
      column
      align-center justify-center row fill-height
      >
      <v-flex>
        <img class="loader_image" src="../assets/loading.svg"/>
      </v-flex>
    </v-layout>
    <template v-if="page.Content">
      <v-layout class="reader">
        <v-flex xs12 xl12 v-bind:class="{ reader_fonts_fantasy: theme == 'fantasy' }">
          <Markdown  v-bind:content="page" class='md-rended'/>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md6 lg6 xl6>
          <v-card
            outlined
            >
            <v-card-title>Page info</v-card-title>
            <v-card-text>Last edit by: {{lasteditor}}<br/>
              Created by {{creator}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
        <v-btn
        v-if="displayname"
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
    </template>
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
    theme () {
      return this.$store.state.sites.theme
    },
    page () {
      console.log('p: ', this.$store.state.page)
      // return { Content: null }
      return this.$store.state.page
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
    },
    displayname () {
      if (typeof this.$store.state.user === 'undefined' || this.$store.state.user === null) {
        return null
      }
      return this.$store.state.user.displayName
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
