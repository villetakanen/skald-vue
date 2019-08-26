<template>
    <v-btn text @click="dialog=!dialog">
      <v-icon>mdi-delete</v-icon>
      delete my profile
      <v-dialog
        v-model="dialog">
        <v-card>
          <v-card-title>Delete profile?</v-card-title>
          <v-card-text>
            Warning:
            <WikiPage
            :page='warning'
            theme='skald'
            siteid='skald'/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
</template>
<script>
import WikiPage from '../WikiPage'

export default {
  components: {
    WikiPage
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    warning () {
      if (this.$store.state.binder.page === null) return ''
      return this.$store.state.binder.page.content
    }
  }
}
</script>
