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

      const MarkdownIt = require('markdown-it')
      var md = new MarkdownIt()
      console.log('index:' + mdt.indexOf('\\'))
      const r = md.render(mdt)

      return r
    }
  }
}
</script>
