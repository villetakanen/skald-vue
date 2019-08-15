<template>
  <v-container
    fluid grid-list-md
    >
    <v-layout
      v-if="loading"
      column
      align-center justify-center row fill-height
      >
      <v-flex>
        <Spinner :text="$t('contentLoading')"/>
      </v-flex>
    </v-layout>
    <template v-if="!loading">
      <v-layout wrap class="reader">
        <v-flex xs12 md8>
          <WikiPage
            outlined="outlined"
            :page='page'
            :theme='theme'
            :siteid='siteid'
            :title='title'
            :name='name'
            crumbs='true'/>
        </v-flex>
        <v-flex xs12 md4>
          <WikiPage
            outlined="outlined"
            :page='sidebar'
            :theme='theme'
            :siteid='siteid'
            :title="$t('sidebar')"/>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <CardPageInfo/>
        </v-flex>
      </v-layout>
      <v-btn
        v-if="logged"
        bottom
        color="secondary"
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
// import Breadcrumbs from '../components/Breadcrumbs'
// import Markdown from '../components/Markdown'
import Spinner from '../components/Spinner'
import CardPageInfo from '../components/CardPageInfo'
import WikiPage from '../components/WikiPage'

export default {
  props: ['pageid', 'siteid'],
  created () {
    this.updatePage(this.siteid, this.pageid)
    this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
    this.$store.dispatch('binder/getPages', { siteid: this.siteid })
  },
  methods: {
    updatePage (siteid, pageid) {
      if (typeof this.pageid === 'undefined') {
        this.pageid = this.siteid
        // console.log('Pageid defaulted to', this.pageid)
      }
      // console.log('Reader switching to', siteid, pageid)
      if (typeof pageid === 'undefined') {
        pageid = siteid
        // console.log('Pageid defaulted to', pageid)
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
      this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
      this.$store.dispatch('binder/getPages', { siteid: this.siteid })
    }
  },
  computed: {
    editlink () {
      var page = this.pageid
      if (typeof page === 'undefined') {
        page = this.siteid
        // console.log('Pageid defaulted to', page)
      }
      return '/e/' + this.siteid + '/' + page
    },
    page () {
      if (this.$store.state.binder.page === null) return ''
      return this.$store.state.binder.page.content
    },
    sidebar () {
      if (typeof this.$store.state.binder.pages['sidebar'] === 'undefined') return ''
      return this.$store.state.binder.pages['sidebar'].content
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
    theme () {
      if (this.$store.state.binder.site === null) return 'skald'
      return this.$store.state.binder.site.theme
    },
    title () {
      if (this.$store.state.binder.page === null) return null
      return this.$store.state.binder.page.name
    }
  },
  components: {
    // Markdown,
    // Breadcrumbs,
    Spinner,
    CardPageInfo,
    WikiPage
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
