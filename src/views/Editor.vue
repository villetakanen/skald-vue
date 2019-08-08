<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar dark >
            <v-toolbar-title>{{$t('ep-editor-title')}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon
              @click="preview=!preview"
              v-if="preview"><v-icon>mdi-eye</v-icon></v-btn>
            <v-btn icon
              @click="preview=!preview"
               v-if="!preview"><v-icon>mdi-eye-off</v-icon></v-btn>

            <v-btn color="primary" @click="updatePage">{{$t("save")}}</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout>
                <v-flex xs12 v-bind:md6="preview">
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
                <v-flex v-if="preview" xs12 md6>
                    <v-card v-show="preview">
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
  data: () => ({
    preview: true,
    pageContent: null,
    pageName: null
  }),
  mounted () {
  },
  methods: {
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
