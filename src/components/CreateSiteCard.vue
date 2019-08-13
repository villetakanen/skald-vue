<template>
  <v-card>
    <v-card-title>{{$t('cpb-title')}}</v-card-title>
    <v-card-text>
      <v-container grid-list-xs>
        <v-layout wrap>
          <v-flex xs12>
            <p>{{$t('cpb-info')}}</p>
            <v-text-field
              :label="$t('cpb-site-name-label')"
              :placeholder="$t('cpb-site-name-placeholder')"
              filled
              v-model="name"
              ></v-text-field>
          </v-flex>
          <v-flex xs12>
            {{$t('cpb-url')}} <span style="color:#26a69a">skald-rpg.web.app/#/v/{{newSiteid}}</span>
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
      this.$store.dispatch('binder/createSite',
        {
          siteid: this.newSiteid,
          name: this.newSiteid,
          content: '# ' + this.newSiteName,
          owner: this.$store.state.creator.uid,
          ownerNick: this.$store.state.creator.nick
        })
      /* this.$store.dispatch('binder/createPage',
        {
          pageid: this.newSiteid,
          name: this.newSiteName,
          content: '# ' + this.newSiteName,
          siteid: this.newSiteid,
          creator: this.$store.state.creator.uid,
          creatorNick: this.$store.state.creator.nick
        })
      this.$router.push('/v/' + this.newSiteid) */
      this.name = null
      this.$emit('closeDialog', true)
    }
  },
  computed: {
    name: {
      get () {
        return this.newSiteName
      },
      set (e) {
        this.newSiteName = e

        if (this.name === null) return null
        var re = new RegExp('[\\W]', 'g')
        var s = e.replace(re, '-')
        while (s.includes('--')) {
          s = s.split('--').join('-')
        }
        this.newSiteid = s
      }
    }
  },
  data: () => ({
    newSiteName: null,
    newSiteid: null
  })
}
</script>
