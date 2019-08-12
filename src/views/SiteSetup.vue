<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex>
        <h1 class="font-weight-light">{{$t("ss-title")}} {{name}}</h1>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 md4>
        <CardSiteRestrictions/>
      </v-flex>
      <v-flex xs12 md4>
        <CardSiteOwners/>
      </v-flex>
      <v-flex xs12 md4>
        <CardSiteMembers/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title>{{$t("ss-site-style")}}</v-card-title>
          <v-card-text>
        <v-select
          v-model="selectedTheme"
          :items="themes"
          prepend-icon="mdi-map"
          menu-props="auto"
          hide-details
          label="Select"
          single-line
        ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="saveTheme(siteid, selectedTheme)" color="primary">{{$t("save")}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <v-card>
          <v-card-title>{{$t("ss-site-preview")}}</v-card-title>
          <v-card-text>
            <Markdown
              :theme="selectedTheme"
              :page="examplePage"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Markdown from '../components/Markdown'
import CardSiteRestrictions from '../components/sitesettings/CardSiteRestrictions'
import CardSiteMembers from '../components/sitesettings/CardSiteMembers'
import CardSiteOwners from '../components/sitesettings/CardSiteOwners'

export default {
  props: ['siteid'],
  components: {
    Markdown,
    CardSiteRestrictions,
    CardSiteMembers,
    CardSiteOwners
  },
  computed: {
    name () {
      if (this.$store.state.binder.site === null) return ''
      return this.$store.state.binder.site.name
    },
    site () {
      return this.$store.state.binder.site
    },
    themes () {
      return ['Skald', 'DD5', 'Modern']
    },
    selectedTheme: {
      get () {
        const theme = this.$store.state.theme
        if (typeof theme === 'undefined') return 'Skald'
        return theme
      },
      set (theme) {
        // console.log('theme set to', theme)
        this.$store.state.theme = theme
      }
    }
  },
  created: function () {
    // if (typeof this.$store.state.sites.current === 'undefined') this.$store.commit('sites/setCurrentSite', this.id)
    // return this.$store.dispatch('sites/getOwners', this.siteid)
    // console.log('a:', this.siteid, this.$route.params)
    this.$store.dispatch('binder/getFullSite', { siteid: this.siteid })
    this.$store.dispatch('users/getAll')
  },
  data: () => ({
    examplePage: { content: '# H1 header \n\n Some text, [wiki:skald/welcome] wikilink, and a \n\n## H2 Stats under H2 \n\n[stats: Strenght(10/0) Dexterity(12/+1) Stamina(14/+2) Wisdom(6/-3) Intelligence(21/+5) Charisma(12/+1)]' }
  }),
  methods: {
    saveTheme (id, theme) {
      this.$store.dispatch('sites/saveTheme', { id: id, theme: theme })
    }
  }
}
</script>
