<template>
  <div>
    <div v-if="!detailShow">
      <el-row>
        <el-col :span="24">
          <el-card class="cardOne">
            <el-form :inline="true" class="demp-form-inline">
              <el-form-item label="查看用电结构：">
                <el-switch
                  v-model="checked"
                  on-text=""
                  off-text="">
                </el-switch>
              </el-form-item>
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="searchForm.date"
                  type="date"
                  placeholder="选择日期"
                  :editable="false"
                  :clearable="false"
                  :picker-options="pickerOptions"
                  @change="dateFilter">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="search" @click="search">查询</el-button>
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
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="负荷" name="负荷">
              <seTableLoad></seTableLoad>
            </el-tab-pane>
            <el-tab-pane label="电量" name="电量">
              <seTableQuantity></seTableQuantity>
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
            <el-tab-pane label="谐波" name="谐波">
              <seTableHarmonic></seTableHarmonic>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </div>
    <details-page v-if="detailShow&&routerName=='日用电数据'" :fatherName="activeName"
                  :routerName="routerName"></details-page>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPointTwo } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'
  import tree from 'base/tree'
  import seTableLoad from '../table/ShuntElectricity/seTableLoad'
  import seTableDisplay from '../table/ShuntElectricity/seTableDisplay'
  import seTableVoltage from '../table/ShuntElectricity/seTableVoltage'
  import seTableQuantity from '../table/ShuntElectricity/seTableQuantity'
  import seTableCurrent from '../table/ShuntElectricity/seTableCurrent'
  import seTablePower from '../table/ShuntElectricity/seTablePower'
  import seTableHarmonic from '../table/ShuntElectricity/seTableHarmonic'
  import DetailsPage from './DetailsPage/index'

  export default {
    components: {
      tree,
      seTableLoad,
      seTableDisplay,
      seTableVoltage,
      seTableCurrent,
      seTableQuantity,
      seTablePower,
      seTableHarmonic,
      DetailsPage
    },
    data () {
      return {
        checked: false,
        activeName: '负荷',
        routerName: '',
        searchForm: {
          date: ''
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
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
      let yesterDay = new Date().getTime() - 3600 * 1000 * 24
      this.searchForm.date = dateFormat(new Date(yesterDay), 'yyyy-MM-dd')
      this.routerName = this.$route.name
      this.search()
    },
    // 生命周期在路由跳转前执行的动作
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('closeDetail')
      next()
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      dateFilter (val) {
        console.log(val)
        this.searchForm.date = val
      },
      search () {

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
