<template>
  <v-card>
    <v-card-title>{{$t("siteowners")}}</v-card-title>
    <v-card-text>
      <v-chip v-for="(owner, index) in owners" v-bind:key="index"
      :outlined="index === currentUser"
      :close="!(index === currentUser)"
      @click:close="removeOwner(owner.uid)">{{owner.nick}}
      </v-chip>
      <v-autocomplete
        v-model="newOwner"
        :items="nonOwners"></v-autocomplete>
      <v-btn color="primary" @click="addOwner">{{$t("action-add")}}</v-btn>
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
      var r = []
      const all = this.$store.getters['users/nonOwners'](this.$store.state.binder.site.link)
      for (const i in all) {
        r.push(all[i].nick)
      }
      return r
    }
  },
  data: () => ({
    newOwner: null
  }),
  methods: {
    addOwner () {
      console.log('addOwner', this.newOwner)
      this.$store.dispatch('users/addOwner', { nick: this.newOwner, siteid: this.$store.state.binder.site.link })
    },
    removeOwner (uid) {
      console.log('removeOwner', uid)
      this.$store.dispatch('users/revokeOwner', { uid: uid, siteid: this.$store.state.binder.site.link })
    }
  }
}
</script>
