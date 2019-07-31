<template>
    <div v-html="markdown"></div>
</template>
<script>
export default {
  props: ['content'],
  computed: {
    markdown () {
      var mdt = this.content.Content || '\\- empty -'

      mdt = mdt.split('\\n').join('\n')

      // add wikilinks
      mdt = mdt.split(' ').map(
        function (line) {
          if (line.startsWith('wiki:')) {
            const link = line.substring(5)
            const linktext = link.split('.').join('/')
            return '[' + linktext + '](./pages/' + link + ')'
          }
          return line
        }
      ).join(' ')

      const MarkdownIt = require('markdown-it')
      var md = new MarkdownIt()
      const r = md.render(mdt)

      return r
    }
  }
}
</script>
