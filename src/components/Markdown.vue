<template>
  <div :class="selectedTheme">
    <div v-html="markdown" class="md-rended"></div>
  </div>
</template>
<script>

function wikilinks (c, siteid) {
  const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'g')
  c = c.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    if (p2.includes('/')) {
      return '[' + p2 + '](/#/v/' + p2 + ')'
    }
    return '[' + siteid + '/' + p2 + '](/#/v/' + siteid + '/' + p2 + ')'
  })
  return c
}

export default {
  props: [
    'page',
    'theme'],
  computed: {
    selectedTheme () {
      if (this.theme === 'DD5') return 'ddfive'
      return 'skald'
    },
    markdown () {
      console.log(this.page)
      var mdt = this.page.content || '\\- empty -'

      mdt = mdt.split('\\n').join('\n')

      mdt = wikilinks(mdt, this.page.site)

      /* / add wikilinks
      mdt = mdt.split(' ').map(
        function (line) {
          if (line.startsWith('wiki:')) {
            const link = line.substring(5)
            const linktext = link.split('.').join('/')
            return '[' + linktext + '](/#/page/' + link + ')'
          }
          return line
        }
      ).join(' ') */
      const siteName = this.page.site

      var re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'g')
      var mdt2 = mdt.replace(re, function (match, p1, p2, p3, offset, string) {
        // console.log(p2)
        var pageName = p2.trim()
        if (!pageName.includes('.')) pageName = siteName + '.' + pageName
        return '[' + p2.trim() + '](/#/page/' + pageName + ')'
      })

      const MarkdownIt = require('markdown-it')
      var md = new MarkdownIt()
      const r = md.render(mdt2)

      return r
    }
  }
}
</script>
<style>
.ddfive h1,
.ddfive h2{
  font-family: 'Lacquer', sans-serif;
  line-height: 2em;
  color: crimson;
}
.ddfive p {
  font-family: 'Libre Caslon Text', serif;
  color: darkblue;
}
.ddfive div {
  background-color: blanchedalmond;
  padding: 0.5em;
}
.md-rended table td{
  background-color: RGBA(50, 100, 200, 0.1);
  padding: 0.5em;
}
.md-rended table th{
  background-color: RGBA(50, 100, 200, 0.3);
  padding: 0.5em;
}
</style>
