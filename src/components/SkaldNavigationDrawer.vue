<template>
  <v-list>

    <v-subheader>{{siteName}}</v-subheader>

    <v-list-item :to="siteLink">
      <v-list-item-action><v-icon>mdi-dice-d20</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("indexpage")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/l/pages/' + siteId">
      <v-list-item-action><v-icon>mdi-dice-d12</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("listpages")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/c/site/' + siteId">
      <v-list-item-action><v-icon>mdi-dice-d10</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("sitesettings")}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-subheader>{{$t("library")}}</v-subheader>

    <v-list-item :to="'/l/sites/'">
      <v-list-item-action><v-icon>mdi-dice-d8</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("listsites")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/v/skald'">
      <v-list-item-action><v-icon>mdi-dice-d6</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("skaldHomeLink")}}</v-list-item-title>
    </v-list-item>
    <v-list-item v-if="this.$store.state.creator.uid" :to="'/c/profile'">
      <v-list-item-action><v-icon>mdi-dice-d4</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("profileLink")}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-subheader>Meta</v-subheader>
    <v-list-item href="https://github.com/vitku/skald-vue">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("releaseInfo")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/v/skald/backlog'">
      <v-list-item-action><v-icon>mdi-cup-water</v-icon></v-list-item-action>

      <v-list-item-title >{{version}}</v-list-item-title>

    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: ['site'],
  computed: {
    siteName () {
      if (this.$store.state.binder.site === null) return 'Skald'
      return this.$store.state.binder.site.name
    },
    siteLink () {
      if (this.$store.state.binder.site === null) return '/v/skald'
      return '/v/' + this.$store.state.binder.site.link
    },
    siteId () {
      if (this.$store.state.binder.site === null) return 'skald'
      return this.$store.state.binder.site.link
    },
    version () {
      return this.$store.state.version
    }
  }
}
</script>
