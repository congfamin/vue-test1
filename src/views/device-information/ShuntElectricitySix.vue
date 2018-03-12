<template>
  <div>
    <div v-show="!detailShow">
      <el-row>
        <el-col :span="24">
          <el-card class="cardOne">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="选择查询内容">
                <el-select v-model="searchForm.cont" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="date"
                  type="daterange"
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
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <el-table v-loading="loading" element-loading-text="数据获取中" :data="tableData.tableData" stripe
                      style="width: 100%" border @cell-click="showDetail">
              <el-table-column prop="id" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="name" label="监测点名称" width="120" align="center">
                <template scope="scope">
                  <span class="detailSpan">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="数据类型" width="100" align="center">
              </el-table-column>
              <el-table-column prop="xx" label="相别" fit align="center">
                <el-table-column label="U相" align="center"></el-table-column>
                <el-table-column label="V相" align="center"></el-table-column>
                <el-table-column label="W相" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="日期" width="120" align="center">
              </el-table-column>
              <el-table-column prop="start" label="开始时间" width="100" align="center">
              </el-table-column>
              <el-table-column prop="end" label="结束时间" width="100" align="center">
              </el-table-column>
              <el-table-column prop="count" label="越限次数" width="70" align="center">
              </el-table-column>
              <el-table-column prop="std" label="标准值" width="100" align="center">
              </el-table-column>
              <el-table-column prop="dper" label="下限百分比" width="120" align="center">
                <template scope="scope">
                  {{scope.row.dper}}%
                </template>
              </el-table-column>
              <el-table-column prop="uper" label="上限百分比" width="120" align="center">
                <template scope="scope">
                  {{scope.row.uper}}%
                </template>
              </el-table-column>
              <el-table-column prop="max" label="越限最大值" fit align="center" width="140">
                <el-table-column label="U相" align="center" width="140">
                  <template scope="scope">
                    高于上限：{{scope.row.max}}%
                  </template>
                </el-table-column>
                <el-table-column label="V相" align="center" width="140">
                  <template scope="scope">
                    高于上限：{{scope.row.max}}%
                  </template>
                </el-table-column>
                <el-table-column label="W相" align="center" width="140">
                  <template scope="scope">
                    高于上限：{{scope.row.max}}%
                  </template>
                </el-table-column>
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
              <el-button icon="arrow-left" type="warning" size="small" @click="back">返回列表</el-button>
              <span class="detailTitle"> 单元越限设置</span>
            </el-card>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col>
              <el-card>
                <el-table border height="600" v-loading="loading" element-loading-text="数据获取中">
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
  import { mapGetters } from 'vuex'
  import { getShuntElectricitySix } from 'api/table'
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
        detailShow: false,
        activeName: 'first',
        searchForm: {
          cont: '电流',
          date: ''
        },
        date: '',
        tableData: [],
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        options: [{
          value: '选项1',
          label: '电流'
        }, {
          value: '选项2',
          label: '电压'
        }, {
          value: '选项3',
          label: '电量'
        }, {
          value: '选项4',
          label: '负荷'
        }, {
          value: '选项5',
          label: '功率因数'
        }]
      }
    },
    created () {
      this.date = defaultDate()
      this.searchForm.date = defaultDate()
      this.search()
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      dateFilter (val) {
        console.log(val)
        let arr = val.split(' - ')
        this.searchForm.date = arr
      },
      search () {
        this.loading = true
        getShuntElectricitySix(this.searchForm).then(res => {
          console.log(this.searchForm)
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
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
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

  .detailTitle {
    font-weight: bold;
  }

  .detailSpan {
    cursor: pointer;
    color: #3A5FCD;
  }
</style>
