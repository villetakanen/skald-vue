<template>
  <v-card>
    <v-card-title>{{$t("sitemembers")}}</v-card-title>
    <v-card-text>
      <v-chip v-for="(member, index) in members" v-bind:key="index"
      :outlined="index === currentUser"
      :close="!(index === currentUser)"
      @click:close="removeMember(member.uid)">{{member.nick}}
      </v-chip>
      <v-autocomplete
        v-model="newMember"
        :items="allNicks"></v-autocomplete>
      <v-btn color="primary" @click="addMember">{{$t("action-add")}}</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    members () {
      if (this.$store.state.binder.site === null) return { nick: 'loading' }
      // console.log(this.$store.state.binder.site.owners)
      return this.$store.state.binder.site.members
    },
    currentUser () {
      return this.$store.state.profile.uid
    },
    allUsers () {
      return this.$store.state.users.all
    },
    allNicks () {
      if (this.$store.state.users === null || this.$store.state.binder.site === null) return null
      var r = []
      const all = this.$store.state.users.all
      for (const i in all) {
        r.push(all[i].nick)
      }
      return r
    }
  },
  data: () => ({
    newMember: null
  }),
  methods: {
    addMember () {
      console.log('addMember', this.newMember)
      this.$store.dispatch('users/addMember', { nick: this.newMember, siteid: this.$store.state.binder.site.link })
    },
    removeMember (uid) {
      console.log('removeMember', uid)
      this.$store.dispatch('users/revokeMember', { uid: uid, siteid: this.$store.state.binder.site.link })
    }
  }
}
</script>
