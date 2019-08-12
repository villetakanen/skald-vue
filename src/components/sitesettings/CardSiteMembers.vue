<template>
  <v-card>
    <v-card-title>{{$t("siteowners")}}</v-card-title>
    <v-card-text>
      <v-chip v-for="(owner, index) in owners" v-bind:key="index"
      :outlined="index === currentUser"
      :close="!(index === currentUser)">{{owner.nick}}
      </v-chip>
      {{allUsers}}
      <v-autocomplete :items="nonOwners"></v-autocomplete>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    owners () {
      if (this.$store.state.binder.site === null) return { nick: 'loading' }
      // console.log(this.$store.state.binder.site.owners)
      return this.$store.state.binder.site.owners
    },
    currentUser () {
      return this.$store.state.profile.uid
    },
    allUsers () {
      return this.$store.state.users.all
    },
    nonOwners () {
      if (this.$store.state.users === null || this.$store.state.binder.site === null) return null
      return this.$store.getters['users/nonOwners'](this.$store.state.binder.site.link)
      /* var u = []
      for (const [k, i] of this.$store.state.users.all) {
        if (typeof i.owns === 'undefined' ||
          Object.prototype.hasOwnProperty.call(i, this.$store.state.binder.site.link)) {
          console.log('no', k, i)
          u.push(i.nick)
        }
      }
      return u */
    }
  }
}
</script>
