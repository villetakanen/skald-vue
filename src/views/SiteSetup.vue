<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md12 xl12>
        <h1 class="font-weight-light">{{$t("ss-title")}} {{site.name}}</h1>
      </v-flex>
    </v-layout>
    <v-layout flex>
      <v-flex xs12 md6>
        <p>{{$t("siteowners")}}</p>
        <div>
          <v-chip v-for="(owner, index) in owners" v-bind:key="index"
            :outlined="index === currentUser"
            :close="!(index === currentUser)">{{owner.nick}}
          </v-chip>
        </div>
      </v-flex>
    </v-layout>
    <br/>
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

export default {
  props: ['siteid'],
  components: {
    Markdown
  },
  computed: {
    site () {
      if (typeof this.$store.state.sites.list[this.siteid] === 'undefined') return { name: '' }
      return this.$store.state.sites.list[this.siteid]
    },
    owners () {
      console.log('owners', this.$store.state.sites.owners)
      return this.$store.state.sites.owners
    },
    currentUser () {
      return this.$store.state.profile.uid
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
        console.log('theme set to', theme)
        this.$store.state.theme = theme
      }
    }
  },
  created: function () {
    if (typeof this.$store.state.sites.current === 'undefined') this.$store.commit('sites/setCurrentSite', this.id)
    return this.$store.dispatch('sites/getOwners', this.siteid)
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
