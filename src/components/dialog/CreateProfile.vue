<template>
  <v-card>
    <v-card-title>Please create a profile!</v-card-title>
    <v-card-text>{{displayName}}</v-card-text>
    <v-card-actions><v-btn @click="toProfile">update profile</v-btn></v-card-actions>
  </v-card>
</template>
<script>
export default {
  computed: {
    displayName () {
      return this.$store.state.creator.displayName
    }
  },
  methods: {
    toProfile () {
      this.$router.push('/c/profile')
    }
  }
}
</script>
