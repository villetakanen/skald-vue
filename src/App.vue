<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
       <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="spacelink">
          <v-list-item-action>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{spacename}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Sites</v-subheader>

        <template v-for="(site, index) in sites">
          <v-list-item v-bind:key="index" :to="'/page/' + index + '.' + index">
            <v-list-item-title>{{site.Name}}</v-list-item-title>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-subheader>Meta</v-subheader>

        <v-list-item href="https://github.com/vitku/skald-vue">
          <v-list-item-action>
            <v-icon>mdi-language-javascript</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            {{$t("releaseInfo")}}
          </v-list-item-title>
        </v-list-item>
       </v-list>

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

export default {
  name: 'App',
  components: {
    LoginButton,
    CreatePageButton
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
    }
  },
  data: () => ({
    drawer: true,
    dialog: false
  })
}
</script>
<style>
.opaque{
  background: white;
}
</style>
