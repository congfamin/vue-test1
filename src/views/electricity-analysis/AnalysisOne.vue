<template>
  <div class="AnalysisOne">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="7" :lg="7">
        <el-card class="setUp">
          <el-radio-group v-model="radio" @change="change">
            <el-radio class="radio" label="日数据">日数据</el-radio>
            <el-radio class="radio" label="月数据">月数据</el-radio>
          </el-radio-group>
          <el-form :model="searchFormDate" v-show="radio=='日数据'">
            <el-form-item label="起止日期：">
              <el-date-picker
                v-model="date"
                type="daterange"
                placeholder="选择日期范围"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                @change="dateFilter"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-form :model="searchFormMonth" v-show="radio=='月数据'">
            <el-form-item label="起止月：">
              <el-date-picker
                v-model="searchFormMonth.startMonth"
                type="month"
                placeholder="选择起始月"
                :editable="false"
                :clearable="false"
                style="width: 100%"
                @change="dateFilter1">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-show="radio==2">
              <el-date-picker
                v-model="searchFormMonth.endMonth"
                type="month"
                placeholder="选择截止月"
                :editable="false"
                :clearable="false"
                style="width: 100%"
                @change="dateFilter2">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" icon="search" style="width: 100%" @click="search">查询</el-button>
        </el-card>
        <el-card class="box-card tree-card">
          <tree :treeData="treeData" @nodeEvent="treeNode"></tree>
        </el-card>
      </el-col>
      <el-card class="elCard-container">
        <div class="charts-h">
          <p class="title-second title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i>
            用电监测 ( 2017-08-02 - 2017-08-18 )</p>
          <Echarts :options="options" ref="echarts" :needResize="true"></Echarts>
        </div>
        <div class="table">
          <el-table :data="tableData" v-loading="loading" element-loading-text="数据获取中" style="width:100%" height="350"
                    border>
            <el-table-column prop="date" label="日期(kWh)" width="120" align="center"></el-table-column>
            <el-table-column prop="this" label="本期电量(kWh)" fit align="center"></el-table-column>
            <el-table-column prop="lastM" label="上月同期电量(kWh)" fit align="center"></el-table-column>
            <el-table-column prop="lastY" label="去年同期电量(kWh)" fit align="center"></el-table-column>
            <el-table-column prop="MoM" label="环比(%)" fit align="center">
              <template scope="scope">
                {{scope.row.MoM}}%
              </template>
            </el-table-column>
            <el-table-column prop="YoY" label="同比(%)" fit align="center">
              <template scope="scope">
                {{scope.row.YoY}}%
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
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
        searchFormDate: {
          date: '',
          treeNode: ''
        },
        searchFormMonth: {
          startMonth: '',
          endMonth: '',
          treeNode: ''
        },
        loading: true,
        date: '',
        tableData: [],
        checked: true,
        radio: '日数据',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        tableData: [{
          id: 1,
          date: '2017-8-11',
          this: '3095',
          lastM: '5375',
          lastY: '5075',
          MoM: '-42.42',
          YoY: '-39.1',
        }, {
          id: 2,
          date: '2017-8-12',
          this: '1787',
          lastM: '5136',
          lastY: '4994',
          MoM: '-65.19',
          YoY: '-64.2',
        }, {
          id: 3,
          date: '2017-8-13',
          this: '1015',
          lastM: '5547',
          lastY: '4018',
          MoM: '-81.69',
          YoY: '-74.73',
        }, {
          id: 4,
          date: '2017-8-14',
          this: '3002',
          lastM: '5328',
          lastY: '1105',
          MoM: '43.64',
          YoY: '171.8',
        }, {
          id: 5,
          date: '2017-8-15',
          this: '2330',
          lastM: '3837',
          lastY: '5284',
          MoM: '-39.26',
          YoY: '-55.89',
        }, {
          id: 6,
          date: '2017-8-11',
          this: '3056',
          lastM: '1601',
          lastY: '3853',
          MoM: '90.85',
          YoY: '-20.67',
        }, {
          id: 7,
          date: '2017-8-12',
          this: '3038',
          lastM: '7209',
          lastY: '4548',
          MoM: '-57.85',
          YoY: '-33.19',
        }],
        treeData: [{
          id: 1,
          label: '用电监测',
          children: [{
            id: 2,
            label: 'Ⅰ线',
            children: [{
              id: 5,
              label: '变压器 1',
              children: [{
                id: 8,
                label: '馈线柜 1'
              }, {
                id: 9,
                label: '馈线柜 2'
              }, {
                id: 10,
                label: '馈线柜 3'
              }, {
                id: 11,
                label: '馈线柜 4'
              }]
            }]
          }, {
            id: 3,
            label: 'Ⅱ线',
            children: [{
              id: 6,
              label: '变压器 2',
              children: [{
                id: 12,
                label: '馈线柜 5'
              }, {
                id: 13,
                label: '馈线柜 6'
              }, {
                id: 14,
                label: '馈线柜 7'
              }, {
                id: 15,
                label: '馈线柜 8'
              }]
            }]
          }, {
            id: 4,
            label: 'Ⅲ线',
            children: [{
              id: 7,
              label: '变压器 3'
            }]
          }]
        }],
        options: {
          // title: {
          //     text:'同期对比',
          //     left:'center',
          //     textStyle:{
          //         // color:'#ccc',//文字颜色
          //         fontStyle:'normal',//字体风格,'normal','italic','oblique'
          //         fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          //         fontFamily:'sans-serif',//字体系列 
          //         fontSize:18//字体大小
          //     },
          // },
          backgroundColor: '#444',
          grid: {
            left: '50px',
            top: '30px',
            bottom: '30px',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          // 提示框组件
          tooltip: {
            // 触发类型
            // axis 坐标轴触发
            trigger: 'axis',
          },
          legend: {
            bottom: '1%',
            data: [
              {
                name: '本期',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              },
              {
                name: '上月同期',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
              },
              {
                name: '去年同期',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
              }
            ]
          },
          toolbox: {
            show: true,
            left: '80%',
            top: '5px',
            feature: {
              magicType: {type: ['line', 'bar']},
            },
            iconStyle: {
              normal: {
                color: '#FFF'
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
            max: 'dataMax',
            boundaryGap: true,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
          },
          yAxis: {
            name: '单位:kWh',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#FFF'
            },
            type: 'value',
            nameLocation: 'end',
            nameGap: '10',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
            // axisLabel: {
            //     formatter: '{value} kWh'
            // }
            textStyle: {
              fontSize: 20,
              color: 'red'
            }
          },
          series: [
            {
              name: '本期',
              type: 'bar',
              data: [3095, 1787, 1015, 3002, 2330, 3056, 3038],
              itemStyle: {
                normal: {
                  color: '#0090FF',
                  lineStyle: {
                    color: '#0090FF',
                    width: '3',
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  barBorderRadius: [3, 3, 0, 0], //圆角半径
                  // borderType:'dashed',
                  // areaStyle: {   //填充样式
                  //     type: 'default'
                  // }, 
                }
              },
            },
            {
              name: '上月同期',
              type: 'bar',
              data: [5375, 5136, 5547, 5328, 3837, 1601, 7209],
              itemStyle: {
                normal: {
                  color: '#00F4FF',
                  lineStyle: {
                    color: '#00F4FF',
                    width: '3'
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  barBorderRadius: [3, 3, 0, 0], //圆角半径
                  // areaStyle: {   //填充样式
                  //     type: 'default'
                  // }, 
                }
              }
            },
            {
              name: '去年同期',
              type: 'bar',
              data: [5075, 4994, 4018, 1105, 5284, 3853, 4548],
              itemStyle: {
                normal: {
                  color: '#0052FF',
                  lineStyle: {
                    color: '#0052FF',
                    width: '2'
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  barBorderRadius: [3, 3, 0, 0], //圆角半径
                  // areaStyle: {
                  //     type: 'default'//填充样式
                  // } 
                }
              }
            }
          ]
        }
      }
    },
    created () {
      this.date = defaultDate()
      this.searchFormDate.date = defaultDate()
      this.search()
    },
    methods: {
      dateFilter (val) {
        console.log(val)
        this.searchFormDate.date = val
      },
      dateFilter1 (val) {
        console.log(val)
        this.searchFormMonth.startMonth = val
      },
      dateFilter2 (val) {
        console.log(val)
        this.searchFormMonth.endMonth = val
      },
      change (value) {
        if (value == '月数据') {
          this.date = ''
          this.searchFormDate.date = ''
          let nowMonth = new Date().getMonth()
          let firstMonth = new Date().getTime() - 3600 * 1000 * 24 * nowMonth * 3 * 10
          this.searchFormMonth.startMonth = dateFormat(new Date(firstMonth), 'yyyy-MM')
          this.searchFormMonth.endMonth = dateFormat(new Date(), 'yyyy-MM')
        }
        if (value == '日数据') {
          this.searchFormMonth.startMonth = ''
          this.searchFormMonth.endMonth = ''
          this.date = defaultDate()
          this.searchFormDate.date = defaultDate()
        }
      },
      search () {
        if (this.radio == '日数据') {
          console.log(this.searchFormDate)
          this.checkDate = true
          this.checkMonth = false
          this.loading = false
        } else {
          console.log(this.searchFormMonth)
          this.checkDate = false
          this.checkMonth = true
          this.loading = false
        }
      },
      treeNode (node) {
        console.log(node)
        this.searchForm.treeNode = node
        this.search()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .setUp {
    margin-bottom: 20px;
  }
  .charts-c {
    height: 300px;
  }
  .title {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
  }
  .elCard-container {
    height: 750px;
    .charts-h {
      height: 320px;
      margin-bottom: 40px;
    }
    .table {
      padding-top: 10px;
      border-top: 2px solid #87CEFA;
    }
  }
  .tree-card {
    height: 100%;
    margin-bottom: 20px;
  }
</style>