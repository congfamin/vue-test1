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
                align="right"
                type="daterange"
                placeholder="选择日期范围"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                @change="dateFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="负荷阈值：">
              <el-input
                style="width:140px;"
                placeholder="负荷阈值"
                :editable="false"
                :clearable="false"
                icon="edit"
                v-model="warnVal">
              </el-input>
              <span>kW</span>
            </el-form-item>
            <el-form-item>
              <el-button v-waves type="primary" icon="search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="24">
        <el-card class="box-card" v-loading="loading" element-loading-text="数据获取中">
          <el-table :data="tableData.tableData" border style="width: 100%">
            <el-table-column prop="max" label="月最大负荷(kW)" fit align="center"></el-table-column>
            <el-table-column prop="maxdate" label="月最大负荷出现时间" fit align="center"></el-table-column>
            <el-table-column prop="min" label="月最小负荷(kW)" fit align="center"></el-table-column>
            <el-table-column prop="mindate" label="月最大负荷出现时间" fit align="center"></el-table-column>
            <el-table-column label="过负荷点个数" fit align="center">
              <template scope="props">
                <span>{{ count }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData.tableData1" border style="width: 100%" max-height="500">
            <el-table-column prop="date" label="日期" width="120" align="center"></el-table-column>
            <el-table-column label="监测点用电负荷数据(kW)" align="center">
              <el-table-column prop="sum" label="有功总" fit align="center"></el-table-column>
              <el-table-column prop="Pu" label="Pu" fit align="center">
                <template scope="scope">
                  {{ scope.row.Pu == '' ? '-' : scope.row.Pu }}
                </template>
              </el-table-column>
              <el-table-column prop="Pv" label="Pv" fit align="center">
                <template scope="scope">
                  {{ scope.row.Pv == '' ? '-' : scope.row.Pv }}
                </template>
              </el-table-column>
              <el-table-column prop="Pw" label="Pw" fit align="center">
                <template scope="scope">
                  {{ scope.row.Pw == '' ? '-' : scope.row.Pw }}
                </template>
              </el-table-column>
              <el-table-column prop="avg1" label="平均值" fit align="center">
                <template scope="scope">
                  {{ scope.row.avg1 == '' ? '-' : scope.row.avg1 }}
                </template>
              </el-table-column>
              <el-table-column label="过负荷报警" fit align="center">
                <template scope="props">
                  <el-tag type="danger" v-show="warnValue && props.row.sum > warnValue">报警</el-tag>
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
  import { getPointThree } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'
  // 水波纹组件
  import waves from 'components/waves/index'

  export default {
    directives: {
      waves
    },
    data () {
      return {
        loading: true,
        warnVal: '',
        tableData: [],
        searchForm: {
          date: '',
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
        'monitoringPoint',
        'warnValue'
      ]),
      count () {
        let tableData = this.tableData.tableData1
        let count = 0
        for (var i = 0; i < tableData.length; i++) {
          if (this.warnValue && tableData[i].sum > this.warnValue) {
            count++
          }
        }
        return count
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
        getPointThree(this.searchForm).then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
        // 派送设置的负荷阈值
        this.$store.dispatch('showWarn', this.warnVal)
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