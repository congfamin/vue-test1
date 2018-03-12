<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card cardOne">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="监测点：">
              <el-select v-model="searchForm.monitorPoint" filterable placeholder="请选择">
                <el-option
                  v-for="item in monitoringPoint"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择日期：">
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
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
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="24">
        <el-card class="box-card" v-loading="loading" element-loading-text="数据获取中">
          <el-table v-loading="loading" element-loading-text="数据获取中" :data="tableData.tableData" border width="100%">
            <el-table-column prop="max" label="月电量最大值" fit align="center"></el-table-column>
            <el-table-column prop="maxTime" label="出现时间" fit align="center"></el-table-column>
            <el-table-column prop="min" label="月电量最小值" fit align="center"></el-table-column>
            <el-table-column prop="minTime" label="出现时间" fit align="center"></el-table-column>
            <el-table-column prop="sum" label="月电量累计" fit align="center"></el-table-column>
          </el-table>
          <el-table :data="tableData.tableData1" border width="100%">
            <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
            <el-table-column prop="now" label="本次示数" fit align="center"></el-table-column>
            <el-table-column prop="last" label="上次示数" fit align="center"></el-table-column>
            <el-table-column prop="minus" label="示值差" fit align="center"></el-table-column>
            <el-table-column prop="double" label="倍率" fit align="center"></el-table-column>
            <el-table-column prop="quantity" label="电量(kWh)" fit align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPointFive } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'

  export default {
    data () {
      return {
        loading: true,
        tableData: [],
        searchForm: {
          date: [],
          monitorPoint: '0',
        },
        date: '',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    computed: {
      ...mapGetters([
        'monitoringPoint'
      ])
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
        getPointFive(this.searchForm).then(res => {
          console.log(this.searchForm)
          console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }).catch(error => {
          console.log(数据未获取)
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