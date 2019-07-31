<template>
    <div v-html="markdown"></div>
</template>
<script>
export default {
  props: ['content'],
  computed: {
    markdown () {
      var mdt = this.content
      if (mdt != null && Object.prototype.hasOwnProperty.call(mdt, 'Content')) {
        const MarkdownIt = require('markdown-it')
        var md = new MarkdownIt()
        const r = md.render(mdt.Content)

        // console.log(r)
        return r
      }
      return '<p>- empty -</p>'
    }
  }
}
</script>
