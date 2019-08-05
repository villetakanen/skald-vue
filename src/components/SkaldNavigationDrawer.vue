<template>
  <v-list>
    <v-subheader>{{site.Name}}</v-subheader>
    <v-list-item :to="'/page/' + site.Link">
      <v-list-item-action><v-icon>mdi-dice-d20</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("indexpage")}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/settings/site/' + siteId">
      <v-list-item-action><v-icon>mdi-dice-d12</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("sitesettings")}}</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Meta</v-subheader>
    <v-list-item href="https://github.com/vitku/skald-vue">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>{{$t("releaseInfo")}}</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-action><v-icon>mdi-cup-water</v-icon></v-list-item-action>
      <v-list-item-title>3.1.1</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: ['site'],
  computed: {
    siteId () {
      return this.site.Link.substring(0, this.site.Link.indexOf('.'))
    }
  }
}
</script>
