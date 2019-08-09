<template>
  <v-card outlined>
    <v-card-title>{{$t("page-info")}}</v-card-title>
    <v-card-text>{{$t("page-infoLastEdit")}}: {{lastEditDate}}</v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    lastEditDate () {
      if (this.$store.state.binder.page === null) return '-'
      var t = new Date(1970, 0, 1) // Epoch
      t.setSeconds(this.$store.state.binder.page.lastUpdate.seconds)
      return t.toISOString()
    }
  }
}
</script>
