<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <h3 class="title">电力监测与管理系统</h3>
          <el-form-item prop="email">
            <ul class="ul_userName">
              <li class="li_userName"><i class="iconfont icon-shiliangzhinengduixiang icon"></i></li>
              <li class="userName"><input name="email" type="text" autofocus v-model="loginForm.userName"
                                          autoComplete="on" placeholder="用户名" @keyup.enter="focusNext"></input></li>
            </ul>
          </el-form-item>
          <el-form-item prop="password">
            <ul class="ul_passWord">
              <li class="li_passWord"><i class="iconfont icon-suo icon"></i></li>
              <li class="passWord"><input name="password" type="password" @keyup.enter="handleLogin"
                                          v-model="loginForm.password" autoComplete="on" placeholder="密码"
                                          ref="inputpassWord"></input></li>
            </ul>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // md5加密 用以登陆密码加密
  var md5 = require('js-md5')
  export default {
    name: 'login',
    data () {
      // 此处为 用户名 的自定义验证规则
      const validateName = (rule, value, callback) => {
        if (value.length < 10) {
          callback(new Error('请输入正确的合法用户名'))
        } else {
          callback()
        }
      }
      // 此处为 密码 的自定义规则
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: 'admin@nzsc.com',
          passWord: ''
        },
        // elementUI 表单验证规则
        loginRules: {
          userName: [
            // required: true 必填 trigger: 'blur' 焦点移开后验证 此处自定义了验证规则（规则代码在上方）
            {required: true, trigger: 'blur', validator: validateName}
          ],
          passWord: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        // loading 为elementUI自带的属性
        // 当 loading 为true时 为加载状态
        loading: false
      }
    },
    // created() {
    //     console.log(md5(this.loginForm.passWord));
    // },
    methods: {
      handleLogin () {
        // 此处validate是elementUI里的事件
        // 用于对整个表单进行校检，返回一个boolean值
        this.$refs.loginForm.validate(valid => {
          // 若表单验证通过，执行以下代码
          if (valid) {
            this.loading = true
            console.log('我点击了登录按钮')
            // 将密码md5加密后重新赋值给自身
            this.loginForm.passWord = md5(this.loginForm.passWord)
            // 派发 Login 动作并将此表单内容传至 user.js
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              // 若响应成功（即登录成功）则进行路由跳转
              // 注意: push 方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面
              setTimeout(() => {
                this.$router.push({path: '/'})
              }, 400)
              // 此处 catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
              // 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法
              // 理由是该种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error sumbit')
            return false
          }
        })
      },
      focusNext () {
        this.$refs.inputpassWord.focus()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
    // background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
    // background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
    // background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
    background: url(../../assets/banner.jpg) no-repeat;
    background-size: 100% 100%;
    .login-wrapper {
      position: absolute;
      top: 10%;
      right: 8%;
      width: 400px;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 8px;
      // box-shadow: 2px 4px 4px #ccc;
      background-color: #fff;
      .login-container {
        width: 300px;
        margin: 40px auto;
        .title {
          font-weight: bold;
          color: #104E8B;
          letter-spacing: 2px;
          text-align: center;
          margin: 40px auto;
          text-shadow: 1px 1px 1px #ccc;
        }
        .el-form-item {
          text-align: center;
          margin-bottom: 25px;
          .el-button {
            width: 300px;
            height: 40px;
            font-size: 16px;
            box-shadow: 1px 1px 2px #4F94CD;
          }
          .ul_userName, .ul_passWord {
            width: 100%;
            display: flex;
            list-style: none;
          }
          li {
            height: 40px;
          }
          .icon {
            color: #4F94CD;
          }
          .li_userName, .li_passWord {
            width: 15%;
            background-color: #eee;
            text-align: center;
            border-radius: 4px 0px 0px 4px;
            border: 1px solid #ccc;
            border-right: none;
          }
          .userName, .passWord {
            width: 85%;
            height: 40px;
          }
          input {
            width: 100%;
            height: 40px;
            border-radius: 0px 4px 4px 0px;
            border: 1px solid #ccc;
            text-indent: 15px;
          }
        }
        .hint {
          color: #104E8B;
          list-style: none;
          display: flex;
          justify-content: space-between;
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>