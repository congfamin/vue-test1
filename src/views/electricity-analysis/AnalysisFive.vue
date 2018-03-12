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
          <div class="chart-middle">
            <div class="chart-left">
              <p class="title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i> 对比分析</p>
              <Echarts :options="options" :needResize="true"></Echarts>
            </div>
            <div class="chart-right">
              <p class="title"><i class="iconfont icon-tubiao1" style="color:#DDA0DD"></i> 构成分析</p>
              <Echarts :options="options1" :needResize="true"></Echarts>
            </div>
          </div>
          <div class="chart-bottom">
            <p class="title"><i class="iconfont icon-tubiao" style="color:#98FB98"></i> 用电监测 ( {{ date }} )</p>
            <Echarts :options="options2" :needResize="true"></Echarts>
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
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
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
            left: '15px',
            top: '30px',
            bottom: '30px',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            bottom: '1%',
            data: [
              {
                name: '本期',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              },
              {
                name: '上月同期',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
              },
              {
                name: '去年同期',
                textStyle: {
                  fontSize: 15,
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
            data: ['峰电量', '平电量', '谷电量', '尖电量']
          },
          yAxis: {
            name: '单位:%',
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
              data: [42.31, 33.66, 24.03, 0],
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
              data: [46.34, 42.42, 12.24, 0],
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
              data: [41.95, 32.76, 12.25, 13.01],
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
        },
        options1: {
          // title: {
          //     text: '月耗电量构成分析（单位：kWh）',
          //     left: 'center'
          // },
          backgroundColor: '#444',
          grid: {
            // left:'30px',
            top: '10%',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}kWh ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            align: 'auto',
            bottom: '5%',
            x: 'center',
            data: ['总耗电', '峰电量', '平电量', '谷电量', '尖电量'],
            textStyle: {
              fontSize: 15,
              fontWeight: 'normal',
              color: '#FFF'
            },
          },
          series: [
            {
              name: '电量',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ['50%', '40%'],
              label: {
                normal: {
                  position: 'inner',
                  formatter: '总耗电：{c}kWh',
                  textStyle: {
                    fontSize: '13',
                    fontWeight: 'bold',
                    color: '#FFF'
                  }
                },
                // emphasis: {
                //     show: true,
                //     textStyle: {
                //         fontSize: '30',
                //         fontWeight: 'bold',
                //         color:'#000000'
                //     }
                // }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 2158,
                name: '总耗电',
                itemStyle: {
                  normal: {
                    // areaColor: {
                    //     type: 'radial',
                    //     x: 0.5,
                    //     y: 0.5,
                    //     r: 0.5,
                    //     colorStops: [{
                    //         offset: 0, color: '#000' // 0% 处的颜色
                    //     }, {
                    //         offset: 1, color: '#FFF' // 100% 处的颜色
                    //     }],
                    //     globalCoord: false // 缺省为 false
                    // },
                    color: '#A101F9'
                  },
                }
              }]
            },
            {
              name: '电量',
              type: 'pie',
              radius: ['40%', '55%'],
              center: ['50%', '40%'],
              label: {
                normal: {
                  formatter: '{b}\n{d}%'
                },
              },
              data: [
                {
                  value: 913,
                  name: '峰电量',
                  itemStyle: {
                    normal: {
                      color: '#40EFFF',
                    }
                  }
                },
                {
                  value: 729,
                  name: '平电量',
                  itemStyle: {
                    normal: {
                      color: '#0090FF',
                    }
                  }
                },
                {
                  value: 516,
                  name: '谷电量',
                  itemStyle: {
                    normal: {
                      color: '#0052FF',
                    }
                  }
                },
                {
                  value: 0,
                  name: '尖电量',
                  itemStyle: {
                    normal: {
                      color: '#00FF98',
                    }
                  }
                }
              ]
            }
          ]
        },
        options2: {
          backgroundColor: '#444',
          // title: {
          //     text: '电量分析日数据(单位：kWh)',
          //     left:'center',
          //     textStyle:{
          //         // color:'#ccc',//文字颜色
          //         fontStyle:'normal',//字体风格,'normal','italic','oblique'
          //         fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          //         fontFamily:'sans-serif',//字体系列 
          //         fontSize:15//字体大小
          //     },
          // },
          grid: {
            left: '30px',
            top: '30px',
            bottom: '30px',
            containLabel: true,
            backgroundColor: '#CCC'
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            bottom: '1%',
            data: ['峰电量', '平电量', '谷电量', '尖电量'],
            textStyle: {
              fontSize: 15,
              fontWeight: 'normal',
              color: '#FFF'
            },
          },
          toolbox: {
            show: true,
            left: '80%',
            top: '5px',
            feature: {
              magicType: {type: ['line', 'bar', 'stack', 'tiled']},
            },
            iconStyle: {
              normal: {
                color: '#FFF'
              }
            }
          },
          xAxis: {
            type: 'category',
            max: 'dataMax',
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: '#FFF',
              }
            },
            data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日',
              '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日',
              '25日', '26日', '27日', '28日', '29日', '30日', '31日']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#FFF'
              }
            },
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#FFF'
            },
            axisLabel: {
              formatter: '{value} kWh'
            }
          },
          series: [
            {
              name: '峰电量',
              type: 'bar',
              data: [74, 84, 79, 68, 32,
                15, 73, 77, 80, 65,
                73, 42, 17, 73, 61],
              itemStyle: {
                normal: {
                  color: '#40EFFF',
                  lineStyle: {
                    color: '#40EFFF',
                    width: '3'
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  // areaStyle: {   //填充样式
                  //     type: 'default'
                  // }, 
                }
              },
            },
            {
              name: '平电量',
              type: 'bar',
              data: [67, 74, 52, 64, 32,
                12, 64, 48, 52, 64,
                44, 31, 14, 54, 57],
              itemStyle: {
                normal: {
                  color: '#0090FF',
                  lineStyle: {
                    color: '#0090FF',
                    width: '3'
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  // areaStyle: {   //填充样式
                  //     type: 'default'
                  // }, 
                }
              }
            },
            {
              name: '谷电量',
              type: 'bar',
              data: [40, 14, 48, 46, 28,
                10, 28, 42, 41, 48,
                41, 23, 8, 43, 56],
              itemStyle: {
                normal: {
                  color: '#0052FF',
                  lineStyle: {
                    color: '#0052FF',
                    width: '2'
                  },
                  barBorderColor: '#FFF', //边框色
                  barBorderWidth: 1, //边框宽度
                  // areaStyle: {
                  //     type: 'default'//填充样式
                  // } 
                }
              }
            },
            {
              name: '尖电量',
              type: 'bar',
              data: [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0],
              itemStyle: {
                normal: {
                  color: '#00FF98',
                  lineStyle: {
                    color: '#00FF98',
                    width: '2'
                  },
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
  .div-switch {
    width: 100%;
    line-height: 40px;
    margin-bottom: 20px;
    padding: 8px;
    box-shadow: 0 0 4px #ccc;
  }

  .setUp {
    margin-bottom: 20px;
  }

  .card-tree {
    margin-bottom: 20px;
  }

  .close {
    color: #ccc;
    margin-left: 130px;
    cursor: pointer;
  }

  .title {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
  }

  .chart-bottom {
    height: 300px;
    padding: 5px;
    margin-top: 40px;
    margin-bottom: 30px;
  }

  .chart-middle {
    display: flex;
    height: 300px;
    margin-bottom: 30px;
    .chart-left {
      width: 60%;
      padding: 5px;
      margin-right: 10px;
    }
    .chart-right {
      width: 40%;
      height: 100%;
      padding: 5px;
    }
  }

  .table-bottom {
    margin-top: 10px;
    height: 250px;
  }
</style>