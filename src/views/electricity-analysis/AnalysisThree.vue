<template>
  <div class="AnalysisThree">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="7" :lg="7">
        <el-card class="setUp">
          <el-radio-group v-model="radio" @change="change">
            <el-radio class="radio" v-model="radio" label="日数据">日数据</el-radio>
            <el-radio class="radio" v-model="radio" label="月数据">月数据</el-radio>
          </el-radio-group>
          <el-form v-show="radio=='日数据'">
            <el-form-item label="起止日期：">
              <el-date-picker
                v-model="date"
                type="daterange"
                placeholder="选择日期范围"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                style="width: 100%"
                @change="dateFilter">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-form v-show="radio=='月数据'">
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
            <el-form-item>
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
        <el-card class="card-tree">
          <tree :treeData="treeData" @nodeEvent="treeNode"></tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="17" :lg="17">
        <el-card>
          <div class="chart-top">
            <p class="title"><i class="iconfont icon-tubiao" style="color:#98FB98"></i> 用电监测 ( {{ date }} )</p>
            <Echarts :options="options" :needResize="true"></Echarts>
          </div>
          <div class="chart-middle">
            <div class="chart-left">
              <p class="title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i> 对比分析</p>
              <Echarts :options="options1" :needResize="true"></Echarts>
            </div>
            <div class="chart-right">
              <p class="title"><i class="iconfont icon-tubiao1" style="color:#DDA0DD"></i> 构成分析</p>
              <Echarts :options="options2" :needResize="true"></Echarts>
            </div>
          </div>
          <!-- 此处暂时写了俩种方法 方法一 写俩张表 在点击查询发送请求时 进行切换 -->
          <div class="table" v-if="checkDate">
            <el-table :data="tableData" style="width:100%" height="350" border>
              <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
              <el-table-column prop="name" label="单元" width="120" align="center"></el-table-column>
              <el-table-column prop="elec" label="电量(kWh)" fit align="center"></el-table-column>
              <el-table-column prop="per" label="占比(%)" fit align="center">
                <template scope="scope">
                  <span v-show="scope.row.per">{{scope.row.per}}%</span>
                  <span v-show="!scope.row.per">-</span>
                </template>
              </el-table-column>
              <!-- 方法二 此处v-if用以判断数据中是否有环比数据，没有则不显示，数据格式暂时不知，根据实际情况进行改动 -->
              <el-table-column prop="MoM" v-if="tableData[0].MoM" label="环比(%)" fit align="center">
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
          <div class="table" v-if="checkMonth">
            <el-table :data="tableData" style="width:100%" height="350" border>
              <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
              <el-table-column prop="name" label="单元" width="120" align="center"></el-table-column>
              <el-table-column prop="elec" label="电量(kWh)" fit align="center"></el-table-column>
              <el-table-column prop="per" label="占比(%)" fit align="center">
                <template scope="scope">
                  <span v-show="scope.row.per">{{scope.row.per}}%</span>
                  <span v-show="!scope.row.per">-</span>
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
        searchFormDate: {
          date: '',
          treeNode: ''
        },
        searchFormMonth: {
          startMonth: '',
          endMonth: '',
          treeNode: ''
        },
        date: '',
        radio: '日数据',
        checkDate: true,
        checkMonth: false,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
              data: [3095, 1787, 1015, 3002, 2330, 3056, 3038, 3500, 2800, 1434, 3104, 2904],
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
              }
            }
          ]
        },
        options1: {
          // title: {
          //     text: '',
          //     subtext: ''
          // },
          backgroundColor: '#444',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
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
              }, {
                name: '去年同期',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              }, {
                name: '上月同期',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              }
            ]
          },
          grid: {
            left: '40px',
            top: '30px',
            bottom: '30px',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
          },
          yAxis: {
            name: '单位:kWh',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#FFF'
            },
            type: 'category',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
            data: ['馈电柜1', '馈电柜2', '馈电柜3', '馈电柜4', '馈电柜5'],
          },
          series: [
            {
              name: '本期',
              type: 'bar',
              data: [11420, 9008, 40000, 78452, 20850],
              itemStyle: {
                normal: {
                  color: '#7FFFD4',
                }
              },
            },
            {
              name: '去年同期',
              type: 'bar',
              data: [12160, 9530, 57074, 57805, 21852],
              itemStyle: {
                normal: {
                  color: '#FF69B4',
                }
              },
            },
            {
              name: '上月同期',
              type: 'bar',
              data: [15670, 9421, 74004, 44129, 16890],
              itemStyle: {
                normal: {
                  color: '#0090FF',
                }
              },
            }
          ]
        },
        options2: {
          // backgroundColor: '#fff',
          backgroundColor: '#444',
          grid: {
            // left:'30px',
            top: '10%',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '电量',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  position: 'inner',
                  // formatter: '{b}\n{d}%'
                  textStyle: {
                    fontSize: '8',
                    fontWeight: 'normal'
                  }
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: 37666,
                  name: '一号进线',
                  itemStyle: {
                    normal: {
                      color: '#00F4FF',
                    }
                  },
                },
                {
                  value: 24316,
                  name: '二号进线',
                  itemStyle: {
                    normal: {
                      color: '#FF40B0',
                    }
                  },
                },
                {
                  value: 11278,
                  name: '三号进线',
                  selected: true,
                  itemStyle: {
                    normal: {
                      color: '#DD73FF',
                    }
                  },
                },
              ]
            },
            {
              name: '电量',
              type: 'pie',
              radius: ['50%', '60%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  formatter: '{b}\n{d}%',
                  textStyle: {
                    fontSize: '8',
                    fontWeight: 'normal'
                  }
                },
              },

              data: [
                {
                  value: 22988,
                  name: '变压器1',
                  itemStyle: {
                    normal: {
                      color: '#73F9FF',
                    }
                  }
                },
                {
                  value: 14678,
                  name: '变压器2',
                  itemStyle: {
                    normal: {
                      color: '#20B4BF',
                    }
                  }
                },
                {
                  value: 12863,
                  name: '变压器3',
                  itemStyle: {
                    normal: {
                      color: '#FF73C5',
                    }
                  }
                }
              ]
            }
          ]
        },
        tableData: [{
          id: 1,
          name: 'Ⅰ线',
          elec: '4245',
          per: '9.69',
          MoM: '-62.91',
          YoY: '-3.17',
        }, {
          id: 2,
          name: 'Ⅱ线',
          elec: '16980',
          per: '38.76',
          MoM: '-22.19',
          YoY: '-18.56',
        }, {
          id: 3,
          name: 'Ⅲ线',
          elec: '22575',
          per: '51.54',
          MoM: '-47.99',
          YoY: '-29.73',
        }, {
          id: 4,
          name: '变压器1',
          elec: '7714',
          per: '17.61',
          MoM: '-15.42',
          YoY: '3.5',
        }, {
          id: 5,
          name: '变压器2',
          elec: '4203',
          per: '9.59',
          MoM: '-11.77',
          YoY: '-18.85',
        }, {
          id: 6,
          name: '变压器3',
          elec: '7713',
          per: '17.61',
          MoM: '-24.63',
          YoY: '-3.5',
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
        }]
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
        if (value == '月数据')
          this.date = ''
        this.searchFormDate.date = ''
        let nowMonth = new Date().getMonth()
        let firstMonth = new Date().getTime() - 3600 * 1000 * 24 * nowMonth * 3 * 10
        this.searchFormMonth.startMonth = dateFormat(new Date(firstMonth), 'yyyy-MM')
        this.searchFormMonth.endMonth = dateFormat(new Date(), 'yyyy-MM')
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
          // 此处就是上面所说方法一 用以切换表格
          this.checkDate = true
          this.checkMonth = false
        } else {
          console.log(this.searchFormMonth)
          this.checkDate = false
          this.checkMonth = true
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
  .card-tree {
    margin-bottom: 20px;
  }
  .title {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
  }
  .chart-top {
    height: 300px;
    padding: 5px;
    margin-bottom: 30px;
  }
  .chart-middle {
    display: flex;
    height: 300px;
    margin-top: 40px;
    .chart-left {
      width: 60%;
      padding: 5px;
      margin-right: 5px;
    }
    .chart-right {
      width: 40%;
      height: 100%;
      padding: 5px;
    }
  }
  .table {
    margin-top: 35px;
    padding: 5px;
  }
</style>