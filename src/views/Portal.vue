<template>
  <div>
    <img class="monster" src="../assets/noun_Monster_693509.svg"/>
    <img class="monster" src="../assets/noun_Monster_57335.svg"/>
    <img class="monster" src="../assets/noun_Cat_37446.svg"/>
  </div>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('pagelog/init')
  },
  computed: {
    latestChanges () {
      return this.$store.state.pagelog.latest
    }
  }
}
</script>
<style scoped>
img.monster{
  max-height: 128px;
  max-width: 128px;
  opacity: 0.1;
}
</style>
