<template>
  <div>
    <v-btn
      icon
      @click="dialog=!dialog">
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="800"
     >
        <v-card>
            <v-card-title>Create a new page</v-card-title>
            <v-card-text></v-card-text>
     </v-card>
     </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>
