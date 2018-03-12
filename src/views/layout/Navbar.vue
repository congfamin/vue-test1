<template>
  <el-menu class="navbar" mode="horizontal">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :xs="20" :sm="14" :md="10" :lg="8" style="display:flex;">
        <letting-out class="lettingout-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></letting-out>
        <levelbar class="levelbar"></levelbar>
      </el-col>
      <el-col :xs="4" :sm="10" :md="14" :lg="16" class="avatar-col">
        <div class="avatar-wrapper">
          <ul class="avatar-container">
            <router-link to="/BasicInfo/index">
              <li class="avatar-li"><img class="user-avatar" src="../../assets/useravatar.jpg">
                <span class="userName">{{ name }}</span>
              </li>
            </router-link>
            <li class="dropdown-icon">
              <i class="iconfont icon-shezhi" style="color:#FFFF00"></i>
              <el-dropdown class="dropdown">
                <span class="el-dropdown-link" style="color:#666666">
                  关于我们
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="color:#242424">
                  <router-link to="/introduction/index">
                    <el-dropdown-item>
                      <i class="iconfont icon-qiyejieshao" style="color:#90EE90"></i>
                      <span>企业介绍</span>
                    </el-dropdown-item>
                  </router-link>
                  <el-dropdown-item>
                    <router-link to="">
                      <i class="iconfont icon-150" style="color:#CD69C9"></i>
                      <span>使用说明</span>
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="iconfont icon-kefu-copy icon-two" style="color:#5CACEE"></i>
                    <span @click="phone">客服电话</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="">
                      <i class="iconfont icon-shenqingtixiantianjiazhanghao icon-three" style="color:#FF4500"></i>
                      <span>账号申请</span>
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="iconfont icon-xiugaimima" style="color:#A52A2A"></i>
                    <span @click="modifyPass">修改密码</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li @click="logout">
              <i class="iconfont icon-dengchu icon-four"></i>
              <span class="logout-span">登出</span>
            </li>
            <div @click="change" class="safety">
              <el-tag type="danger" v-if="warn">
                <router-link to="/abnormal-electricity/index">
                  <i class="iconfont icon-anquancopy"></i> 出现异常
                </router-link>
              </el-tag>
              <el-tag type="success" v-else>
                <i class="iconfont icon-anquancopy"></i> 安全用电：365天
              </el-tag>
              <audio src=""></audio>
            </div>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import LettingOut from 'components/LettingOut'
  import Levelbar from './Levelbar'

  export default {
    components: {
      LettingOut,
      Levelbar
    },
    data () {
      return {
        warn: false
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name'
      ])
    },
    methods: {
      toggleSideBar () {
        // 派发事件至 store 下的 app.js
        this.$store.dispatch('ToggleSideBar')
      },
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          // 页面刷新，重新初始化vue-router对象，避免bug
          location.reload()
        })
      },
      phone () {
        this.$alert('13770617608', '客服热线', {
          confirmButtonText: '确定'
        })
      },
      change () {
        this.warn = !this.warn
      },
      modifyPass () {
        this.$store.dispatch('modifyPass')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar-wrapper {
    .avatar-container {
      list-style: none;
      color: #666666;
      float: right;
      display: flex;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        vertical-align: middle;
        margin-right: 5px;
      }
      li {
        padding: 0 10px;
        cursor: pointer;
        .icon-four {
          color: #FF3030;
        }
      }
      @media screen and (max-width: 1000px) {
        .avatar-li,
        .dropdown-icon,
        .dropdown,
        .logout-span {
          display: none;
        }
      }
      li:hover {
        background-color: #A8A8A8;
      }
    }
  }
  .navbar {
    position: fixed;
    z-index: 1000;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    box-shadow: 0 1px 4px #ccc;
    background-color: #fff;
    top: 0;
    right: 0;
    left: 200px;
    .lettingout-container {
      padding: 0 10px;
    }
    .safety {
      font-size: 18px;
      margin: 0 20px;
    }
    @media screen and (max-width: 700px) {
      .avatar-col {
        display: none;
      }
    }
  }
</style>