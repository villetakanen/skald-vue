<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Skald</span>
        <span> - </span>
        <span class="font-weight-light">A wiki for RPG materials</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="http://github.com/vitku/adaptivestoryengine"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
        >
          <Markdown/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Markdown from './components/Markdown'

export default {
  name: 'App',
  components: {
    Markdown
  },
  data: () => ({
    drawer: true
  })
}
</script>
