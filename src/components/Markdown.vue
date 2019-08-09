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
    var link = p2
    if (link.includes(' ')) {
      var re = new RegExp('[\\W]', 'g')
      var s = link.replace(re, '-')
      while (s.includes('--')) {
        s = s.split('--').join('-')
      }
      link = s
    }
    if (p2.includes('/')) {
      return '[' + p2 + '](/#/v/' + link + ')'
    }
    return '[' + siteid + '/' + p2 + '](/#/v/' + siteid + '/' + link + ')'
  })
  return c
}
function metalinks (c, siteid) {
  const re = new RegExp('([\\[(]meta:)(.+?)([\\])])', 'g')
  c = c.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    if (p2 === 'site') {
      return '[' + siteid + '](/#/v/' + siteid + ')'
    }
    return p2
  })
  return c
}
function stats (c) {
  const re = new RegExp('([\\[]stats:)(.+?)([\\]])', 'g')
  c = c.replace(re, function (match, p1, p2, p3, offset, string) {
    var stats = '<table class="statblock">'
    var statT = p2.trim().split(' ')
    statT.forEach((a) => {
      if (a.includes('(') && a.includes(')')) {
        stats += '<tr><th class="stat">' + a.substring(0, a.indexOf('(')) + '</th>'
        if (a.includes('/')) {
          stats += '<td class="stat">' + a.substring(a.indexOf('(') + 1, a.indexOf('/')) + '</td>'
          stats += '<td class="bonus">' + a.substring(a.indexOf('/') + 1, a.indexOf(')')) + '</td></tr>'
        } else {
          stats += '<td colspan="2" class="stat">' + a.substring(a.indexOf('(') + 1, a.indexOf(')')) + '</td></tr>'
        }
      } else {
        stats += '<tr><th class="stat" colspan="3">' + a + '</th></tr>'
      }
    })
    return stats + '</table>'
  })
  // const stats = '<table>' + c + '</table>'
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
      // console.log(this.page)
      var mdt = this.page.content || '\\- empty -'

      mdt = mdt.split('\\n').join('\n')

      mdt = wikilinks(mdt, this.page.site)
      mdt = metalinks(mdt, this.page.site)

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
      var r = md.render(mdt2)

      // console.log('before', r)

      r = stats(r)

      // console.log('after', r)

      return r
    }
  }
}
</script>
<style>
div.md-rended p{
  column-count: 2;
  column-gap: 2em;
}
.statblock td {
  /* border: 3px solid; */
  background-color: white;
  font-weight: 700;
  text-align: center;
}
table.statblock th.stat {
  background-color: #ffe54c;
  background-color: #546e7a;
  background-color:#819ca9;
}
.statblock td.stat {
  background-color: #ffb300;
  background-color: #29434e;
  color: white;
  border: none;
}
.statblock td.bonus {
  border: #29434e solid 2pt;
  background-color:#eceff1;
  color: #29434e;
  /* color: #c68400; */
}
.skald h1,
.skald h2{
  font-weight: 400;
  color: #232323;
}
.skald p,
.skald td{
  color: #424242;
}
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
