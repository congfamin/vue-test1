<template>
  <div class="AnalysisTwo">
    <el-row class="elRow-one">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="setUp">
            <el-radio-group class="radio" v-model="radio" @change="change">
              <el-radio-button label="实时数据"></el-radio-button>
              <el-radio-button label="日数据"></el-radio-button>
              <el-radio-button label="月数据"></el-radio-button>
            </el-radio-group>
            <el-form :inline="true" class="demo-form-inline" v-show="radio=='实时数据'">
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="searchRtime.realTime"
                  type="date"
                  :picker-options="pickerOpitons"
                  placeholder="选择日期"
                  :editable="false"
                  :clearable="false"
                  @change="dateFilter">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" v-show="radio=='日数据'">
              <el-form-item label="日期：">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  :picker-options="pickerOpitons"
                  placeholder="选择日期范围"
                  :editable="false"
                  :clearable="false"
                  @change="dateFilter1">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" v-show="radio=='月数据'">
              <el-form-item label="起止月：">
                <el-date-picker
                  v-model="searchMonth.startMonth"
                  type="month"
                  placeholder="选择月"
                  :editable="false"
                  :clearable="false"
                  @change="dateFilter2">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="至" v-show="radio=='月数据'"></el-form-item>
              <el-form-item v-if="radio=='月数据'">
                <el-date-picker
                  v-model="searchMonth.endMonth"
                  type="month"
                  placeholder="选择月"
                  :editable="false"
                  :clearable="false"
                  @change="dateFilter3">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <el-button type="primary" icon="search" @click="search">查询</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="elRow-two">
      <transition name="fade">
        <el-col :xs="24" :sm="24" :md="8" :lg="6" class="div-tree">
          <el-card class="box-card tree-card">
            <tree :treeData="treeData" @nodeEvent="treeNode"></tree>
          </el-card>
        </el-col>
      </transition>
      <el-card class="elCard-container">
        <p class="title-second title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i>
          用电监测 ( 2017-08-02 - 2017-08-18 )</p>
        <div class="chart">
          <Echarts :options="options" ref="echarts" :needResize="true"></Echarts>
        </div>
      </el-card>
    </el-row>
    <el-row :gutter="20" class="elRow-three">
      <el-col :span="24">
        <el-card>
          <table>
            <tbody>
            <tr>
              <th>序号</th>
              <th>日期</th>
              <th>最大负荷(kW)</th>
              <th>平均负荷(kW)</th>
              <th>峰谷差(kW)</th>
              <th>负荷率</th>
            </tr>
            <tr class="tr" v-for="(item, key) in tableData" :key="key">
              <td>1</td>
              <td>2</td>
              <td>4</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            </tbody>
          </table>
        </el-card>
      </el-col>
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
        searchRtime: {
          realTime: '',
          treeNode: '用电监测'
        },
        searchDate: {
          date: '',
          treeNode: '用电监测'
        },
        searchMonth: {
          startMonth: '',
          endMonth: '',
          treeNode: '用电监测'
        },
        date: '',
        radio: '实时数据',
        tableData: [
          {},
          {},
          {},
          {},
          {},
          {}
        ],
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
        pickerOpitons: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        options: {
          grid: {
            left: '10%',
            top: '20%',
            bottom: '30px',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show: true,
            top: '5%',
            left: '85%',
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
            splitLine: {show: false},
            axisLine: {show: true},
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#333'
              }
            },
            boundaryGap: false,
            interval: '4',
            data: ['0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45',
              '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45',
              '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45',
              '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
              '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
              '15:00', '15:15', '15:30', '15:45', '15:00', '15:15', '15:30', '15:45', '17:00', '17:15', '17:30', '17:45',
              '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45',
              '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45']
          },
          yAxis: {
            type: 'value',
            splitLine: {show: true},
            axisLine: {show: true},
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#333'
              }
            },
            axisLabel: {
              formatter: '{value} kW'
            },
          },
          series: [
            {
              name: '今日',
              type: 'line',
              smooth: true,
              data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 34, 90, 100, 105,
                100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 230, 243, 240, 227],
              itemStyle: {
                normal: {
                  color: '#00E9FF',
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#EE2C2C' // 0% 处的颜色
                      }, {
                        offset: 1, color: 'skyblue' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    },
                    width: '3'
                  },
                }
              },
              markLine: {
                symbol: 'circle',
                data: [{
                  type: 'average',
                  name: '平均值',
                  itemStyle: {
                    normal: {
                      color: '#FF0',
                    }
                  },
                  label: {
                    normal: {
                      formatter: ' 平均值：\n {c}kW',
                      textStyle: {
                        fontSize: '13',
                        fontWeight: 'bold',
                        color: '#FF0'
                      }
                    }
                  }
                }, {
                  type: 'max',
                  name: '最大值',
                  itemStyle: {
                    normal: {
                      color: '#EE2C2C',
                    }
                  },
                  label: {
                    normal: {
                      formatter: ' 最大值：\n {c}kW',
                      textStyle: {
                        fontSize: '13',
                        fontWeight: 'bold',
                        color: '#EE2C2C'
                      }
                    }
                  }
                },
                  {
                    type: 'min',
                    name: '最小值',
                    itemStyle: {
                      normal: {
                        color: 'skyblue',
                      }
                    },
                    label: {
                      normal: {
                        formatter: ' 最小值：\n {c}kW',
                        textStyle: {
                          fontSize: '13',
                          fontWeight: 'bold',
                          color: 'skyblue'
                        }
                      }
                    }
                  }]
              }
            }
          ]
        }
      }
    },
    created () {
      this.searchRtime.realTime = dateFormat(new Date(), 'yyyy-MM-dd')
      // this.search();        
    },
    methods: {
      dateFilter (val) {
        console.log(val)
        this.searchRtime.realTime = val
      },
      dateFilter1 (val) {
        console.log(val)
        if (val != '') {
          let arr = val.split(' - ')
          console.log(arr)
          this.searchDate.date = arr
        }
      },
      dateFilter2 (val) {
        console.log(val)
        this.searchMonth.startMonth = val
      },
      dateFilter3 (val) {
        console.log(val)
        this.searchMonth.endMonth = val
      },
      change (value) {
        console.log(value)
        if (value == '日数据') {
          this.date = defaultDate()
          this.searchDate.date = defaultDate()
        }
        if (value == '月数据') {
          let nowMonth = new Date().getMonth()
          let firstMonth = new Date().getTime() - 3600 * 1000 * 24 * nowMonth * 3 * 10
          this.searchMonth.startMonth = dateFormat(new Date(firstMonth), 'yyyy-MM')
          this.searchMonth.endMonth = dateFormat(new Date(), 'yyyy-MM')
        }
        if (value == '实时数据') {
          this.searchRtime.realTime = dateFormat(new Date(), 'yyyy-MM-dd')
        }
      },
      search () {
        if (this.radio == '实时数据') {
          console.log(this.searchRtime)
        } else if (this.radio == '日数据') {
          console.log(this.searchDate)
        } else {
          console.log(this.searchMonth)
        }
      },
      treeNode (node) {
        if (this.radio == '实时数据') {
          this.searchRtime.treeNode = node
          console.log(this.searchRtime)
        } else if (this.radio == '日数据') {
          this.searchDate.treeNode = node
          console.log(this.searchDate)
        } else {
          this.searchMonth.treeNode = node
          console.log(this.searchMonth)
        }
        this.search()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .setUp {
    display: flex;
    align-items: center;
  }
  .radio {
    margin-right: 10px;
  }
  .tree-card {
    height: 450px;
    margin-bottom: 20px;
  }
  .elRow-one {
    margin-bottom: 20px;
  }
  .elCard-container {
    height: 450px;
    background-color: #eee;
    .title {
      width: 100%;
      padding: 5px;
      font-size: 16px;
      color: #fff;
      background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
    }
    .chart {
      width: 100%;
      height: 330px;
    }
  }
  table {
    width: 100%;
    text-align: center;
  }
  tr, th, td {
    padding: 10px;
    border: 1px solid #ccc;
  }
  th {
    background-color: rgb(238, 241, 246);
  }
  .tr:hover {
    background-color: rgb(238, 241, 246);
  }
</style>