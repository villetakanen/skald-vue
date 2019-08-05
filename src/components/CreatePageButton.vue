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
        <v-card-title>
          <span class="headline">{{$t('cpb-title')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container
          grid-list-md
          >
            <v-layout
              wrap
              >
              <v-tabs xs12 md12>
                <v-tab>{{$t('cpb-tab-site')}}</v-tab>
                <v-tab>Page</v-tab>
              </v-tabs>
              <v-form v-if="site" @submit.prevent="savePage">
                <v-flex xs12 md12>
                  <p>{{$t('cpb-info')}}</p>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    :label="$t('cpb-site-name-label')"
                    :placeholder="$t('cpb-site-name-placeholder')"
                    @input="updateName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs1 md1>
                  <v-switch v-model="customURLtoggle"></v-switch>
                </v-flex>
                <v-flex xs15 md5>
                  <v-text-field
                    :label="$t('cpb-site-url-label')"
                    filled
                    :readonly="!customURLtoggle"
                    :value="siteURLproposal"
                    ></v-text-field>
              </v-flex>
              </v-form>
        </v-layout>
      </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="create()">{{$t('create')}}</v-btn>
          <v-btn text color="secondary" @click="cancel()">{{$t('cancel')}}</v-btn>
        </v-card-actions>
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
    siteName: '',
    customURLtoggle: false
  }),
  /* computed: {
    customURLtoggle: {
      get () {
        return this.customURLtoggle_t
      },
      set (e) {
        this.customURLtoggle_t = e
        if (!this.customURLtoggle_t) this.siteURL = null
      }
    }
  }, */
  methods: {
    updateName (e) {
      this.siteName = e
      if (!this.customURLtoggle) {
        var re = new RegExp('[\\W]', 'g')
        var s = e.replace(re, '-')
        while (s.includes('--')) {
          s = s.split('--').join('-')
        }
        this.siteURLproposal = s.toLowerCase()
      }
    }
  }
}
</script>
