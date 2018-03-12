<template>
  <div class="header">
    <div class="logo">
      <div style="height:30px"><img class="logo_img" src="../../assets/logo.png" alt=""></div>
      <p class="logo-text">用电监测与管理系统</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    box-sizing: border-box;
    width: 200px;
    height: 70px;
    top: 0;
    font-size: 14px;
    line-height: 50px;
    background-color: #324157;
    overflow: hidden;
    background-color: #008B8B;
    background-image: -webkit-linear-gradient(left, #242424, #4F4F4F);
  }

  .logo_img {
    width: 60%; // height:;
    text-align: center;
    vertical-align: middle;
  }

  .logo {
    text-align: center;
    padding-bottom: 5px;
    .logo-text {
      font-size: 14px;
      text-shadow: 2px 4px 2px #292929;
      padding: 0px;
      letter-spacing: 2px;
      color: #fff;
    }
  }
</style>