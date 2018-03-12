// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// element-ui的主题文件
import '../theme/index.css'
// 用以代替reset.css的插件
import 'normalize.css/normalize.css'
// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条 样式
import 'nprogress/nprogress.css'
import './assets/iconfont/iconfont'
import IconSvg from './components/Icon-svg'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import './mock/index.js';


Vue.config.productionTip = false

Vue.component('icon-svg', IconSvg)
Vue.use(ElementUI);
// 将 axios 注册为全局函数 
Vue.prototype.axios = axios

// 定义免登陆白名单
const whiteList = ['/login'];

// 路由拦截
// to: Route: 即将要进入的目标 路由对象

// from: Route: 当前导航正要离开的路由

// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

// next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

router.beforeEach((to, from, next) => {
  // 开启 Progress 进度条
  NProgress.start();
  // 首先判断cookie中是否存在 token
  if (getToken()) {
    // 如果即将进入的目标路由对象的路径为 '/login'
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 判断当前是否已经拉取完 user_info 信息
      if (store.getters.roles.length === 0) {
        // 如果此时用户身份为空，则派发 GetInfo 动作至 user.js 中，用以拉取用户信息
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.role;
          // 将动作派发至 permission.js 中，并将 roles（用户身份）传入
          // 生成可访问的路由表
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问的路由表
            router.addRoutes(store.getters.addRouters);
            // hack方法 确保addRoutes已完成
            next({ ...to });
          })
        })
      } else {
        // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        next();
      }
    }
  } else {
    // 若在免登陆白名单中，直接进入
    if (whiteList.indexOf(to.path) !== -1){
      next()
    } else {
      // 否则跳转登录界面
      next('/login');
      // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      NProgress.done();
    }
  }
});

// 一个全局的 after 钩子，不过它不像 before 钩子那样，after 钩子没有 next 方法，不能改变导航
router.afterEach(() => {
  // 关闭 Progress 进度条
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
