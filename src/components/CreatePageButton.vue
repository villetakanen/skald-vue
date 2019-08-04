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
            <v-card-title>Create</v-card-title>
            <v-card-text>
              <v-tabs>
                <v-tab>Site</v-tab>
              </v-tabs>
              <v-flex>
                <p>{{$t('cpb-info')}}</p>
              </v-flex>
              <v-form v-if="site" @submit.prevent="savePage">
                <v-flex>
                  <v-text-field
                    :label="$t('cpb-site-name-label')"
                    :placeholder="$t('cpb-site-name-placeholder')"
                    filled
                    @input="updateName"
                    ></v-text-field>
                  <v-text-field
                    :label="$t('cpb-site-url-label')"
                    filled
                    ></v-text-field>
                  <p>{{siteURL}}, {{siteURLproposal}}</p>
                </v-flex>
              </v-form>
            </v-card-text>
     </v-card>
     </v-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    site: true,
    siteURL: null,
    siteURLproposal: null,
    siteName: ''
  }),
  methods: {
    updateName (e) {
      this.siteName = e
      if (this.siteURL === null) {
        this.siteURLproposal = this.siteName.split(' ').join('_')
      } else {
        this.siteURLproposal = null
      }
    }
  }
}
</script>
