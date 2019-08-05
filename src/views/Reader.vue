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
      <v-layout>
        <Breadcrumbs/>
      </v-layout>
      <v-layout class="reader">
        <v-flex xs12 xl12 v-bind:class="{ reader_fonts_fantasy: theme == 'fantasy' }"
          @click="handleClicks">
          <Markdown  v-bind:content="page"
            class='md-rended'/>
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
      var name = pageid || 'skald.welcome'
      // console.log('using: ' + this.name)
      this.$store.dispatch('page/getPage', name)
    },
    handleClicks ($event) {
      /* const { target } = $event
      console.log('event: ' + target)

      // const url = new URL(target.href)
      const to = target + '' // url.pathname

      console.log('to: ' + to.substring('/#/'))

      if (to.includes('/#/') &&
        !window.location.pathname === to) {
        $event.preventDefault()
        this.$router.push(to.substring('/#/'))
      }
      /* // ensure we use the link, in case the click has been received by a subelement
      while (target && target.tagName !== 'A') target = target.parentNode
      // handle only links that occur inside the component and do not reference external resources
      if (target && target.matches(".dynamic-content a:not([href*='://'])") && target.href) {
        // some sanity checks taken from vue-router:
        // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
        const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = $event
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) return
        // don't handle when preventDefault called
        if (defaultPrevented) return
        // don't handle right clicks
        if (button !== undefined && button !== 0) return
        // don't handle if `target="_blank"`
        /* if (target && target.getAttribute) {
          const linkTarget = target.getAttribute('target')
          if ('/\b_blank\b/i.test(linkTarget)) return
        } * /
        // don't handle same page links/anchors
        const url = new URL(target.href)
        const to = url.pathname
        if (window.location.pathname !== to && $event.preventDefault) {
          $event.preventDefault()
          this.$router.push(to)
        }
      } */
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
      // console.log('p: ', this.$store.state.page)
      // return { Content: null }
      return this.$store.state.page
    },
    lasteditor () {
      const t = this.$store.state.page.Creators
      if (t == null || t.length === 0) return 'none'
      return t[t.length - 1].Nick
    },
    creator () {
      const t = this.$store.state.page.Creators
      if (t == null || t.length === 0) return 'none'
      return t[0].Nick
    },
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
