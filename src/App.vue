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
      elevation="1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">Skald</v-toolbar-title>
      <v-spacer></v-spacer>

      <CreatePageButton class="mx-2"/>

      <LoginButton/>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-dialog
      v-model="edialog"
      max-width="800"
      >
      <Error/>
    </v-dialog>
    <v-dialog
      v-model="forceCreateDialog"
      max-width="800"
      persistent
      >
      <CreateProfile/>
    </v-dialog>
  </v-app>
</template>

<script>
import LoginButton from './components/LoginButton.vue'
// import CreatePageButton from './components/CreatePageButton'
import CreatePageButton from './components/CreatePageButton'
import SkaldNavigationDrawer from './components/SkaldNavigationDrawer'
import Error from './components/dialog/Error'
import CreateProfile from './components/dialog/CreateProfile'

export default {
  name: 'App',
  components: {
    LoginButton,
    CreatePageButton,
    SkaldNavigationDrawer,
    Error,
    CreateProfile
  },
  computed: {
    sites () {
      return this.$store.state.binder.sites
    },
    site () {
      return this.$store.state.binder.site
    },
    forceCreateDialog: {
      get () {
        return this.createDialog && this.$route.path !== '/c/profile'
      },
      set () {
      }
    }
  },
  data: () => ({
    drawer: null,
    edialog: false,
    createDialog: false
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

        case 'creator/profileExists':
          console.log('creator/profileExists', this.$store.getters['creator/needsProfile']())
          this.createDialog = this.$store.getters['creator/needsProfile']()
          break

        case 'error':
          this.edialog = true

          break
      }
    })
  }
}
</script>
<style lang="sass">
@import './styles/hood.css'
@import './styles/quick.css'

</style>
<style soped>
.subtitle {
  font-size: 16px;
}
</style>
