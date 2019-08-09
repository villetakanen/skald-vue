<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-table
          :items="pages"
          :headers="headers"
          item-key="name"
          dense>
          <template v-slot:item.name="{ item }">
            <router-link :to="item.link" style="text-decoration: none">{{ item.name }}</router-link>
          </template>
        </v-data-table>
        <div v-if="false">
          <p v-for="(item, index) in pages" v-bind:key="index">
            {{ item }}
          </p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import firebase from 'firebase'

export default {
  props: ['siteid'],
  data: () => ({
    headers: [
      {
        text: 'Page',
        align: 'left',
        sortable: true,
        value: 'name',
        width: '20%'
      },
      {
        text: 'Last update',
        align: 'left',
        sortable: true,
        value: 'updated',
        width: '20%'
      }
    ]
  }),
  computed: {
    pages: {
      get () {
        var r = []
        for (var i in this.$store.state.binder.pages) {
          var t = null
          if (typeof this.$store.state.binder.pages[i].lastUpdate !== 'undefined') {
            t = new Date(1970, 0, 1) // Epoch
            t.setSeconds(this.$store.state.binder.pages[i].lastUpdate.seconds)
            t = t.toISOString()
          }
          r.push({ link: '/v/' + this.siteid + '/' + i,
            name: this.$store.state.binder.pages[i].name,
            updated: t })
        }
        return r
      },
      set () {
      }
    }
  },
  methods: {
    rowClick (a) {
      this.selectedItem = a
      console.log('rowClick', a)
    }
  },
  created () {
    console.log('ListPages created with', this.siteid)
    this.$store.dispatch('binder/getPages', { siteid: this.siteid })
  }
}
</script>
