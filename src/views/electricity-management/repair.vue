<template>
  <div class="repair ">
    <my-map></my-map>
  </div>
</template>

<script>
  import MyMap from 'views/map'

  export default {
    components: {
      MyMap
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .repair {
    width: 100%;
    height: 100%;
  }
</style>