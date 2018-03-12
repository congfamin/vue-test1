<template>
  <div class="box">
    <div v-if="!detailShow">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="cardOne">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="查看用电结构：">
                <el-switch
                  v-model="checked"
                  on-text=""
                  off-text="">
                </el-switch>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <transition name="fade">
          <el-col :sm="8" :md="8" :lg="6" v-if="checked">
            <el-card class="box-card tree-card">
              <tree :treeData="treeData" @nodeEvent="treeNode"></tree>
            </el-card>
          </el-col>
        </transition>
        <el-card class="box-card card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="负荷" name="负荷">
              <seTableLoad></seTableLoad>
            </el-tab-pane>
            <el-tab-pane label="示数" name="示数">
              <seTableDisplay></seTableDisplay>
            </el-tab-pane>
            <el-tab-pane label="电压" name="电压">
              <seTableVoltage></seTableVoltage>
            </el-tab-pane>
            <el-tab-pane label="电流" name="电流">
              <seTableCurrent></seTableCurrent>
            </el-tab-pane>
            <el-tab-pane label="功率因素" name="功率因素">
              <seTablePower></seTablePower>
            </el-tab-pane>
            <el-tab-pane label="温度" name="温度">
              <seTableTemp></seTableTemp>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </div>
    <details-page v-if="detailShow&&routerName=='实时用电数据'" :fatherName="activeName"
                  :routerName="routerName"></details-page>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import tree from 'base/tree'
  import seTableLoad from '../table/ShuntElectricity/seTableLoad-R'
  import seTableDisplay from '../table/ShuntElectricity/seTableDisplay-R'
  import seTableVoltage from '../table/ShuntElectricity/seTableVoltage-R'
  import seTableCurrent from '../table/ShuntElectricity/seTableCurrent-R'
  import seTablePower from '../table/ShuntElectricity/seTablePower-R'
  import seTableTemp from '../table/ShuntElectricity/seTableTemp-R'
  import DetailsPage from './DetailsPage/index'

  export default {
    components: {
      tree,
      seTableLoad,
      seTableDisplay,
      seTableVoltage,
      seTableCurrent,
      seTablePower,
      seTableTemp,
      DetailsPage
    },
    data () {
      return {
        activeName: '负荷',
        checked: false,
        routerName: '',
        radio: '',
        value: '',
        treeData: [{
          id: 1,
          label: '用电监测',
          children: [{
            id: 2,
            label: 'Ⅰ线',
            children: [{
              id: 5,
              label: '变压器 1',
              children: [{
                id: 8,
                label: '馈线柜 1'
              }, {
                id: 9,
                label: '馈线柜 2'
              }, {
                id: 10,
                label: '馈线柜 3'
              }, {
                id: 11,
                label: '馈线柜 4'
              }]
            }]
          }, {
            id: 3,
            label: 'Ⅱ线',
            children: [{
              id: 6,
              label: '变压器 2',
              children: [{
                id: 12,
                label: '馈线柜 5'
              }, {
                id: 13,
                label: '馈线柜 6'
              }, {
                id: 14,
                label: '馈线柜 7'
              }, {
                id: 15,
                label: '馈线柜 8'
              }]
            }]
          }, {
            id: 4,
            label: 'Ⅲ线',
            children: [{
              id: 7,
              label: '变压器 3'
            }]
          }]
        }]
      }
    },
    computed: {
      ...mapGetters(['detailShow'])
    },
    created () {
      this.routerName = this.$route.name
    },
    // 生命周期在路由跳转前执行的动作
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('closeDetail')
      next()
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab,event);
        console.log(this.activeName)
      },
      search () {
        console.log(1)
      },
      treeNode (node) {
        console.log(node)
        this.searchForm.treeNode = node
        this.search()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .tree-card {
    margin-bottom: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
