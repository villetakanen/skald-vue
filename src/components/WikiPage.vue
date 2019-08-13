<template>
  <v-card>
    <v-card-text>
      <div :class="this.theme">
        <div v-html="rended" class="md-rended"></div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [
    'page',
    'theme',
    'siteid'],
  computed: {
    rended () {
      var page = this.page
      page = wikiLinks(page, this.siteid)
      page = siteLinks(page)

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      page = md.render(page)

      return page
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
</script>
