// import types from '../types.js'
import { getMonitorPoint } from '@/api/monitorpoint'
import axios from 'axios'

const app = {
  state: {
    sidebar: {
      opened: true
    },
    monitoringPoint: '',
    detailShow: false,
    dmPoints: '',
    warnValue: '',
    dialogFormVisible: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    GET_MONITOR_POINT: (state, data) => {
      state.monitoringPoint = data
    },
    SHOW_DETAIL: (state, data) => {
      state.detailShow = true
      state.dmPoints = data
    },
    CLOSE_DETAIL: state => {
      state.detailShow = false
    },
    SHOW_WARN: (state, data) => {
      state.warnValue = data
    },
    MODIFY_PASS: state => {
      state.dialogFormVisible = true
    },
    CLOSE_DIALOG: state => {
      state.dialogFormVisible = false
    }
  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    },
    getMonitoringPoint: ({commit}) => {
      getMonitorPoint().then(res => {
        console.log(res)
        commit('GET_MONITOR_POINT', res.data.options)
      }).catch(error => {
        console.log(error)
      })
    },
    showDetail: ({commit}, dmPoints) => {
      commit('SHOW_DETAIL', dmPoints)
    },
    closeDetail: ({commit}) => {
      commit('CLOSE_DETAIL')
    },
    // 日负荷监测表的负荷阈值
    showWarn: ({commit}, warnValue) => {
      commit('SHOW_WARN', warnValue)
    },
    // 修改密码
    modifyPass: ({commit}) => {
      commit('MODIFY_PASS')
    },
    closeDialog: ({commit}) => {
      commit('CLOSE_DIALOG')
    }
  }
}

export default app