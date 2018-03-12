<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <headbar class="headbar"></headbar>
    <sidebar class="sidebar-container"></sidebar>
    <navbar class="navbar"></navbar>
    <div class="main-container">
      <app-main class="app-container"></app-main>
    </div>
    <el-dialog title="修改密码" :visible="dialogFormVisible" :show-close="false">
      <el-form :model="modifyForm" :rules="rules" ref="modifyForm" :label-width="formLabelWidth">
        <el-form-item label="新密码" prop="passWord" style="margin-bottom:20px">
          <el-input type="password" v-model="modifyForm.passWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="modifyForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="comfirm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Headbar, Navbar, Sidebar, AppMain } from 'views/layout'

  export default {
    name: 'Layout',
    components: {
      Headbar,
      Navbar,
      Sidebar,
      AppMain
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.modifyForm.checkPass !== '') {
            this.$refs.modifyForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.modifyForm.passWord) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        modifyForm: {
          passWord: '',
          checkPass: ''
        },
        formLabelWidth: '120px',
        rules: {
          passWord: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'dialogFormVisible'
      ]),
      sidebar () {
        return this.$store.state.app.sidebar
      }
    },
    methods: {
      comfirm () {
        this.$refs.modifyForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('closeDialog')
            // 此处写接口
            this.$alert('修改成功，请重新登陆!', {
              confirmButtonText: '确定',
              callback: action => {
                this.$store.dispatch('LogOut').then(() => {
                  // 页面刷新，重新初始化vue-router对象，避免bug
                  location.reload()
                })
              }
            })
            this.$refs.modifyForm.resetFields()
            this.loading = false
          } else {
            console.log('error sumbit')
            return false
          }
        })
      },
      cancel () {
        this.$refs.modifyForm.resetFields()
        this.$store.dispatch('closeDialog')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    // background-color: #eee;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-container {
        width: 36px;
        overflow: inherit;
      }
      .main-container {
        margin-left: 36px;
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 200px; // height: 100%;
      position: fixed;
      top: 70px;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto; // &::-webkit-scrollbar {display:none}
    }
    .headbar {
      position: fixed;
      z-index: 1000;
    }
    .main-container {
      position: absolute;
      bottom: 0;
      top: 50px;
      left: 0;
      right: 0;
      // height: 100%;
      transition: margin-left .28s ease-out;
      margin-left: 200px;
      // margin-top: 50px;
    }
    .app-container {
      width: 100%;
      height: 100%;
    }
  }
</style>