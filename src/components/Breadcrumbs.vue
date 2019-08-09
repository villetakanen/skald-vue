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
      if (this.$store.state.binder.page === null) return ''
      return this.$store.state.binder.page.name
    },
    pagelink () {
      if (this.$store.state.binder.page === null ||
        this.$store.state.binder.site === null) return '/'
      return '/v/' + this.$store.state.binder.page.id + '/' + this.$store.state.binder.page.id
    },
    site () {
      if (this.$store.state.binder.site === null) return ''
      return this.$store.state.binder.site.name
    },
    sitelink () {
      if (this.$store.state.binder.site === null) return '/v/skald'
      return '/v/' + this.$store.state.binder.site.link
    }
  }
}
</script>
