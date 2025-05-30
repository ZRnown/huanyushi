<template>
  <TopNavBar />
  <router-view></router-view>
  <StagewiseToolbar v-if="isDev" :config="stagewiseConfig" />
</template>

<script>
import TopNavBar from './components/TopNavBar.vue'
import { StagewiseToolbar } from '@stagewise/toolbar-vue'

export default {
  name: 'App',
  components: {
    TopNavBar,
    StagewiseToolbar
  },
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      stagewiseConfig: { plugins: [] }
    }
  }
}
</script>

<script setup>
// 其它 setup 逻辑
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
