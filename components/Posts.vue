<template>
  <v-card flat class="infinite-loader pa-3">
    <v-layout row wrap>
      <transition-group name="slideDown">
        <v-flex v-for="title in titles" :key="title.id">
          <v-card flat class="pb-2 mb-1 pl-2">
            <v-layout>
              <v-flex xs12>
                <div class="pa-2 brown--text text--darken-4">
                  {{ title.body }}
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </transition-group>
    </v-layout>
    <infinite-loading v-if="titles.length" @infinite="infiniteScroll">
      <div slot="spinner" class="align-center justify-center d-flex">
        <!-- <custom-spinner /> -->
        <!-- <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" /> -->
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="65"
          color="#ff1d5e"
        />
      </div>
    </infinite-loading>
  </v-card>
</template>

<script>
// import customSpinner from '@/components/customSpinner'
import BreedingRhombusSpinner from '@/components/shared/BreedingRhombusSpinner'
// import BreedingRhombusSpinner from 'epic-spinners/src/components/lib/BreedingRhombusSpinner'
// import { BreedingRhombusSpinner } from 'epic-spinners'
// import {
//   AtomSpinner
// } from 'epic-spinners'

import axios from 'axios'

export default {
  name: 'Posts',
  components: {
    // customSpinner,
    BreedingRhombusSpinner,
    // AtomSpinner
  },
  data () {
    return {
      titles: [],
      page: 1,
      start: 0
    }
  },
  computed: {
    url () {
      return `https://jsonplaceholder.typicode.com/posts?_start=${this.start}&_limit=10`
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      const response = await axios.get(this.url)
      this.titles = response.data
    },
    infiniteScroll ($state) {
      setTimeout(() => {
        // this.page++
        this.start = this.titles.length
        axios
          .get(this.url)
          .then((response) => {
            if (response.data.length > 1) {
              response.data.forEach(item => this.titles.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
    background-color: #f5f5f5;

    &.infinite-loader {
        // height: calc(100vh - 300px);
        height: 50vh;
        overflow: hidden;
        overflow-y: auto;
        background-color: orange;
    }
}

.slideDown-enter-active,
.slideDown-leave-active {
    transition: all 0.3s ease-in;
}

.slideDown-enter,
.slideDown-leave-to {
    opacity: 0;
    transform: translateY(50px);
}
</style>
