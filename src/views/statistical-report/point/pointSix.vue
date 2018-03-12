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
          <span class="unit">单位：kWh</span>
          <el-table :data="tableData.tableData" border show-summary style="width: 100" max-height="500">
            <el-table-column label="日期" prop="date" align="center" width="150"></el-table-column>
            <el-table-column label="总" prop="sum" align="center" fit></el-table-column>
            <el-table-column label="峰" align="center" fit>
              <el-table-column label="电量" prop="max" align="center"></el-table-column>
              <el-table-column label="占比" width="120" align="center">
                <template scope="props">
                  <!-- 参数row即对应行的数据 -->
                  {{props.row.per1 + "%"}}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="平" align="center" fit>
              <el-table-column label="电量" prop="avg" align="center"></el-table-column>
              <el-table-column label="占比" width="120" align="center">
                <template scope="props">
                  {{props.row.per2 + "%"}}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="谷" align="center" fit>
              <el-table-column label="电量" prop="min" align="center"></el-table-column>
              <el-table-column label="占比" width="120" align="center">
                <template scope="props">
                  {{props.row.per3 + "%"}}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="尖" align="center" fit>
              <el-table-column label="电量" prop="top" align="center"></el-table-column>
              <el-table-column label="占比" width="120" align="center">
                <template scope="props">
                  {{props.row.per4 + "%"}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPointSix } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'

  export default {
    data () {
      return {
        loading: true,
        tableData: [],
        searchForm: {
          date: '',
          monitorPoint: ''
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
        getPointSix(this.searchForm).then(res => {
          console.log(this.searchForm)
          console.log(res.data)
          this.tableData = res.data
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
  .unit {
    font-size: 12px;
    font-weight: bold;
    padding: 4px;
    border: 1px solid #eee;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    background-color: #eee;
  }
</style>