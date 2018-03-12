<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card cardOne">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="查看用电结构：">
              <el-switch
                v-model="checked"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
            <el-form-item label="请选择日期：">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                @change="dateFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="统计时间">
              <select v-model="searchForm.hour">
                <option v-for="(v,k) in options" :value="v.value" :key="k">
                  {{ v.value }}
                </option>
              </select>
            </el-form-item>
            <el-form-item label="时">
              <select v-model="searchForm.minute">
                <option v-for="(v,k) in options1" :value="v.value" :key="k">
                  {{ v.value }}
                </option>
              </select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="document">导出报表</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <transition name="fade">
        <el-col :sm="24" :md="8" :lg="6" v-if="checked">
          <el-card class="box-card tree-card">
            <tree :treeData="treeData" @nodeEvent="treeNode"></tree>
          </el-card>
        </el-col>
      </transition>
      <el-card class="box-card">
        <span class="unit">单位：kWh</span>
        <el-table :data="tableData.tableData" v-loading="loading" element-loading-text="数据获取中" border
                  style="width: 100%">
          <el-table-column prop="name" label="监测点" width="180" align="center"></el-table-column>
          <el-table-column prop="power" :label="v.date" v-for="(v,k) in tableData.tableData" :key="k" fit
                           align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { getReportTen } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'
  import tree from 'base/tree'

  export default {
    components: {
      tree
    },
    data () {
      return {
        loading: true,
        checked: false,
        tableData: [],
        searchForm: {
          date: '',
          hour: 5,
          minute: 45,
          treeNode: ''
        },
        date: '',
        options: [{
          value: 0
        }, {
          value: 1
        }, {
          value: 2
        }, {
          value: 3
        }, {
          value: 4
        }, {
          value: 5
        }, {
          value: 6
        }, {
          value: 7
        }, {
          value: 8
        }, {
          value: 9
        }, {
          value: 10
        }, {
          value: 11
        }, {
          value: 12
        }, {
          value: 13
        }, {
          value: 14
        }, {
          value: 15
        }, {
          value: 16
        }, {
          value: 17
        }, {
          value: 18
        }, {
          value: 19
        }, {
          value: 20
        }, {
          value: 21
        }, {
          value: 22
        }, {
          value: 23
        }, {
          value: 24
        }],
        options1: [{
          value: 0
        }, {
          value: 15
        }, {
          value: 30
        }, {
          value: 45
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
        }],
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    created () {
      this.date = defaultDate()
      this.searchForm.date = defaultDate()
      this.search()
    },
    methods: {
      dateFilter (val) {
        console.log(val)
        let arr = val.split(' - ')
        this.searchForm.date = arr
      },
      search () {
        this.loading = true
        getReportTen(this.searchForm).then(res => {
          console.log(this.searchForm)
          console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
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
  .unit {
    font-size: 12px;
    font-weight: bold;
    padding: 4px;
    border: 1px solid #eee;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    background-color: #eee;
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