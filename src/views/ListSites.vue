<template>
  <v-container>
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
  </v-container>
</template>
<script>
export default {
  computed: {
    sites () {
      var r = []
      for (var i in this.$store.state.binder.sites) {
        r.push({ link: i,
          name: this.$store.state.binder.sites[i].name,
          theme: this.$store.state.binder.sites[i].theme })
      }
      console.log('s:', this.$store.state.binder.sites, r)
      return r
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
      }
    ]
  })
}
</script>
