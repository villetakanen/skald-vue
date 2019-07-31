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

        <v-spacer></v-spacer>

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
      <v-btn icon @click="dialog = !dialog">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

     <v-dialog
      v-model="dialog"
      max-width="800"
     >
     <v-card color="pink darken-1" dark>
      <v-card-title class="pink darken-3">Login</v-card-title>
      <v-card-text>
      <v-card-actions>
              <v-btn>
                  <v-icon>mdi-google</v-icon>
              </v-btn>
              <v-btn>
                  <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn>
                  <v-icon>mdi-github-circle</v-icon>
              </v-btn>
      </v-card-actions>
      </v-card-text>
     </v-card>
     </v-dialog>

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
  computed: {
    spacename () {
      return this.$store.state.space
      // return 'Skald'
    },
    spacelink () {
      return '/page/' + this.$store.state.space + '.' + this.$store.state.space
      // return '/page/skald.welcome'
    }
  },
  data: () => ({
    drawer: false,
    dialog: false
  })
}
</script>
<style>
.opaque{
  background: white;
}
</style>
