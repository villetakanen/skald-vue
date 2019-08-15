<template>
  <v-container>
    <v-layout>
      <v-card>
        <v-card-title>{{$t('attachments')}}</v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: [
    'siteid'
  ]
}
</script>
