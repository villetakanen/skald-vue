<template>
  <v-container fluid grid-list-md class="scroll-y">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar dark >
            <v-toolbar-title>{{$t('ep-editor-title')}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon
              @click="editorPreview=!editorPreview"
              v-if="editorPreview"><v-icon>mdi-eye</v-icon></v-btn>
            <v-btn icon
              @click="editorPreview=!editorPreview"
               v-if="!editorPreview"><v-icon>mdi-eye-off</v-icon></v-btn>
            &nbsp;
            <v-btn text :to="'/v/' + this.siteid + '/' + this.pageid">{{$t("cancel")}}</v-btn>
            &nbsp;
            <v-btn color="primary" @click="updatePage">{{$t("save")}}</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout>
                <v-flex xs12 v-bind:md6="editorPreview">
                  <v-form  @submit.prevent="savePage">
                    <v-text-field
                      v-model="pageName"
                      filled></v-text-field>
                    <v-textarea
                      auto-grow
                      filled
                      v-model="pageContent"></v-textarea>
                  </v-form>
                </v-flex>
                <v-flex v-if="editorPreview" xs12 md6>
                    <v-card v-show="editorPreview">
                      <v-card-title>{{pageName}}</v-card-title>
                      <v-card-text>
                    <Markdown
                      :page="{ content: pageContent }"
                      theme="Skald"/>
                      </v-card-text>
                    </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
     <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="primary"
            @click="toTop"
          ><v-icon>mdi-arrow-up</v-icon>
          </v-btn>
  </v-container>
</template>

<script>
import Markdown from '../components/Markdown'

export default {
  props: ['siteid', 'pageid'],
  created () {
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'binder/setPage':
          console.log('binder/setPage')
          this.pageContent = state.binder.page.content
          this.pageName = state.binder.page.name
          break
      }
    })
    // Get the page from the binder
    this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
  },
  computed: {
    editorPreview: {
      get () {
        return this.$store.state.creator.editorPreview
      },
      set (value) {
        // console.log('setting editorPreview to')
        this.$store.dispatch('creator/updateEditorPreview', value)
      }
    }
  },
  data: () => ({
    // preview: true,
    pageContent: null,
    pageName: null,
    fab: false
  }),
  mounted () {
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    updatePage () {
      this.$store.dispatch('binder/updatePage',
        {
          pageid: this.pageid,
          name: this.pageName,
          content: this.pageContent,
          siteid: this.siteid,
          creator: this.$store.state.creator.uid,
          creatorNick: this.$store.state.creator.nick
        })
      this.$router.push('/v/' + this.siteid + '/' + this.pageid)
    }
  },
  // up
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  components: {
    Markdown
  }
}
</script>
