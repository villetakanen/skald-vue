<template>
  <v-card>
    <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md2>
              <img alt="i" style="max-height:128px;max-width:128px" src="../../assets/noun_Monster_693509.svg"/>
            </v-flex>
            <v-flex xs12 md10>
              <h1 style="font-weight:300;margin-bottom:8px">{{$t('pageNotFound')}}</h1>
              <p>{{$t('pnf-createPageUp')}}<br/>
              <strong style="color:primary">{{siteid}}/{{pageid}}</strong><br/>
              {{$t('pnf-createPageDown')}}</p>
            </v-flex>
          </v-layout>
        </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        color="primary"
        @click="create">{{$t('create')}}</v-btn>
      <v-btn
        text
        color="primary"
        @click="cancel">{{$t('cancel')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: [
    'pageid',
    'siteid'
  ],
  methods: {
    cancel () {
      this.$router.push('/v/' + this.siteid)
      this.$emit('closeDialog', true)
    },
    create () {
      console.log('create page pressed')
      this.$store.dispatch('binder/createPage',
        {
          pageid: this.pageid,
          name: this.pageid,
          content: '# ' + this.pageid,
          siteid: this.siteid,
          creator: this.$store.state.creator.uid,
          creatorNick: this.$store.state.creator.nick
        }).then((a) => {
        console.log('dispatched', a)
      })
      this.$router.push('/v/' + this.siteid + '/' + this.pageid)
      this.name = null
      this.$emit('closeDialog', true)
    }
  },
  mounted () {
    /* this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)'
      console.log('mutation', mutation.type)
      switch (mutation.type) {
        case 'pagelog/patchLog':
          console.log('refresh pagelog happens, lets close here')
          this.$router.push('/v/' + this.siteid + '/' + this.pageid)
          this.$emit('closeDialog', true)
          break
      }
    }) */
  }
}
</script>
