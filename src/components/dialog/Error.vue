<template>
  <v-card dark>
    <v-card-text>
      <template v-if="code === '403'">
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md2>
              <img alt="m" style="max-height:128px;max-width:128px;float:left" src="../../assets/noun_w_manyeyes.svg"/>
            </v-flex>
            <v-flex xs12 md10>
        <h1 style="font-weight:300;margin-bottom:8px">{{$t('accessDeniedToSiteTitle')}}</h1>
        <p>{{$t('accessDeniedToSite')}}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
      {{message}}
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    code () {
      console.log(this.$store.state.error)
      if (this.$store.state.error === '403') return '403'
      return false
    },
    message () {
      return this.$store.state.error
    }
  }
}
</script>
