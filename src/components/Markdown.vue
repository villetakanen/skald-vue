<template>
  <div :class="selectedTheme">
    <div v-html="markdown"></div>
  </div>
</template>
<script>

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
      var mdt = this.page.content || '\\- empty -'

      mdt = mdt.split('\\n').join('\n')

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
</style>
