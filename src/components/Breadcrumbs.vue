<template>
  <div>
    <div>
      <router-link :to="sitelink">{{site}}</router-link> /
      <router-link :to="pagelink">{{page}}</router-link></div>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  computed: {
    page () {
      return this.$store.state.page.name
    },
    pagelink () {
      return '/page/' + this.$store.state.page.id
    },
    site () {
      return this.$store.state.sites.list[this.$store.state.siteid].name
    },
    sitelink () {
      return '/page/' + this.$store.state.sites.current + '.' + this.$store.state.sites.current
    }
  }
}
</script>
