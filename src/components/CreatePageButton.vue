<template>
  <div>
    <v-btn
      v-if="isAuthz"
      fab
      small
      elevation="0"
      @click="dialog=!dialog"
      color="primary"
      ><v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      >
        <CreatePageCard v-on:closeDialog="close"/>
    </v-dialog>
  </div>
</template>
<script>
import CreatePageCard from './CreatePageCard'

export default {
  components: {
    CreatePageCard
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    close () {
      this.dialog = false
    }
  },
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz
    }
  }
}
</script>
