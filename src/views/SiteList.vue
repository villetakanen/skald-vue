<template>
  <ul id="example-2">
    <li v-for="(item, index) in sites" v-bind:key="index">
      {{ index }} - {{ item.name }}
    </li>
</ul>
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
