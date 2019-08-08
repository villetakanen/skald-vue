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
        @click="cancel">{{$t('create')}}</v-btn>
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
    }
  },
  computed: {
    siteid () {
      if (this.$store.state.binder.site === null) return null
      return this.$store.state.binder.site.link
    },
    newPageid () {
      if (this.name === null) return null
      var re = new RegExp('[\\W]', 'g')
      var s = this.name.replace(re, '-')
      while (s.includes('--')) {
        s = s.split('--').join('-')
      }
      return s
    }
  },
  data: () => ({
    name: null
  })
}
</script>
