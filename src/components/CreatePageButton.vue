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
      <v-card dark>
        <v-card-title  dark>
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
          <v-btn outlined color="primary" @click="createSite()">{{$t('create')}}</v-btn>
          <v-btn text color="primary" @click="dialog=!dialog">{{$t('cancel')}}</v-btn>
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
    createSite (e) {
      this.$store.dispatch('sites/createSite', {
        Name: this.siteName,
        URL: this.siteURLproposal,
        Owner: this.$store.state.profile.uid,
        OwnerNick: this.$store.state.profile.nick,
        Theme: 'skald'
      })
      this.siteName = ''
      this.siteURLproposal = ''
      this.dialog = false
    },
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
