<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item">
      <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
      <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    created () {
      this.getBreadcrumb()
    },
    data () {
      return {
        levelList: null
      }
    },
    methods: {
      getBreadcrumb () {
        //$route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
        //此处进行过滤，将有name的路由赋值给matched
        let matched = this.$route.matched.filter(item => item.name)
        // console.log(matched);
        const first = matched[0]
        // console.log(first);
        if (first && (first.name !== '首页' || first.path !== '')) {
          //concat() 方法用于连接两个或多个数组。
          //该方法不会改变现有的数组,而仅仅会返回被连接数组的一个副本。
          matched = [{name: '首页', path: '/'}].concat(matched)
          // console.log(matched);
        }
        this.levelList = matched
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px; // line-height: 40px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
