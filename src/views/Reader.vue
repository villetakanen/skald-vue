<template>
    <v-container
        fluid
        fill-height
      >
        <v-layout
        >
          <Markdown v-bind:content="content"/>
        </v-layout>
      </v-container>
</template>
<script>
import Markdown from '../components/Markdown'

export default {
  data: () => ({
    content: { markdown: '# A heading!\n\nAnd text!\n' }
  }),
  components: {
    Markdown
  }
}
</script>
