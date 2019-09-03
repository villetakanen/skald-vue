<template>
  <v-container
    fluid
    grid-list-md>

    <v-layout
      column
      align-center
      v-if="loading">
      <v-flex>
        <Spinner :text="$t('contentLoading')"/>
      </v-flex>
    </v-layout>

    <template v-if="!loading">
      <v-layout wrap>
        <v-flex xs12 md8>
          <CardReader
            :content='page'
            :theme='theme'
            :siteid='siteid'
            :pageid='pageid'
            :title="title"/>
        </v-flex>
        <v-flex xs12 md4>
          <WikiPage
            :page='sidebar'
            :theme='theme'
            :siteid='siteid'/>
            <div v-if="isAuthz" style="text-align:right" class="mx-4">
          <v-btn
            :to="`/e/${siteid}/sidebar`"
            text
            color="primary">{{$t('editSidebar')}}</v-btn>
            </div>
        </v-flex>
        <v-flex xs12>
          <CardLastChanges/>
        </v-flex>
      </v-layout>
      <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            elevation="0"
            color="primary"
            @click="toTop"
          ><v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </template>
    <v-dialog
      v-model="notfound"
      max-width="800"
      >
      <PageNotFound
        :pageid="pageid"
        :siteid="siteid"
        v-on:closeDialog="closePNFDialog"/>
    </v-dialog>
  </v-container>
</template>
<script>
import Spinner from '../components/Spinner'
import WikiPage from '../components/WikiPage'
import CardLastChanges from '../components/CardLastChanges'
import CardReader from '../components/CardReader'
import PageNotFound from '../components/dialog/PageNotFound'

export default {
  props: ['pageid', 'siteid'],
  created () {
    this.updatePage(this.siteid, this.pageid)
    // TODO: we need to do all these in the updatePage, or better yet, vuex
    // this.$store.dispatch('pagelog/init')
    // TODO: we need to do all these in the updatePage, or better yet, vuex
    // this.$store.dispatch('binder/getPages', { siteid: this.siteid })
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    updatePage (siteid, pageid) {
      // TODO: we need to do all these in the updatePage, or better yet, vuex
      // console.log('updatePage', siteid, pageid)
      // if (siteid === null ||
      // typeof siteid === 'undefined') {
      //   siteid = 'skald'
      // }
      // if (pageid === null ||
      // typeof pageid === 'undefined') {
      //   pageid = siteid
      // }
      // console.log('getting', siteid, pageid)
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })
    },
    closePNFDialog () {
      this.notfound = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  data: () => ({
    fab: false,
    notfound: false
  }),
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
      return this.$store.getters['binder/content']()
    },
    sidebar () {
      return this.$store.getters['binder/sidebar']()
    },
    loading () {
      return this.$store.state.binder.page === null
    },
    isAuthz () {
      return this.$store.getters.isAuthz
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
    Spinner,
    WikiPage,
    CardLastChanges,
    CardReader,
    PageNotFound
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'httpStatusCode':
          this.notfound = true
          console.log('httpStatusCode dialog should show')
          break
      }
    })
  }
}
</script>
