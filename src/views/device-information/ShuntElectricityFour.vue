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
                  v-model="searchForm.year"
                  type="year"
                  format="yyyy"
                  placeholder="选择年份"
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
              <seTableLoad :tableData="tableData"></seTableLoad>
            </el-tab-pane>
            <el-tab-pane label="电量" name="电量">
              <seTableQuantity :tableData="tableData1"></seTableQuantity>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </div>
    <details-page v-if="detailShow&&routerName=='年用电数据'" :fatherName="activeName"
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
  import DetailsPage from './DetailsPage/index'

  export default {
    components: {
      tree,
      seTableLoad,
      seTableQuantity,
      DetailsPage
    },
    data () {
      return {
        checked: false,
        activeName: '负荷',
        routerName: '',
        searchForm: {
          year: ''
        },
        pickerOptions: {
          disabledDate (time) {
            let date = new Date()
            let year = date.getFullYear()
            return time.getFullYear() > year
          }
        },
        tableData: [{
          id: 1,
          name: '监测点1',
          year: '2017',
          sum: 503.7,
          min: 1.5,
          avg: 62.79,
          cl: 99.7,
          fuhe: 12.46
        }, {
          id: 2,
          name: '监测点2',
          year: '2017',
          sum: 162.6,
          min: 0,
          avg: 40.06,
          cl: 100,
          fuhe: 24.64
        }, {
          id: 3,
          name: '监测点3',
          year: '2017',
          sum: 155.92,
          min: -5415.21,
          avg: 17.99,
          cl: 3572.89,
          fuhe: 11.54
        }, {
          id: 4,
          name: '监测点4',
          year: '2017',
          sum: 69.56,
          min: -5415.21,
          avg: 10.03,
          cl: 7884.95,
          fuhe: 14.42
        }, {
          id: 5,
          name: '监测点5',
          year: '2017',
          sum: 142.45,
          min: -5415.21,
          avg: 16,
          cl: 3901.32,
          fuhe: 11.23
        }, {
          id: 6,
          name: '监测点6',
          year: '2017',
          sum: 93.18,
          min: 0.03,
          avg: 17.09,
          cl: 99.96,
          fuhe: 18.34
        }, {
          id: 7,
          name: '监测点7',
          year: '2017',
          sum: 75.8,
          min: -5415.21,
          avg: 1.69,
          cl: 7244.08,
          fuhe: 2.23
        }, {
          id: 8,
          name: '监测点8',
          year: '2017',
          sum: 74.67,
          min: -5415.21,
          avg: 1.63,
          cl: 7352,
          fuhe: 2.19
        }, {
          id: 9,
          name: '监测点9',
          year: '2017',
          sum: 69.56,
          min: -5415.21,
          avg: 10.03,
          cl: 7884.95,
          fuhe: 14.42
        }, {
          id: 10,
          name: '监测点10',
          year: '2017',
          sum: 6.23,
          min: 0.5,
          avg: 2.54,
          cl: '91.91%',
          fuhe: '40.8%'
        }],
        tableData1: [{
          id: 1,
          name: '监测点1',
          date: '2017-08',
          sum: 1860,
          max: 750,
          avg: 855,
          min: 240,
          top: 0,
          Rpower: 900
        }, {
          id: 2,
          name: '监测点2',
          date: '2017-08',
          sum: 1200,
          max: 585,
          avg: 450,
          min: 165,
          top: 0,
          Rpower: 405
        }, {
          id: 3,
          name: '监测点3',
          date: '2017-08',
          sum: 616,
          max: 252,
          avg: 313,
          min: 51,
          top: 0,
          Rpower: 363
        }, {
          id: 4,
          name: '监测点4',
          date: '2017-08',
          sum: 552,
          max: 226,
          avg: 282,
          min: 44,
          top: 0,
          Rpower: 334
        }, {
          id: 5,
          name: '监测点5',
          date: '2017-08',
          sum: 268,
          max: 122,
          avg: 88,
          min: 58,
          top: 0,
          Rpower: 53
        }, {
          id: 6,
          name: '监测点6',
          date: '2017-08',
          sum: 263,
          max: 145,
          avg: 101,
          min: 17,
          top: 0,
          Rpower: 272
        }, {
          id: 7,
          name: '监测点7',
          date: '2017-08',
          sum: 259,
          max: 143,
          avg: 100,
          min: 16,
          top: 0,
          Rpower: 252
        }, {
          id: 8,
          name: '监测点8',
          date: '2017-08',
          sum: 219,
          max: 95,
          avg: 81,
          min: 43,
          top: 0,
          Rpower: 41
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
      let nowYear = new Date().getTime()
      this.searchForm.year = dateFormat(new Date(nowYear), 'yyyy')
      this.routerName = this.$route.name
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
        this.searchForm.year = val
      },
      search () {
        console.log('点击查询')
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
