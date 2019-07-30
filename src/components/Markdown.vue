<template>
    <div v-html="markdown"></div>
</template>
<script>
export default {
  props: ['content'],
  computed: {
    markdown () {
      var mdt = this.content
      if (Object.prototype.hasOwnProperty.call(mdt, 'markdown')) {
        const MarkdownIt = require('markdown-it')
        var md = new MarkdownIt()
        const r = md.render(mdt.markdown)

        // console.log(r)
        return r
      }
      return '<p>- empty -</p>'
    }
  }
}
</script>
