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
               <Markdown :content="preview"/>
                 </v-card-text>
               </v-card>
             </v-flex>
        </v-layout>
        <v-layout>
             <v-flex xs1 align-self-end>
                 <v-btn right color="primary" @click="savePage(name)">Save</v-btn>
             </v-flex>
        </v-layout>
    </v-container>
    </v-form>
</template>

<script>
import Markdown from '../components/Markdown'

export default {
  props: ['name'],
  created () {
    this.getPage(this.name)
  },
  methods: {
    getPage (name) {
      name = name || 'index'
      // console.log('using: ' + this.name)
      this.$store.dispatch('page/getPage', name)
    },
    savePage (name) {
      // console.log('savePage(' + name + ')')
      this.$store.dispatch('page/savePage', { name: this.name,
        creator: { uid: this.$store.state.user.uid, nick: this.$store.state.profile.nick } })
      this.$router.push('/page/' + this.name)
    },
    updateContent (e) {
      // console.log(e)
      this.$store.commit('setContent', e)
    }
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.name)
    }
  },
  computed: {
    page: {
      get () {
        return this.$store.state.page.Content || ''
      },
      set (value) {
        this.$store.commit('updatePage', value, this.name)
      }
    },
    preview () {
      return this.$store.state.page
    }
  },
  components: {
    Markdown
  }
}
</script>
