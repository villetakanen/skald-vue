<template>
  <v-list>

    <v-subheader>{{name}}</v-subheader>
    <v-list-item :to="'/v/' + link">
      <v-list-item-action><v-icon>mdi-dice-d20</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("indexpage")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/c/site/' + siteId">
      <v-list-item-action><v-icon>mdi-dice-d12</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("sitesettings")}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-subheader>{{$t("library")}}</v-subheader>
    <v-list-item :to="'/l/pages/' + siteId">
      <v-list-item-action><v-icon>mdi-dice-d10</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("listpages")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/l/sites/'">
      <v-list-item-action><v-icon>mdi-dice-d8</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("listsites")}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-subheader>Meta</v-subheader>
    <v-list-item href="https://github.com/vitku/skald-vue">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("releaseInfo")}}</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-action><v-icon>mdi-cup-water</v-icon></v-list-item-action>
      <v-list-item-title>6.0.1</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: ['site'],
  data: () => ({
    siteName: null
  }),
  computed: {
    link () {
      if (this.$store.state.binder.site === null) return ''
      return this.$store.state.binder.site.link
    },
    name () {
      if (this.$store.state.binder.site === null) return ''
      return this.$store.state.binder.site.name
    },
    siteId () {
      if (typeof this.site === 'undefined') return '...'
      return this.site.link.substring(0, this.site.link.indexOf('.'))
    }
  }
}
</script>
