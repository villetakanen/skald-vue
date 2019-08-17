<template>
  <div>
    <v-btn
      v-if="isAuthz"
      icon
      @click="dialog=!dialog">
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="800"
      >
      <CreateSiteCard v-on:closeDialog="close"/>
    </v-dialog>
  </div>
</template>
<script>
import CreateSiteCard from '../components/CreateSiteCard'
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    close () {
      this.dialog = false
    }
  },
  components: {
    CreateSiteCard
  },
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz
    }
  }
}
</script>
