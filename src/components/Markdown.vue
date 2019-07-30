<template>
    <div v-html="markdown"></div>
</template>
<script>
export default {
  computed: {
    markdown () {
      var mdt = { markdown: '# Markdown! \n\n and some text!\n' }
      if (Object.prototype.hasOwnProperty.call(mdt, 'markdown')) {
        var md = window.markdownit()
        const r = md.render(mdt.markdown)

        // console.log(r)
        return r
      }
      return '<p>- empty -</p>'
    }
  }
}
</script>
