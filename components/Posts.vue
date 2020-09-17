<template>
  <v-card flat class="infinite-loader pa-3">
    <v-layout row wrap>
      <transition-group name="slideDown">
        <v-flex v-for="title in titles" :key="title.id">
          <v-card flat hover class="white pb-2 mb-1 pl-2">
            <v-layout>
              <v-flex xs12>
                <div class="pa-2">{{ title.body }}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </transition-group>
    </v-layout>
    <infinite-loading v-if="titles.length" @infinite="infiniteScroll">
      <div slot="spinner">
        <custom-spinner />
      </div>
    </infinite-loading>
  </v-card>
</template>

<script>
import customSpinner from '@/components/customSpinner'

import axios from 'axios'

export default {
  name: 'Posts',
  components: {
    customSpinner,
  },
  data() {
    return {
      titles: [],
      page: 1,
      start: 0,
    }
  },
  computed: {
    url() {
      return `https://jsonplaceholder.typicode.com/posts?_start=${this.start}&_limit=10`
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const response = await axios.get(this.url)
      this.titles = response.data
    },
    infiniteScroll($state) {
      setTimeout(() => {
        // this.page++
        this.start = this.titles.length
        axios
          .get(this.url)
          .then((response) => {
            if (response.data.length > 1) {
              response.data.forEach((item) => this.titles.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-card {
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
