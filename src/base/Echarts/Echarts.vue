<template>
<!-- <div>
    {{ sidebar }}
    {{ newSidebar }} -->
    <div class="echarts" ref="echarts"></div>
<!-- </div> -->
</template>
<script>
  // 此为按需加载 不考虑性能也可以全部加载 注意自己需要的是否引入了
  import echarts from 'echarts/lib/echarts'
  // 柱状图
  import 'echarts/lib/chart/bar'
  // 折线图
  import 'echarts/lib/chart/line'
  // 饼状图
  import 'echarts/lib/chart/pie'
  // 提示信息
  import 'echarts/lib/component/tooltip'
  // 标题
  import 'echarts/lib/component/title'
  // 图例
  import 'echarts/lib/component/legend'
  // 工具按钮
  import 'echarts/lib/component/toolbox'
  // echarts主题文件
  require('echarts/theme/macarons')
  import { debounce } from '@/utils'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      options: {
        type: Object,
        default: null
      },
      needResize:{
        type: Boolean,
        default: false
      },
      listenClick: {
        type: Boolean,
        default: false
      },
      listenDataviewchanged: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      newSidebar() {
        return this.sidebar
      }
    },
    // activated() {
    //   setTimeout(() => {
    //     this._initEcharts()
    //   }, 20)
    // },
    mounted() {
      setTimeout(() => {
        this._initEcharts()
      }, 20)
    },
    methods: {
      _initEcharts() {
//        options是null的时候回报错
        if(!this.$refs.echarts || !this.options) return
        this.echarts = echarts.init(this.$refs.echarts, 'macarons')
        this.echarts.setOption(this.options)
        // if(this.needResize){
        //   let me = this
        //   window.addEventListener('resize',()=>{
        //     console.log('图表自适应')
        //     // me.echarts.resize()
        //     //好像不需要延时也可以 注意测试有没有bug
        //    setTimeout(()=>{
        //      me.echarts.resize()
        //    },20)
        //   })
        // }

        // 图表自适应
        if (this.needResize) {
          let me = this;
          this.__resizeHanlder = debounce(() => {
          // console.log(this.__resizeHanlder);
            if (me.echarts) {
              console.log('图表自适应');
              me.echarts.resize();
            }
          }, 100);
          window.addEventListener('resize', this.__resizeHanlder);
        }

        // 监听侧边栏的变化
        // const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
        // sidebarElm.addEventListener('transitionend', this.__resizeHanlder);

        if(this.listenClick){
          let me = this
          this.echarts.on('click', (params) => {
            me.$emit('click', params)
          })
        }
        if(this.listenDataviewchanged){
          let me = this
          this.echarts.on('dataviewchanged', (params) => {
            me.$emit('dataviewchanged', params)
          })
        }
      },
      //改变视图
      resetEcharts() {
        this.echarts && setTimeout(() => {
          this.echarts.setOption(this.options)
          this.echarts.hideLoading()
        }, 20)
      },
      //将echarts实例返回出去 方便父级调用其属性 方法  不过最推荐是 在子组件里将方法封装好
      getEcharts() {
        if(this.echarts){
          return this.echarts
        }else{
          return null
        }
      },
      //下面几个简单的方法详细见官方api 有需要其他方法的详细见官网设置
      //显示加载动画效果。可以在加载数据前手动调用改接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      showLoading() {
        this.echarts && this.echarts.showLoading()
      },
      hideLoading() {
        this.echarts && this.echarts.hideLoading()
      },
      //清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。
      clearEcharts() {
        this.echarts && this.echarts.clear()
      },
      //销毁实例，销毁后实例无法再被使用。
      disposeEcharts() {
        this.echarts && this.echarts.dispose()
      }
    },
    watch: {
      //好像watch就可以 不需要手动调重新设置  这个有待检查
      options() {
        //若 this.echarts 值为 undefined 则重新初始化图表
        if(!this.echarts){
          setTimeout(() => {
            this._initEcharts()
          }, 20)
        //否则改变图表数据
        }else{
          this.resetEcharts()
        }
      },
      newSidebar: {
        handler: function(val, oldVal) {
          let me = this;
          this.__resizeHanlder();
          // window.addEventListener('resize', this.__resizeHanlder);
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
