import Vue from 'vue'
import Router from 'vue-router'
// 在开发环境中不使用懒加载，因为懒加载会降低webpack热更新的速度，只有在生产环境中使用懒加载
const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from 'views/layout/Layout'

// 登录
const Login = _import('login/login')

// 企业介绍
const Introduction = _import('introduction/index')

// 基本信息
const BasicInfo = _import('basic-info/index')

// 总体用能
const DashBoard = _import('dashboard/index')

// 用电接线图
const WiringDiagram = _import('wiring-diagram/index')

// 设备信息
const ShuntElectricityOne = _import('device-information/ShuntElectricityOne')
const ShuntElectricityTwo = _import('device-information/ShuntElectricityTwo')
const ShuntElectricityThree = _import('device-information/ShuntElectricityThree')
const ShuntElectricityFour = _import('device-information/ShuntElectricityFour')
const ShuntElectricityFive = _import('device-information/ShuntElectricityFive')
const ShuntElectricitySix = _import('device-information/ShuntElectricitySix')

// 用电分析
const AnalysisOne = _import('electricity-analysis/AnalysisOne')
const AnalysisTwo = _import('electricity-analysis/AnalysisTwo')
const AnalysisThree = _import('electricity-analysis/AnalysisThree')
const AnalysisFour = _import('electricity-analysis/AnalysisFour')
const AnalysisFive = _import('electricity-analysis/AnalysisFive')
const AnalysisSix = _import('electricity-analysis/AnalysisSix')
const AnalysisSeven = _import('electricity-analysis/AnalysisSeven')

// 人员管理
const repair = _import('electricity-management/repair')
const monitor = _import('electricity-management/monitor')
const tour = _import('electricity-management/tour')

// 统计报表
// 监测表
const pointIndex = _import('statistical-report/point/index')
const pointTwo = _import('statistical-report/point/pointTwo')
const pointThree = _import('statistical-report/point/pointThree')
const pointFour = _import('statistical-report/point/pointFour')
const pointFive = _import('statistical-report/point/pointFive')
const pointSix = _import('statistical-report/point/pointSix')
const pointSeven = _import('statistical-report/point/pointSeven')
// 报表
const reportIndex = _import('statistical-report/report/index')
const reportOne = _import('statistical-report/report/reportOne')
const reportEight = _import('statistical-report/report/reportEight')
const reportNine = _import('statistical-report/report/reportNine')
const reportTen = _import('statistical-report/report/reportTen')
const reportEleven = _import('statistical-report/report/reportEleven')
const reportTwelve = _import('statistical-report/report/reportTwelve')

// 异常用电
const WarnReport = _import('abnormal-electricity/index')
const FaultRecord = _import('abnormal-electricity/faultRecord')

// 测试
const Test = _import('test/index')
const routerTest = _import('test/routerTest')
const Test1 = _import('test/animation')
const pagination = _import('test/pagination')
const repairTable = _import('table/repair/repairTable')

Vue.use(Router)

/**
 * icon : 显示在侧导航中的图标
 * icon : the icon show in the sidebar
 * hidden : 如果 hidden 为 true 将不会显示在侧导航中
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : 如果 redirect 为 noredirect 在路径导航中将不能跳转
 * redirect : if `redirect:noredirect` will not redirect in the levelbar
 * noDropdown : 如果 noDropdown 为 true 将不会有子菜单在侧导航中
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : 如果 role 为 admin 将决定页面的功能
 * meta : `{ role: ['admin'] }`  will control the page role
 **/

// 所有权限通用的路由表
// 如首页和登录页以及一些不需要权限的公共页面
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  // { path: '/', redirect: '/dashboard/index', hidden: true },
  {path: '*', redirect: '/dashboard/index', hidden: true},
  // {
  //   path: '/test/index',
  //   component: Test
  // },
  // {
  //   path: '/test/pagination',
  //   component: pagination
  // },
  // {
  //   path: '/test/routerTest/:id',
  //   component: routerTest,
  //   name: '路由测试'
  // }
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    hidden: true,
    // 子路由的路径前面不得加/
    children: [
      {
        path: 'index',
        component: Introduction,
        name: '企业介绍'
      }
    ]
  },
  {
    path: '/basic-info',
    component: Layout,
    redirect: '/basic-info/index',
    noDropdown: true,
    icon: 'jibenxinxi',
    children: [
      {
        path: 'index',
        component: BasicInfo,
        name: '基本信息'
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    noDropdown: true,
    icon: 'yongnengjiancefuwu',
    children: [
      {
        path: 'index',
        component: DashBoard,
        name: '总体用能'
      }
    ]
  },
  {
    path: '/wiring-diagram',
    component: Layout,
    redirect: 'noredirect',
    name: '接线图',
    icon: 'zhujiexiantu',
    children: [
      {
        path: 'index',
        component: WiringDiagram,
        name: '实际用电接线图'
      }
    ]
  },
  {
    path: '/statistical-report',
    component: Layout,
    redirect: 'noredirect',
    name: '统计报表',
    icon: 'baobiao',
    children: [
      {
        path: '/statistical-report/point',
        component: pointIndex,
        redirect: 'noredirect',
        name: '监测表',
        children: [
          {
            path: 'pointTwo',
            component: pointTwo,
            name: '日负荷监测表'
          },
          {
            path: 'pointThree',
            component: pointThree,
            name: '月负荷监测表'
          },
          {
            path: 'pointFour',
            component: pointFour,
            name: '日电量表'
          },
          {
            path: 'pointFive',
            component: pointFive,
            name: '月电量表'
          },
          {
            path: 'pointSix',
            component: pointSix,
            name: '月峰谷电量表'
          },
          {
            path: 'pointSeven',
            component: pointSeven,
            name: '电压电流表'
          }
        ]
      },
      {
        path: '/statistical-report/report',
        component: reportIndex,
        redirect: 'noredirect',
        name: '报表',
        children: [
          {
            path: 'reportOne',
            component: reportOne,
            name: '抄见电量日报表'
          },
          {
            path: 'reportEight',
            component: reportEight,
            name: '分段电量日报表'
          },
          {
            path: 'reportNine',
            component: reportNine,
            name: '用电结构日电量报表'
          },
          {
            path: 'reportTen',
            component: reportTen,
            name: '抄见示值日报表'
          },
          {
            path: 'reportEleven',
            component: reportEleven,
            name: '抄见电量小时报表'
          },
          {
            path: 'reportTwelve',
            component: reportTwelve,
            name: '用电分析简报'
          }
        ]
      }
    ]
  },
  {
    path: '/device-information',
    component: Layout,
    redirect: 'noredirect',
    name: '设备信息',
    icon: 'shebeixinxiguanli',
    children: [
      {
        path: 'ShuntElectricityOne',
        component: ShuntElectricityOne,
        name: '实时用电数据'
      },
      {
        path: 'ShuntElectricityTwo',
        component: ShuntElectricityTwo,
        name: '日用电数据'
      },
      {
        path: 'ShuntElectricityThree',
        component: ShuntElectricityThree,
        name: '月用电数据'
      },
      {
        path: 'ShuntElectricityFour',
        component: ShuntElectricityFour,
        name: '年用电数据'
      },
      {
        path: 'ShuntElectricityFive',
        component: ShuntElectricityFive,
        name: '监测点对比分析'
      },
      {
        path: 'ShuntElectricitySix',
        component: ShuntElectricitySix,
        name: '监测点越限查询'
      }
    ]
  },
  {
    path: '/electricity-analysis',
    component: Layout,
    redirect: 'noredirect',
    name: '用电分析',
    icon: 'fenxi',
    children: [
      {
        path: 'AnalysisOne',
        component: AnalysisOne,
        name: '电量分析'
      },
      {
        path: 'AnalysisTwo',
        component: AnalysisTwo,
        name: '负荷分析'
      },
      {
        path: 'AnalysisThree',
        component: AnalysisThree,
        name: '用电量构成分析'
      },
      {
        path: 'AnalysisFour',
        component: AnalysisFour,
        name: '单元用电越限分析'
      },
      {
        path: 'AnalysisFive',
        component: AnalysisFive,
        name: '分时电量分析'
      },
      {
        path: 'AnalysisSix',
        component: AnalysisSix,
        name: '报装方式分析'
      },
      {
        path: 'AnalysisSeven',
        component: AnalysisSeven,
        name: '电费单专项分析'
      }
    ]
  },
  {
    path: '/electricity-management',
    component: Layout,
    redirect: 'noredirect',
    name: '用电管理',
    icon: '42',
    children: [
      {
        path: 'repair',
        component: repair,
        name: '抢修管理'
      },
      {
        path: 'monitor',
        component: monitor,
        name: '门禁管理'
      },
      {
        path: 'tour',
        component: tour,
        name: '巡视管理'
      }
    ]
  },
  {
    path: '/abnormal-electricity',
    component: Layout,
    redirect: 'noredirect',
    name: '异常用电',
    icon: 'msnui-alarm-triangle',
    children: [
      {
        path: 'index',
        component: WarnReport,
        name: '异常报警'
      },
      {
        path: 'faultRecord',
        component: FaultRecord,
        name: '故障记录'
      }
    ]
  }
]

// 实例化vue时只挂载constantRouterMap
export default new Router({
  // mode: 'history', //后端支持可开
  //当跳转到一个新的页面时，定位到页面最顶端
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

// 需要异步挂载的路由
// 动态需要根据权限加载的路由
export const asyncRouterMap = []