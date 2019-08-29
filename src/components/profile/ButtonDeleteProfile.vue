<template>
    <v-btn text @click="dialog=!dialog">
      <v-icon>mdi-delete</v-icon>
      delete my profile
      <v-dialog
        v-model="dialog"
        max-width="800">
        <v-card>
          <v-card-title>{{$t('deleteprofiletitle')}}</v-card-title>
          <v-card-text>
            <WikiPage
            :page='warning'
            theme='skald'
            siteid='skald'/>
          </v-card-text>
          <v-card-actions>
              <v-checkbox
                class="pa-0 my-0 mx-4 inactions"
                v-model="verify"
                :label="$t('iunderstandcheck')"></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn
              text
              :disabled="!verify"
              color="primary"
              @click="deleteProfile">
              Delete</v-btn>
            <v-btn
              color="primary"
              outlined
              @click="dialog=!dialog">Cancel</v-btn>
          </v-card-actions>
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
    dialog: false,
    verify: false
  }),
  computed: {
    warning () {
      if (this.$store.getters['basesite/page']('forget-me') === null) return ''
      return this.$store.getters['basesite/page']('forget-me').content
      // if (this.$store.state.binder.page === null) return ''
      // return this.$store.state.binder.page.content
    }
  },
  methods: {
    deleteProfile () {
      console.log('deleteprofile')
      this.$store.dispatch('creator/deleteProfile')
    }
  }
}
</script>
<style>
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot{
  margin-bottom:0;
}

</style>
