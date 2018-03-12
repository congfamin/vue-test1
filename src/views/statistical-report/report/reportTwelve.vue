<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="cardOne">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="searchForm.month"
                type="month"
                placeholder="选择月"
                :editable="false"
                :clearable="false"
                @change="dateFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="document">导出</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <analysis-briefing :tableData="tableData" v-loading="loading"
                             element-loading-text="数据获取中"></analysis-briefing>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { dateFormat, defaultDate } from 'utils'
  import AnalysisBriefing from 'views/table/StatisticalReport/AnalysisBriefing'

  export default {
    components: {
      AnalysisBriefing
    },
    data () {
      return {
        loading: false,
        searchForm: {
          month: ''
        },
        tableData: []
      }
    },
    created () {
      // this.search();
      let lastMonth = new Date().getTime() - 3600 * 1000 * 24 * 30
      this.searchForm.month = dateFormat(new Date(lastMonth), 'yyyy-MM')
    },
    methods: {
      dateFilter (val) {
        console.log(val)
        this.searchForm.month = val
      },
      // 此处接口暂时没有数据获取
      search () {
        this.loading = true
        getReportTwelve(this.searchForm).then(res => {
          this.searchForm = res.data
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
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
</style>