<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <!-- 此处不得用keep-alive进行缓存，会导致二次切换路由时echarts无法正常显示 -->
      <!-- <keep-alive> -->
      <router-view :key="key"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    created () {
      this.$store.dispatch('getMonitoringPoint')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    height: 100%;
  }
</style>