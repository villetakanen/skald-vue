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

  </v-app>
</template>

<script>
import LoginButton from './components/LoginButton.vue'
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
    spacename () {
      return this.$store.state.space
      // return 'Skald'
    },
    spacelink () {
      return '/page/' + this.$store.state.space + '.' + this.$store.state.space
      // return '/page/skald.welcome'
    },
    sites () {
      return this.$store.state.sites.list
    },
    site () {
      console.log('site returning: ',
        this.$store.state.sites.list[this.$store.state.sites.current],
        this.$store.state.sites.current)
      return this.$store.state.sites.list[this.$store.state.sites.current]
    }
  },
  data: () => ({
    drawer: null
  })
}
</script>
<style>
.opaque{
  background: white;
}
</style>
