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
                v-model="searchForm.date"
                type="date"
                align="right"
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
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="24">
        <el-card class="box-card" v-loading="loading" element-loading-text="数据获取中">
          <el-table :data="tableData.tableData" border style="width: 100%" max-height="500">
            <el-table-column label="时间点" prop="hour" fit align="center" width="150"></el-table-column>
            <el-table-column label="电压数据(V)" fit align="center" width="110">
              <el-table-column label="Uu/Uuv" prop="u1" fit align="center"></el-table-column>
              <el-table-column label="Uv" prop="u2" fit align="center"></el-table-column>
              <el-table-column label="Uw/Uwv" prop="u3" fit align="center"></el-table-column>
              <el-table-column label="越限标准" prop="over" width="150" align="center">
                <template scope="scope">
                  [{{scope.row.over}}]
                </template>
              </el-table-column>
              <el-table-column label="越限示警" fit align="center">
                <template scope="scope">
                  <i class="iconfont icon-baojing" style="color:red" v-if="scope.row.u1 > 10"></i>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="电流数据(A)" align="center">
              <el-table-column prop="Iu" label="Iu" fit align="center"></el-table-column>
              <el-table-column prop="Iv" label="Iv" fit align="center"></el-table-column>
              <el-table-column prop="Iw" label="Iw" fit align="center"></el-table-column>
              <el-table-column prop="avg2" label="平均电流" fit align="center"></el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPointSeven } from 'api/table'
  import { dateFormat } from 'utils'

  export default {
    data () {
      return {
        loading: true,
        tableData: [],
        searchForm: {
          date: '',
          monitorPoint: '0',
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
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
      let yesterDay = new Date().getTime() - 3600 * 1000 * 24
      this.searchForm.date = dateFormat(new Date(yesterDay), 'yyyy-MM-dd')
      this.search()
    },
    methods: {
      dateFilter (val) {
        this.searchForm.date = val
      },
      search () {
        this.loading = true
        getPointSeven(this.searchForm).then(res => {
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
</style>