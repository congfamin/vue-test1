<template>
    <div class="lettingout">
        <span @click="toggleClick"><i class="iconfont icon-sandaogangwutianchong icon" :class="{'is-active':isActive}"></i></span>
    </div>
</template>

<script>
    export default {
      name: 'lettingout',
      //prop 验证
      props: {
        isActive: {
          type: Boolean,
          default: false
        },
        toggleClick: {
          type: Function,
          default: null
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .icon {
        display: inline-block; 
        cursor: pointer; 
        width: 20px;
        height: 20px;
        color: #3B3B3B;
        /* transform: rotate(0deg);
        transition: .38s; */
        /* transform-origin: 50% 50%;   */
    }
    .icon.is-active {
        /* transform: rotate(90deg);  */
        /* color: red; */
    }
</style>
