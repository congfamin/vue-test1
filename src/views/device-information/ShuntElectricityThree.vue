<template>
  <div>
    <div v-if="!detailShow">
      <el-row>
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
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="searchForm.month"
                  type="month"
                  placeholder="选择月份"
                  :editable="false"
                  :clearable="false"
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
            <el-tab-pane label="功率因素" name="功率因素">
              <seTablePower></seTablePower>
            </el-tab-pane>
            <el-tab-pane label="需量" name="需量">
              <seTableDemand :tableData="tableData"></seTableDemand>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </div>
    <details-page v-if="detailShow&&routerName=='月用电数据'" :fatherName="activeName"
                  :routerName="routerName"></details-page>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPointTwo } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'
  import tree from 'base/tree/index'
  import seTableLoad from '../table/ShuntElectricity/seTableLoad'
  import seTableQuantity from '../table/ShuntElectricity/seTableQuantity'
  import seTablePower from '../table/ShuntElectricity/seTablePower'
  import seTableDemand from '../table/ShuntElectricity/seTableDemand'
  import DetailsPage from './DetailsPage/index'

  export default {
    components: {
      tree,
      seTableLoad,
      seTableQuantity,
      seTablePower,
      seTableDemand,
      DetailsPage
    },
    data () {
      return {
        activeName: '负荷',
        routerName: '',
        checked: false,
        searchForm: {
          month: '',
        },
        tableData: [{
          id: '1',
          name: '监测点1',
          date: '2017-08',
          max: '182',
          happend: '2017-08-22 17:00'
        }, {
          id: '2',
          name: '监测点2',
          date: '2017-08',
          max: '111',
          happend: '2017-08-22 17:00'
        }, {
          id: '3',
          name: '监测点3',
          date: '2017-08',
          max: '69',
          happend: '2017-08-22 17:00'
        }, {
          id: '4',
          name: '监测点4',
          date: '2017-08',
          max: '62',
          happend: '2017-08-22 17:00'
        }, {
          id: '5',
          name: '监测点5',
          date: '2017-08',
          max: '45',
          happend: '2017-08-22 17:00'
        }, {
          id: '6',
          name: '监测点6',
          date: '2017-08',
          max: '40',
          happend: '2017-08-22 17:00'
        }, {
          id: '7',
          name: '监测点7',
          date: '2017-08',
          max: '37',
          happend: '2017-08-22 17:00'
        }, {
          id: '8',
          name: '监测点8',
          date: '2017-08',
          max: '29',
          happend: '2017-08-22 17:00'
        }, {
          id: '9',
          name: '监测点9',
          date: '2017-08',
          max: '29',
          happend: '2017-08-22 17:00'
        }],
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
      let lastMonth = new Date().getTime() - 3600 * 1000 * 24 * 30
      this.searchForm.month = dateFormat(new Date(lastMonth), 'yyyy-MM-dd')
      this.routerName = this.$route.name
      // this.search();
    },
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
        this.searchForm.month = val
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
