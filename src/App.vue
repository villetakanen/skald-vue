<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
      >
      <SkaldNavigationDrawer :site="site"/>
    </v-navigation-drawer>
    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Skald</span>
        <span> - </span>
        <span class="font-weight-light">{{$t("wikititle")}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <CreatePageButton/>
      <LoginButton/>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-dialog
      v-model="edialog"
      max-width="800"
      >
      <v-card dark>
        <v-card-text>{{error}}</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import LoginButton from './components/LoginButton.vue'
// import CreatePageButton from './components/CreatePageButton'
import CreatePageButton from './components/CreatePageButton'
import SkaldNavigationDrawer from './components/SkaldNavigationDrawer'

export default {
  name: 'App',
  components: {
    LoginButton,
    CreatePageButton,
    SkaldNavigationDrawer
  },
  computed: {
    sites () {
      return this.$store.state.binder.sites
    },
    site () {
      return this.$store.state.binder.site
    },
    error () {
      return this.$store.state.error
    }
  },
  data: () => ({
    drawer: null,
    edialog: false
  }),
  mounted () {
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'creator/setCreator':
          const locale = state.creator.locale
          if (locale === null) break

          console.log(`Updating to locale ${locale}`)
          this.$i18n.locale = locale

          break
        case 'error':
          this.edialog = true

          break
      }
    })
  }
}
</script>
