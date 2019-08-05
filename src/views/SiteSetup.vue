<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <h1 class="font-weight-light">{{$t("ss-title")}} {{site.name}}</h1>
      </v-flex>
      <v-flex xs12 md6>
        <p>{{site.name}}</p>
        <p>{{site.owners}}</p>
        <p>{{site.theme}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    site () {
      return this.$store.state.sites.list[this.id]
    }
  },
  created: function () {
    if (typeof this.$store.state.sites.current === 'undefined') this.$store.commit('sites/setCurrentSite', this.id)
    return this.$store.dispatch('sites/getOwners', this.id)
  }
}
</script>
