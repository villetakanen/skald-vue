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
          <v-card
            outlined>
            <v-toolbar
              dense
              flat
              style="border-bottom:solid 1px #efefef;">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-btn
                  v-if="isAuthz"
                  color="secondary"
                  small
                  absolute
                  bottom
                  right
                  fab
                  v-bind:to="editlink"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
            <WikiPage
            :page='page'
            :theme='theme'
            :siteid='siteid'/>
            </v-card-text>
            </v-card>
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
      </v-layout>
      <v-layout>
        <v-flex>
          <CardPageInfo/>
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
            color="primary"
            @click="toTop"
          ><v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>
<script>
import Spinner from '../components/Spinner'
import CardPageInfo from '../components/CardPageInfo'
import WikiPage from '../components/WikiPage'

export default {
  props: ['pageid', 'siteid'],
  created () {
    this.updatePage(this.siteid, this.pageid)
    this.$store.dispatch('binder/getPages', { siteid: this.siteid })
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
      // console.log('updatePage', siteid, pageid)
      if (siteid === null ||
      typeof siteid === 'undefined') {
        siteid = 'skald'
      }
      if (pageid === null ||
      typeof pageid === 'undefined') {
        pageid = siteid
      }
      // console.log('getting', siteid, pageid)
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
      // this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
      this.$store.dispatch('binder/getPages', { siteid: this.siteid })
    }
  },
  data: () => ({
    fab: false
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
      if (this.$store.state.binder.page === null) return ''
      return this.$store.state.binder.page.content
    },
    sidebar () {
      if (typeof this.$store.state.binder.pages['sidebar'] === 'undefined') return ''
      return this.$store.state.binder.pages['sidebar'].content
    },
    loading () {
      return this.$store.state.binder.page === null
    },
    isAuthz () {
      // console.log('isAuthz', this.$store.getters.isAuthz)
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
    CardPageInfo,
    WikiPage
  }
}
</script>
