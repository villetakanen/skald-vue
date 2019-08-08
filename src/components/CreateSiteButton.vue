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
              <v-tabs xs12 md12 v-model="tabs">
                <v-tab>{{$t('cpb-tab-page')}}</v-tab>
                <v-tab>{{$t('cpb-tab-site')}}</v-tab>
              </v-tabs>

              <v-form v-if="tabs == 0" @submit.prevent="create">
                <v-container fluid grid-list-xs>
                  <v-layout wrap>
                    <v-flex xs12 md12>{{$t('cpb-page-create-info')}}</v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        :label="$t('cpb-page-name-label')"
                        :placeholder="$t('cpb-place-name-placeholder')"
                        filled
                        v-model="pageName"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        :label="$t('cpb-page-url-label')"
                        :placeholder="$t('cpb-place-url-placeholder')"
                        filled
                        v-model="pageURL"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                      {{$t('cpb-page-create-info')}} /v/{{siteid}}/{{pageURL}}
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <v-form v-if="tabs == 1" @submit.prevent="savePage">
                  <p>{{$t('cpb-info')}}</p>
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
    tabs: 0,
    siteURLData: null,
    siteURLproposal: null,
    siteNameData: '',
    pageURLData: null,
    pageURLproposal: null,
    pageNameData: '',
    customURLtoggle: false
  }),
  computed: {
    siteid () {
      if (this.$store.state.binder.site === null) return null
      return this.$store.state.binder.site.link
    },
    pageName: {
      get () {
        return this.pageNameData
      },
      set (value) {
        var re = new RegExp('[\\W]', 'g')
        var s = value.replace(re, '-')
        while (s.includes('--')) {
          s = s.split('--').join('-')
        }
        this.pageURLproposal = s
        this.pageNameData = value
      }
    },
    pageURL: {
      get () {
        if (this.pageURLData) return this.pageURLData
        return this.pageURLproposal
      },
      set (value) {
        this.siteURLData = value
      }
    }

  },
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
