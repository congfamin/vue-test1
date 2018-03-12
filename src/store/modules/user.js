import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 此处为登录动作
    Login ({commit}, userInfo) {
      // 去除 用户名、密码 的前后空格
      const userName = userInfo.userName.trim()
      // const password = userInfo.password.trim();
      // 此处ES6语法 等同于 return new Promise(function(resolve,reject){})
      return new Promise((resolve, reject) => {
        // 调用 api 下的 login.js 文件中的 login方法
        console.log('我是user.js下的登录动作')
        login(userName, userInfo.passWord).then(response => {
          console.log('我成功获得登录信息')
          console.log(userInfo.passWord)
          const data = response.data
          console.log(data)
          // 此处的 setToken 为utils下 auth.js中的方法
          // 登录成功后将token存储在cookie之中
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          console.log(data.token)
          resolve()
          // 此处 catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        // 调用 api 下的 login.js 文件中的 getInfo方法
        getInfo(state.token).then(response => {
          const data = response.data
          console.log(data)
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({commit, state}) {
      console.log('我点击登出啦')
      return new Promise((resolve, reject) => {
        // 调用 api 下的 login.js 文件中的 logOut方法
        logout(state.token).then(() => {
          // 清空 token
          commit('SET_TOKEN', '')
          // 清空 用户身份
          commit('SET_ROLES', [])
          // 清空 cookie 中的 token
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user