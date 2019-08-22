<template>
  <div>
    <CardReader siteid='skald' pageid='skald' title='Demo' content='# header!'/>
    <img class="monster" src="../assets/noun_Monster_693509.svg"/>
    <img class="monster" src="../assets/noun_Monster_57335.svg"/>
    <img class="monster" src="../assets/noun_Cat_37446.svg"/>

    <template v-for="(page, index) in latestChanges">
      <p v-bind:key="index">{{page.pageid}}</p>
    </template>
  </div>
</template>
<script>
import CardReader from '../components/CardReader'

export default {
  components: {
    CardReader
  },
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
