<template>
<v-form  @submit.prevent="savePage">
    <v-container
        fluid
        fill-height
      >
        <v-layout wrap justify-end>
            <v-flex xs12 align-self-start>
                <v-textarea
                    solo
                    name="content-editor"
                    auto-grow
                    :value="page"
                    @input="updateContent"
                    ></v-textarea>
             </v-flex>
             <v-flex xs1 align-self-end>
                 <v-btn right color="primary" @click="savePage(name)">Save</v-btn>
             </v-flex>
        </v-layout>
    </v-container>
    </v-form>
</template>

<script>
export default {
  props: ['name'],
  created () {
    this.getPage(this.name)
  },
  methods: {
    getPage (name) {
      name = name || 'index'
      // console.log('using: ' + this.name)
      this.$store.dispatch('getPage', name)
    },
    savePage (name) {
      // console.log('savePage(' + name + ')')
      this.$store.dispatch('savePage', this.name)
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
    }
  }
}
</script>
