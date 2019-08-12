<template>
  <v-card>
    <v-card-title>{{$t("ss-auth")}}</v-card-title>
    <v-card-text>
      <p>Owners
        <v-btn icon><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-pencil-off-outline</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-account-arrow-left</v-icon></v-btn>
      </p>
      <p>Members
        <v-btn icon><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-pencil-off-outline</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-account-arrow-left</v-icon></v-btn>
      </p>
      <p>Anonymous
        <v-btn icon><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-pencil-off-outline</v-icon></v-btn>
      </p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    memberCanSee: {
      get () {
        return false
      },
      set (b) {

      }
    }
  }
}
</script>
