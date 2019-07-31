<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
       <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
       </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Skald</span>
        <span> - </span>
        <span class="font-weight-light">{{$t("wikititle")}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="http://github.com/vitku/adaptivestoryengine"
        target="_blank"
      >
        <span class="mr-2">{{$t("releaseInfo")}}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Reader from './views/Reader.vue'

export default {
  name: 'App',
  components: {
    // Reader
  },
  data: () => ({
    drawer: true
  })
}
</script>
