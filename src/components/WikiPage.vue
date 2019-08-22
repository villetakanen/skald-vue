<template>
  <div class="wikipage">
    <div :class="this.theme">
      <component v-bind:is="rended"></component>
    </div>
  </div>
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
    'title'],
  components: {
    ViewAttachment,
    Breadcrumbs
  },
  computed: {
    dark () {
      // if (this.theme === 'Scifi') return 'dark'
      return null
    },
    rended () {
      var page = this.page
      page = wikiLinks(page, this.siteid)
      page = siteLinks(page)

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      page = md.render(page, this.siteid)

      page = attachLinks(page, this.siteid)
      page = diceTags(page)

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
  return s.toLowerCase()
}
function attachLinks (page, siteid) {
  const re = new RegExp('([\\[(]attach:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    if (p2.includes(':')) {
      const parts = p2.split(':')
      if (parts[1].trim() === 'wide') return `<ViewAttachment wide="margin:0 -16px" path="${siteid}/${parts[0]}"/>`
      if (parts[1].trim() === 'sm') return `<ViewAttachment wide="height:128px" path="${siteid}/${parts[0]}"/>`
      if (parts[1].trim() === 'xs') return `<ViewAttachment wide="height:56px;width:56px" path="${siteid}/${parts[0]}"/>`
    }
    return `<ViewAttachment wide="text-align:center" path="${siteid}/${p2}"/>`
  })
}
function diceTags (page) {
  return page.replace('[d6]', '<i aria-hidden="true" class="v-icon notranslate mdi mdi-dice-d6 theme--light"></i>')
}
</script>
<style>
.wikipage h1,
.wikipage h2{
  font-weight: 300;
  color:#006db3; /* 26a69a;*/
  margin-bottom: 8px;
  margin-top: 8px;
}
.wikipage h3,
.wikipage h4{
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.wikipage ol,
.wikipage ul {
  border-left: 3px solid #F0F0F0;
  margin-left: 0;
  padding-left: 29px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.wikipage ol,
.wikipage ul {
-webkit-column-break-inside: avoid;
          page-break-inside: avoid;
               break-inside: avoid;
}
/*
.wikipage .Scifi h1{
  color:aquamarine;
}
.wikipage .Scifi p{
  color: white;
} */
.wikipage .Silvertide h1,
.wikipage .Silvertide h2,
.wikipage .Silvertide h3,
.wikipage .Silvertide h4{
  font-family: 'Josefin Sans', Arial, sans-serif;
  color: #005b9f;
  padding-bottom:4px;
  padding-top:4px;
}
.wikipage .Silvertide h1,
.wikipage .Silvertide h2{
  -webkit-column-span: all;
  column-span: all;
}
.wikipage .Silvertide h3,
.wikipage .Silvertide h4{
  color: #455a64;
}
.wikipage .Silvertide a {
  color: #005b9f;
  text-decoration: none;
  background-color:rgba(0,91,159,0.1)
}
.wikipage .Silvertide div{
  font-family: 'Open Sans', sans-serif;
  color: #232323;
}
@media only screen and (min-width: 1024px) {
  .wikipage .Silvertide div,
  .wikipage .Scifi div{
    columns: 2;
  }
  .wikipage .Scifi h1,
  .wikipage .Scifi h2 {
    column-span: all;
  }
}
</style>
