<template>
  <v-card>
    <v-card-title>{{$t("ss-auth")}}</v-card-title>
    <v-card-text>
      <v-switch
      v-model="hide"
      :label="$t('ss-hide-site')"
      ></v-switch>
      <v-switch
      v-model="lock"
      :label="$t('ss-lock-site')"
      ></v-switch>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    hideV: false,
    lockV: false
  }),
  computed: {
    hide: {
      get () {
        return this.hideV
      },
      set () {
        this.$store.dispatch('siteSettings/setHide',
          { siteid: this.$store.state.binder.site.link, hidden: this.hideV })
      }
    },
    lock: {
      get () {
        return this.lockV
      },
      set () {
        this.$store.dispatch('siteSettings/setLock',
          { siteid: this.$store.state.binder.site.link, writelock: this.lockV })
      }
    }
  }
}
</script>
