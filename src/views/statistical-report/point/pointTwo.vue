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
                align="right"
                type="date"
                placeholder="选择日期"
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
        <!-- 此处v-loading是element-ui自带的加载组件，若数据还未成功获取会显示加载动画，通过改变loading的值
        来控制加载动画，true为开，false为关 -->
        <el-card class="box-card" v-loading="loading" element-loading-text="数据获取中">
          <!-- 该表格可以和月负荷监测表进行复用，是否复用自行考虑 -->
          <el-table :data="tableData.tableData" border style="width: 100%">
            <el-table-column prop="max" label="日最大负荷(kW)" fit align="center"></el-table-column>
            <el-table-column prop="maxdate" label="日最大负荷出现时间" fit align="center"></el-table-column>
            <el-table-column prop="min" label="日最小负荷(kW)" fit align="center"></el-table-column>
            <el-table-column prop="mindate" label="日最大负荷出现时间" fit align="center"></el-table-column>
            <el-table-column label="过负荷点个数" fit align="center">
              <template scope="props">
                <span>{{ count }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData.tableData1" border style="width: 100%" max-height="500">
            <el-table-column prop="date" label="时间点" width="120" align="center"></el-table-column>
            <el-table-column label="监测点用电负荷数据(kW)" align="center">
              <el-table-column prop="sum" label="有功总" fit align="center"></el-table-column>
              <el-table-column prop="Pu" label="Pu" fit align="center">
                <template scope="scope">
                  <!-- 判断值是否为空，若为空则用'-'填充，表示无值 -->
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
                  <!-- 此处是将表格中得有功总与负荷阈值中输入的值进行比较，若前者大于后者，则出现报警标签 -->
                  <!-- 此处需要注意数据类型，若都为字符串类型，对比大小会出问题 -->
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
  // 往后类似都为接口
  import { getPointTwo } from 'api/table'
  // utils里的时间戳转换工具
  import { dateFormat, defaultDate } from 'utils'
  // 水波纹组件，仅仅好看，不用可以删除
  import waves from 'components/waves/index'

  export default {
    // 水波纹的自定义属性
    directives: {
      waves
    },
    data () {
      return {
        // element-ui里自带的加载组件
        loading: true,
        warnVal: '',
        tableData: [],
        searchForm: {
          date: '',
          // 此为监测点
          monitorPoint: '0',
        },
        pickerOptions: {
          // 此处对日期控件进行限制，禁止用户选择当天往后的时间点，根据需求自行更改
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          // 此处为日期控件的快捷选项，没有此需求可以删掉
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
        // 监测点
        'monitoringPoint',
        // 负荷阈值
        'warnValue'
      ]),
      // 此处用以计算过负荷点数
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
      // 此处需求暂定日期控件默认显示时间为前一天
      let yesterDay = new Date().getTime() - 3600 * 1000 * 24
      this.searchForm.date = dateFormat(new Date(yesterDay), 'yyyy-MM-dd')
      this.search()
    },
    methods: {
      // @change（element-ui日期控件自带的事件）对应的方法，此处val是转换后的时间
      dateFilter (val) {
        console.log(val)
        this.searchForm.date = val
      },
      // 点击查询触发的方法
      search () {
        this.loading = true
        console.log(this.searchForm)
        getPointTwo(this.searchForm).then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.loading = false
        }).catch(error => {
          console.log('数据未获取')
        })
        // 派送设置的负荷阈值
        console.log(this.warnValue)
        // 派送事件至store下的app.js中
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