<template>
  <v-container>
    <v-layout v-for="(item, index) in sites" v-bind:key="index">
      <router-link :to="'/v/'+index">{{ item.name }}</router-link>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    sites () {
      return this.$store.state.sites.list
    }
  }
}
</script>
