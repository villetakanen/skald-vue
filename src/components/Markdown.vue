<template>
    <div v-html="markdown"></div>
</template>
<script>

export default {
  props: [
    'content'],
  computed: {
    markdown () {
      var mdt = this.content.Content || '\\- empty -'

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
      const siteName = this.content.Site

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
