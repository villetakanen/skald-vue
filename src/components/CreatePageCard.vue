<template>
  <v-card>
    <v-card-title>{{$t('cpage-title')}}</v-card-title>
    <v-card-text>
      <v-container grid-list-xs>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              :label="$t('cpage-pageName')"
              :placeholder="$t('cpage-pageName-placeholder')"
              filled
              v-model="name"
              ></v-text-field>
          </v-flex>
          <v-flex xs12>
            {{$t('cpage-url')}} <span style="color:#26a69a">skald-rpg.web.app/#/v/{{siteid}}/{{newPageid}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="create">{{$t('create')}}</v-btn>
      <v-btn
        color="primary"
        outlined
        @click="cancel">{{$t('cancel')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  methods: {
    cancel () {
      this.name = null
      this.$emit('closeDialog', true)
    },
    create () {
      this.$store.dispatch('binder/createPage',
        {
          pageid: this.newPageid,
          name: this.newPageName,
          content: '# ' + this.newPageName,
          siteid: this.siteid,
          creator: this.$store.state.creator.uid,
          creatorNick: this.$store.state.creator.nick
        })
      this.$router.push('/v/' + this.siteid + '/' + this.newPageid)
      this.name = null
      this.$emit('closeDialog', true)
    }
  },
  computed: {
    siteid () {
      if (this.$store.state.binder.site === null) return null
      return this.$store.state.binder.site.link
    },
    name: {
      get () {
        return this.newPageName
      },
      set (e) {
        this.newPageName = e

        this.newPageid = this.$skaldURI(e)
      }
    }
  },
  data: () => ({
    newPageName: null,
    newPageid: null
  })
}
</script>
