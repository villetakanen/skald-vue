<template>
<v-form  @submit.prevent="savePage">
    <v-container
        fluid
      >
        <v-layout wrap justify-end>
            <v-flex xs12 md6>
                <v-textarea
                    solo
                    name="content-editor"
                    auto-grow
                    :value="page"
                    @input="updateContent"
                    ></v-textarea>
             </v-flex>
             <v-flex xs12 md6>
               <v-card>
                 <v-card-text>
                  <Markdown
                    :page="preview"
                    :theme="selectedTheme"/>
                 </v-card-text>
               </v-card>
             </v-flex>
        </v-layout>
        <v-layout>
             <v-flex xs1 align-self-end>
                 <v-btn right color="primary" @click="savePage(pageid)">Save</v-btn>
             </v-flex>
        </v-layout>
    </v-container>
    </v-form>
</template>

<script>
import Markdown from '../components/Markdown'

export default {
  props: ['siteid', 'pageid'],
  created () {
    this.getPage(this.siteid, this.pageid)
  },
  methods: {
    getPage (siteid, pageid) {
      // var name = pageid || 'index'
      console.log('editing: ', siteid, pageid)
      this.$store.dispatch('page/getPage', { siteid: siteid, pageid: pageid })
    },
    savePage (pageid) {
      console.log('savePage(' + pageid + ')')
      this.$store.dispatch('page/savePage', { siteid: this.siteid, pageid: this.pageid })
      this.$router.push('/v/' + this.siteid + '/' + this.pageid)
    },
    updateContent (e) {
      // console.log(e)
      this.$store.commit('page/setContent', e)
      // console.log(this.$store.state.page.content)
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  computed: {
    page: {
      get () {
        return this.$store.state.page.content || ''
      },
      set (value) {
        this.$store.commit('page/updateContent', value)
      }
    },
    preview () {
      if (typeof this.$store.state.page === 'undefined') return { content: '' }
      return this.$store.state.page
    },
    selectedTheme () {
      var theme = this.$store.state.theme
      // console.log('reader got theme', this.$store.state.theme)
      if (typeof theme === 'undefined') return 'Skald'
      return theme
    }
  },
  components: {
    Markdown
  }
}
</script>
