<template>
  <v-container
    fluid
    grid-list-md>
    <!-- v-layout>
      <v-flex>
        <v-data-table
          :items="sites"
          :headers="headers"
          item-key="name"
          dense>
          <template v-slot:item.name="{ item }">
            <router-link :to="'/v/'+item.link" style="text-decoration: none">{{ item.name }}</router-link>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout-->
    <v-layout wrap>
      <v-flex xs12>
        <CreateSiteButton/>
      </v-flex>
      <template v-for="(site, index) in list">
        <v-flex xs6 md3 v-bind:key="index">
          <v-card :class="site.theme">
            <v-card-title><router-link :to="`/v/${index}`">{{site.siteid}}.</router-link></v-card-title>
            <v-card-text>
              <p><router-link :to="`/v/${index}`">{{index}}</router-link></p>
              <ViewAttachment :path="`/${index}/logo.png`" view="true"/>
              <p>theme: {{site.theme}}<br/>
              locked: {{site.writelock}}<br/>
              hidden: {{site.hidden}}</p>
              </v-card-text>
          </v-card>
        </v-flex>
    </template>
    </v-layout>
  </v-container>
</template>
<script>
import CreateSiteButton from '../components/CreateSiteButton'
import ViewAttachment from '../components/ViewAttachment'

export default {
  computed: {
    sites () {
      var r = []
      for (var i in this.$store.state.binder.sites) {
        // console.log(this.$store.state.binder.sites[i])
        var vis = 'open'
        if (this.$store.state.binder.sites[i].hidden) vis = 'closed'
        r.push({ link: i,
          name: this.$store.state.binder.sites[i].name,
          theme: this.$store.state.binder.sites[i].theme,
          hidden: vis })
      }
      // console.log('s:', this.$store.state.binder.sites, r)
      return r
    },
    list () {
      return this.$store.getters['sites/list']()
    }
  },
  created () {
    this.$store.dispatch('binder/getSites')
  },
  data: () => ({
    headers: [
      {
        text: 'Site',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Theme',
        align: 'left',
        sortable: true,
        value: 'theme'
      },
      {
        text: 'Hidden',
        align: 'left',
        sortable: true,
        value: 'hidden'
      }
    ]
  }),
  components: {
    CreateSiteButton,
    ViewAttachment
  }
}
</script>

<style>
div.Scifi.v-card,
div.Scifi.v-card .v-card__text {
  background-color: #424242;
  color: #aef
}
div.Quick.v-card h1,
div.Quick.v-card .v-card__title,
div.Quick.v-card .v-card__title a {
  font-family: Lato, Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
}
</style>
