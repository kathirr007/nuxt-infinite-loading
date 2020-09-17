<template>
  <v-flex>
    <h2 class="white--text text-center pa-3">
      Vue infinite loading implementation for Nuxt project
    </h2>
    <v-container fluid grid-list-lg>
      <posts />
    </v-container>
  </v-flex>
</template>

<script>
import posts from '~/components/Posts.vue'

export default {
  components: { posts }
}
</script>

<style lang="scss"></style>
