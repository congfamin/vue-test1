<template>
  <div class="AnalysisTwo">
    <div v-show="!detailShow">
      <el-row class="elRow-one">
        <el-col :span="24">
          <el-card class="box-card">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  placeholder="选择日期范围"
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
      <el-row :gutter="20" class="box">
        <el-col :span="24">
          <el-card class="elCard-container">
            <span class="unit">单位：kW</span>
            <el-table :data="tableData.tableData" height="424" border :default-sort="{prop: 'id', order: 'decrease'}"
                      style="width: 100%" @cell-click="showDetail">
              <el-table-column prop="id" label="序号" width="100" sortable align="center"></el-table-column>
              <el-table-column prop="name" label="单元名称" width="100" fit align="center">
                <template scope="scope">
                  <span class="detailSpan">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="数据类型" fit align="center">
              </el-table-column>
              <el-table-column prop="date" label="日期" width="120" fit align="center">
              </el-table-column>
              <el-table-column prop="start" label="开始时间" fit align="center">
              </el-table-column>
              <el-table-column prop="end" label="结束时间" fit align="center">
              </el-table-column>
              <el-table-column prop="count" label="越限次数" fit align="center">
              </el-table-column>
              <el-table-column prop="standard" label="标准值" fit align="center">
              </el-table-column>
              <el-table-column prop="minPer" label="下限百分比" fit align="center">
              </el-table-column>
              <el-table-column prop="maxPer" label="上限百分比" fit align="center">
              </el-table-column>
              <el-table-column prop="max" label="越限最大值" width="100" align="center">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="detailPage" v-show="detailShow">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card>
              <el-button icon="arrow-left" type="warning" @click="back">返回列表</el-button>
              <span class="detailTitle"> 单元越限设置</span>
            </el-card>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col>
              <el-card>
                <el-table :data="tableDetail" border height="600" v-loading="loading" element-loading-text="数据获取中">
                  <el-table-column label="序号" prop="id" align="center"></el-table-column>
                  <el-table-column label="采集时间" prop="time" align="center"></el-table-column>
                  <el-table-column label="数据类型" prop="type" align="center"></el-table-column>
                  <el-table-column label="实时值" prop="realTime" align="center"></el-table-column>
                  <el-table-column label="标准值" prop="standard" align="center"></el-table-column>
                  <el-table-column label="下限百分比" prop="LowerLimit" align="center"></el-table-column>
                  <el-table-column label="上限百分比" prop="UpperLimit" align="center"></el-table-column>
                  <el-table-column label="越限值" prop="LimitValue" align="center"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { getAnalysisFour } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'

  export default {
    data () {
      return {
        loading: true,
        detailShow: false,
        searchForm: {
          date: '',
          value: '电量'
        },
        date: '',
        tableData: [],
        tableDetail: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        ],
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
        let arr = val.split(' - ')
        this.searchForm.date = arr
      },
      search () {
        this.loading = true
        console.log(this.searchForm)
        getAnalysisFour(this.searchForm).then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
      },
      showDetail (val) {
        console.log(val.name)
        this.detailShow = !this.detailShow
        // this.$store.dispatch('showDetail', val.name);
        // this.$router.push({path:'/ShuntElectricity/ShuntElectricityOne', query: {name: val.name}});
      },
      back () {
        this.detailShow = !this.detailShow
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tree-card {
    margin-bottom: 20px;
  }
  .el-row {
    margin-bottom: 20px;
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
  .elCard-container {
    .title {
      width: 100%;
      padding: 5px;
      font-size: 16px;
      color: #fff;
      background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
    }
    .chart {
      width: 100%;
      height: 300px;
    }
  }
  .detailTitle {
    font-weight: bold;
  }
  .detailSpan {
    cursor: pointer;
    color: #3A5FCD;
  }
</style>