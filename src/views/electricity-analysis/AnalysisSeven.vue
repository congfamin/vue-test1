<template>
  <div class="AnalysisOne">
    <el-row class="elRow-one">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="起止月：">
              <el-date-picker
                v-model="searchForm.startMonth"
                type="month"
                placeholder="选择月"
                :editable="false"
                :clearable="false"
                @change="startMonthFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="至"></el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="searchForm.endMonth"
                type="month"
                placeholder="选择月"
                :editable="false"
                :clearable="false"
                @change="endMonthFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="elRow-two">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card class="elCard-container">
          <div class="table">
            <h4 class="table-title">电费单分析</h4>
            <el-table :data="tableData" v-loading="loading" element-loading-text="数据获取中" style="width:100%" border>
              <el-table-column prop="month" label="月份" width="120" align="center"></el-table-column>
              <el-table-column label="电量(kWh)" align="center">
                <el-table-column label="峰" width="100" align="center"></el-table-column>
                <el-table-column label="谷" width="100" align="center"></el-table-column>
                <el-table-column label="平" width="100" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="sum" label="总电量(kWh)" width="120" align="center"></el-table-column>
              <el-table-column label="电费(元)" align="center">
                <el-table-column label="峰" width="100" align="center"></el-table-column>
                <el-table-column label="谷" width="100" align="center"></el-table-column>
                <el-table-column label="平" width="100" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="baseM" label="基本电费(元)" fit align="center"></el-table-column>
              <el-table-column prop="pM" label="力调电费(元)" fit align="center"></el-table-column>
              <el-table-column prop="sumM" label="总电费(元)" fit align="center"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { dateFormat, defaultDate } from 'utils'
  import tree from 'base/tree'
  import Echarts from 'base/Echarts/Echarts'

  export default {
    components: {
      tree,
      Echarts
    },
    data () {
      return {
        loading: '',
        endMonth: '',
        startMonth: '',
        searchForm: {
          startMonth: '',
          endMonth: ''
        },
        tableData: [{
          month: '2017-01'
        }, {
          month: '2017-02'
        }, {
          month: '2017-03'
        }, {
          month: '2017-04'
        }, {
          month: '2017-05'
        }, {
          month: '2017-06'
        }, {
          month: '2017-07',
          sum: '100671',
          sumM: '84510.14',
          baseM: '0',
          eM: '0',
          pM: '317.54'
        }, {
          month: '2017-08',
          sum: '45318',
          sumM: '38478.88',
          baseM: '0',
          eM: '0',
          pM: '411.72'
        }, {
          month: '2017-09',
          sum: '45318',
          sumM: '38478.88',
          baseM: '0',
          eM: '0',
          pM: '411.72'
        }, {
          month: '2017-10',
          sum: '45318',
          sumM: '38478.88',
          baseM: '0',
          eM: '0',
          pM: '411.72'
        }, {
          month: '2017-11',
          sum: '45318',
          sumM: '38478.88',
          baseM: '0',
          eM: '0',
          pM: '411.72'
        }, {
          month: '2017-12',
          sum: '45318',
          sumM: '38478.88',
          baseM: '0',
          eM: '0',
          pM: '411.72'
        }]
      }
    },
    created () {
      let nowMonth = new Date().getMonth()
      let firstMonth = new Date().getTime() - 3600 * 1000 * 24 * nowMonth * 3 * 10
      this.searchForm.startMonth = dateFormat(new Date(firstMonth), 'yyyy-MM')
      this.searchForm.endMonth = dateFormat(new Date(), 'yyyy-MM')
    },
    methods: {
      startMonthFilter (val) {
        this.searchForm.startMonth = val
      },
      endMonthFilter (val) {
        this.searchForm.endMonth = val
      },
      search () {
        console.log(this.searchForm)
        this.loading = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .elRow-one {
    margin-bottom: 20px;
  }
  .table {
    padding-top: 10px;
    border-top: 2px solid #87CEFA;
    .table-title {
      text-align: center;
      margin-bottom: 10px;
    }
  }
</style>