<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card cardOne">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
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
            <el-form-item>
              <el-button type="success" icon="document">导出报表</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <span class="unit">单位：kWh</span>
          <div style="overflow: auto;height:700px">
            <table style="min-width:100%; font-size:14px">
              <thead>
              <tr>
                <th colspan="2" rowspan="2" style="min-width:200px">监测点</th>
                <th colspan="5">总电量</th>
                <th colspan="5" v-for="(item, key) in processData[0]">{{ item.date }}</th>
              </tr>
              <tr>
                <th>总</th>
                <th>尖</th>
                <th>峰</th>
                <th>平</th>
                <th>谷</th>
                <template v-for="(item, key) in processData[0]">
                  <th>总</th>
                  <th>尖</th>
                  <th>峰</th>
                  <th>平</th>
                  <th>谷</th>
                </template>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, key) in tableData" :key="key">
                <td colspan="2">{{ item.name }}</td>
                <td>{{ item.sum }}</td>
                <td>{{ item.top }}</td>
                <td>{{ item.max }}</td>
                <td>{{ item.avg }}</td>
                <td>{{ item.min }}</td>
                <template v-for="(item1, key) in item.data">
                  <td>{{ item1.sum }}</td>
                  <td>{{ item1.top }}</td>
                  <td>{{ item1.max }}</td>
                  <td>{{ item1.avg }}</td>
                  <td>{{ item1.min }}</td>
                </template>
              </tr>
              </tbody>
            </table>
          </div>
          <el-table :data="tableData" v-loading="loading" element-loading-text="数据获取中" border max-height="700"
                    style="width: 100%">
            <el-table-column prop="name" label="监测点" width="120" align="center" fixed></el-table-column>
            <el-table-column label="总电量" align="center">
              <el-table-column prop="sum" label="总" width="100" align="center"></el-table-column>
              <el-table-column prop="top" label="尖" width="100" align="center"></el-table-column>
              <el-table-column prop="max" label="峰" width="100" align="center"></el-table-column>
              <el-table-column prop="avg" label="平" width="100" align="center"></el-table-column>
              <el-table-column prop="min" label="谷" width="100" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="item.date" v-for="(item, key) in tableData" :key="key" align="center">
              <el-table-column label="总" width="100" align="center"></el-table-column>
              <el-table-column prop="top" label="尖" width="100" align="center"></el-table-column>
              <el-table-column prop="max" label="峰" width="100" align="center"></el-table-column>
              <el-table-column prop="avg" label="平" width="100" align="center"></el-table-column>
              <el-table-column prop="min" label="谷" width="100" align="center"></el-table-column>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="100">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getReportEight } from 'api/table'
  import { dateFormat, defaultDate } from 'utils'

  export default {
    data () {
      return {
        loading: true,
        tableData: [],
        processData: [],
        searchForm: {
          date: ''
        },
        date: '',
        currentPage: 5,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    computed: {
      // newDate(){
      //   let newDate=[];
      //   let date=new Date();
      //   let month=date.getMonth()+1;
      //   month=month>10?0+month:month;
      //   let day=date.getDate();
      //   day=day>10?0+day:day;
      //   let dbYesterday=date.getDate()-2;
      //   dbYesterday=dbYesterday>10?0+dbYesterday:dbYesterday;
      //   let yesterday=date.getDate()-1;
      //   yesterday=yesterday>10?0+yesterday:yesterday;
      //   let dayStr=month+"-"+day;
      //   let yesterdayStr=month+"-"+yesterday;
      //   let dbYesterdayStr=month+"-"+dbYesterday;
      //   newDate.push(dbYesterdayStr,yesterdayStr,dayStr);
      //   return newDate;
      // }
    },
    created () {
      this.date = defaultDate()
      this.searchForm.date = defaultDate()
      this.search()
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      dateFilter (val) {
        console.log(val)
        let arr = val.split(' - ')
        this.searchForm.date = arr
      },
      search () {
        this.loading = true
        getReportEight(this.searchForm).then(res => {
          console.log(this.searchForm)
          console.log(res.data.tableData)
          // console.log("-----")
          this.tableData = res.data.tableData
          var data = res.data.tableData
          for (let i = 0; i < data.length; i++) {
            this.processData.push(data[i].data)
          }
          this.tableData = data
          console.log(this.tableData)
          console.log('----')
          console.log(this.processData)
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
      },
      handleDownload () {
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('../../../vendor/Export2Excel')
          const tHeader = ['监测点', '时段', '08-10', '08-11', '08-12', '08-13', '08-14', '08-15', '08-16']
          const filterVal = ['name', 'date', 'power', 'power1', 'power2', 'power3', 'power4', 'power5', 'power6']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
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
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
  table {
    width: 100%;
    text-align: center;
  }
  tr, th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  th {
    background-color: rgb(238, 241, 246);
    min-width: 50px
  }
  .tr:hover {
    background-color: rgb(238, 241, 246);
  }
</style>