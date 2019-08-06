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
        v-bind:to="editlink"
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
  props: ['pageid', 'siteid'],
  created () {
    this.updatePage(this.siteid, this.pageid)
  },
  methods: {
    updatePage (siteid, pageid) {
      if (typeof this.pageid === 'undefined') {
        this.pageid = this.siteid
        console.log('Pageid defaulted to', this.pageid)
      }
      console.log('Reader switching to', siteid, pageid)
      if (typeof pageid === 'undefined') {
        pageid = siteid
        console.log('Pageid defaulted to', pageid)
      }
      this.$store.dispatch('page/getPage', { siteid: siteid, pageid: pageid })
      // --
      /* var id = 'skald.welcome'
      if (pageid !== null &&
        typeof pageid !== 'undefined') id = pageid
      var theme = 'Skald'
      if (typeof this.$store.state.sites.list[this.siteid] !== 'undefined') theme = this.$store.state.sites.list[this.siteid].theme
      this.$store.commit('setSite', { s: this.siteid, t: theme }) */
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  computed: {
    editlink () {
      var page = this.pageid
      if (typeof page === 'undefined') {
        page = this.siteid
        console.log('Pageid defaulted to', page)
      }
      return '/e/' + this.siteid + '/' + page
    },
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
      // console.log('reader got theme', this.$store.state.theme)
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
</style>
