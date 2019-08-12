<template>
  <v-card>
    <v-card-title>{{$t("siteowners")}}</v-card-title>
    <v-card-text>
      <v-chip v-for="(owner, index) in owners" v-bind:key="index"
      :outlined="index === currentUser"
      :close="!(index === currentUser)">{{owner.nick}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    owners () {
      if (this.$store.state.binder.site === null) return null
      return this.$store.state.binder.site.owners
    },
    currentUser () {
      return this.$store.state.profile.uid
    }
  }
}
</script>
