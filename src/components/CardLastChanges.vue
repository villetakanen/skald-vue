<template>
  <v-card
    flat>
    <v-card-title>Latest changes</v-card-title>
    <v-card-text>
    <template v-for="(page, index) in latestChanges">
      <p v-bind:key="index" class="ma-2">
        <router-link :to="'/v/' + page.siteid + '/' + page.pageid">{{page.siteid + '/' +page.pageid}}</router-link>
        <span style="color:silver" class="mx-2">{{page.creator}}</span>
        <span>{{toDate(page.timestamp.seconds)}}</span>
      </p>
    </template>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    latestChanges () {
      // console.log('latestChanges', this.$store.state.pagelog.latest)
      // return this.$store.state.pagelog.latest
      return this.$store.getters['pagelog/latest'](10)
    }
  },
  methods: {
    toDate (seconds) {
      if (seconds === null || typeof seconds === 'undefined') return '...'
      var lastChangeDate = new Date(1970, 0, 1) // Epoch
      lastChangeDate.setSeconds(seconds)
      const s = lastChangeDate.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
  }
}
</script>
