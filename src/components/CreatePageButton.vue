<template>
  <div>
    <v-btn
      icon
      @click="dialog=!dialog"
      ><v-icon>mdi-book-multiple-plus</v-icon>
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
  }
}
</script>
