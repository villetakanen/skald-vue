<template>
  <v-card>
    <v-card-title><span style="font-size:22px;color:grey">{{title}}</span><v-spacer></v-spacer><Breadcrumbs v-if="crumbs"/></v-card-title>
    <v-card-text>
      <hr style="margin-bottom:10px"/>
      <div :class="this.theme">
        <component v-bind:is="rended"></component>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import Breadcrumbs from './Breadcrumbs'
import ViewAttachment from './ViewAttachment.vue'
import Vue from 'vue'
Vue.component('ViewAttachment', ViewAttachment)

export default {
  props: [
    'page',
    'theme',
    'siteid',
    'title',
    'crumbs'],
  components: {
    ViewAttachment,
    Breadcrumbs
  },
  computed: {
    rended () {
      var page = this.page
      page = wikiLinks(page, this.siteid)
      page = siteLinks(page)

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      page = md.render(page, this.siteid)

      page = attachLinks(page, this.siteid)

      // page = '<template><div>' + page + '<v-icon>mdi-eye</v-icon></div></template>'

      return {
        template: '<div>' + page + '</div>'
      }
    }
  }
}
function wikiLinks (page, siteid) {
  const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    // First we ned to separate written and linked part
    var link = p2
    // If link contains a site id, we use it, if not, we use the parameter siteid
    if (link.includes('/')) {
      const parts = link.split('/')
      return `[${p2}](/#/v/${toURI(parts[0])}/${toURI(parts[1])})`
    } else {
      return `[${p2}](/#/v/${siteid}/${toURI(link)})`
    }
  })
}
function siteLinks (page) {
  const re = new RegExp('([\\[(]site:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    return `[${p2}](/#/v/${toURI(p2)})`
  })
}
function toURI (link) {
  var re = new RegExp('[\\W]', 'g')
  var s = link.replace(re, '-')
  while (s.includes('--')) {
    s = s.split('--').join('-')
  }
  return s
}
function attachLinks (page, siteid) {
  const re = new RegExp('([\\[(]attach:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    if (p2.includes('|')) {
      const parts = p2.split('|')
      return `<ViewAttachment wide="margin:0 -16px" path="${siteid}/${parts[0]}"/>`
    } else {
      return `<ViewAttachment wide="text-align:center" path="${siteid}/${p2}"/>`
    }
  })
}
</script>
