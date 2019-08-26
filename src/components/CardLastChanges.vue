<template>
  <v-card
    outlined>
    <v-card-title>Latest changes</v-card-title>
    <v-card-text>
    <template v-for="(page, index) in latestChanges">
      <p v-bind:key="index">
        <router-link :to="'/v/' + page.siteid + '/' + page.pageid">{{page.siteid + '/' +page.pageid}}</router-link>
      </p>
    </template>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    latestChanges () {
      console.log('latestChanges', this.$store.state.pagelog.latest)
      return this.$store.state.pagelog.latest
    }
  }
}
</script>
