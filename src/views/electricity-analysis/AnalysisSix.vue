<template>
  <div class="AnalysisOne">
    <el-row class="elRow-one">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="起止月：">
              <el-date-picker
                v-model="searchForm.startMonth"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="至"></el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="searchForm.endMonth"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="elRow-two">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <p class="title-second title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i> 总表1报装方式分析 </p>
          <div class="chart-top">
            <Echarts :options="options" ref="echarts" :needResize="true"></Echarts>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <p class="title-second title"><i class="iconfont icon-tubiao" style="color:#BFEFFF"></i> 需量容量分析 </p>
          <div class="chart-bottom">
            <Echarts :options="options1" ref="echarts" :needResize="true"></Echarts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="elRow-three">
      <el-col>
        <el-card class="box-card">
          <h4 class="table-title"> 量价费分析 </h4>
          <el-table :data="tableData" v-loading="loading" element-loading-text="数据获取中" border style="width: 100%">
            <el-table-column label="序号" prop="id" width="80" align="center">
            </el-table-column>
            <el-table-column label="月份" prop="month" width="100" align="center">
            </el-table-column>
            <el-table-column label="监测点" prop="name" width="100" align="center">
            </el-table-column>
            <el-table-column label="按需量计算" align="center">
              <el-table-column label="需量实际量(kW)" prop="xlsj" width="120" align="center">
              </el-table-column>
              <el-table-column label="核定需量(kW)" prop="hdxl" align="center">
              </el-table-column>
              <el-table-column label="单价(元/kW)" prop="xdj" align="center">
              </el-table-column>
              <el-table-column label="电费(元)" prop="xdf" align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column label="按容量计算" align="center">
              <el-table-column label="容量(kW)" prop="rl" width="120" align="center">
              </el-table-column>
              <el-table-column label="单价(元/kW)" prop="rdj" align="center">
              </el-table-column>
              <el-table-column label="电费(元)" prop="rdf" align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column label="差价(元)" prop="cj" align="center">
            </el-table-column>
          </el-table>
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
      let that = this
      return {
        loading: true,
        searchForm: {
          startMonth: '',
          endMonth: '',
        },
        tableData: [{
          id: '1',
          month: '2017-01',
          name: '主楼总表1',
          xlsj: '23',
          hdxl: '252',
          xdj: '40',
          xdf: '10080',
          rl: '630',
          rdj: '30',
          rdf: '18900',
          cj: '8820'
        }, {
          id: '2',
          month: '2017-01',
          name: '主楼总表1',
          xlsj: '20',
          hdxl: '252',
          xdj: '40',
          xdf: '10080',
          rl: '630',
          rdj: '30',
          rdf: '18900',
          cj: '8820'
        }, {
          id: '3',
          month: '2017-01',
          name: '主楼总表1',
          xlsj: '48',
          hdxl: '252',
          xdj: '40',
          xdf: '10080',
          rl: '630',
          rdj: '30',
          rdf: '18900',
          cj: '8820'
        }, {
          id: '4',
          month: '2017-01',
          name: '主楼总表1',
          xlsj: '40',
          hdxl: '252',
          xdj: '40',
          xdf: '10080',
          rl: '630',
          rdj: '30',
          rdf: '18900',
          cj: '8820'
        }, {
          id: '5',
          month: '2017-01',
          name: '主楼总表1',
          xlsj: '114',
          hdxl: '252',
          xdj: '40',
          xdf: '10080',
          rl: '630',
          rdj: '30',
          rdf: '18900',
          cj: '8820'
        }],
        options: {
          backgroundColor: '#444',
          // title:{
          //     text: '实时负荷(单位：kWh）',
          //     left:'center',
          //     textStyle:{
          //         // color:'#ccc',//文字颜色
          //         fontStyle:'normal',//字体风格,'normal','italic','oblique'
          //         fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          //         fontFamily:'sans-serif',//字体系列 
          // 　　　　 fontSize:18//字体大小
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
          toolbox: {
            show: true,
            top: '1%',
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
          legend: {
            bottom: '1%',
            data: [
              {
                name: '需量电费',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              },
              {
                name: '容量电费',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
              },
            ]
          },
          xAxis: {
            type: 'category',
            splitLine: {show: false},
            axisLine: {show: true},
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
            boundaryGap: false,
            interval: '4',
            data: ['0', '252', '472', '630']
          },
          yAxis: {
            name: '单位:元',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#FFF'
            },
            type: 'value',
            splitLine: {show: true},
            axisLine: {show: true},
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#FFF'
              }
            },
            // axisLabel: {
            //     formatter: '{value} kW'
            // },
          },
          series: [
            {
              name: '需量电费',
              type: 'line',
              smooth: true,
              data: [10080, 10080, 18900, 25200],
              itemStyle: {
                normal: {
                  color: '#D15FEE',
                  lineStyle: {
                    color: '#D15FEE',
                    width: '3'
                  },
                }
              }
            },
            {
              name: '容量电费',
              type: 'line',
              smooth: true,
              data: [18900, 18900, 18900, 18900],
              itemStyle: {
                normal: {
                  color: '#FFA500',
                  lineStyle: {
                    color: '#FFA500',
                    width: '3'
                  },
                }
              }
            }
          ]
        },
        options1: {
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
            data: [
              {
                name: '需量',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
                // icon:'stack'
              },
              {
                name: '容量',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'normal',
                  color: '#FFF'
                },
              },
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
            data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07']
          },
          yAxis: {
            name: '单位:元',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#FFF'
            },
            type: 'value',
            nameLocation: 'end',
            // 坐标轴名称与轴线之间的距离。
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
              name: '需量',
              type: 'bar',
              data: [10080, 10080, 10080, 10080, 10080, 10080, 10080],
              itemStyle: {
                normal: {
                  color: '#D15FEE',
                  lineStyle: {
                    color: '#D15FEE',
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
              name: '容量',
              type: 'bar',
              data: [18900, 18900, 18900, 18900, 18900, 18900, 18900],
              itemStyle: {
                normal: {
                  color: '#FFA500',
                  lineStyle: {
                    color: '#FFA500',
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
          ]
        }
      }
    },
    created () {
      console.log(new Date())
      // this.searchForm.startMonth = 'Sun Jan 01 2017 00:00:00 GMT+0800 (中国标准时间)';
      let nowMonth = new Date().getMonth()
      let firstMonth = new Date().getTime() - 3600 * 1000 * 24 * nowMonth * 3 * 10
      this.searchForm.startMonth = dateFormat(new Date(firstMonth), 'yyyy-MM')
      this.searchForm.endMonth = dateFormat(new Date(), 'yyyy-MM')
      this.search()
    },
    methods: {
      search () {
        console.log(this.searchForm)
        this.loading = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;
  }

  .title {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    background-image: -webkit-linear-gradient(left, #242424, #3A5FCD);
  }

  .chart-top, .chart-bottom {
    height: 250px;
  }

  .table-title {
    margin-bottom: 10px;
    text-align: center;
  }
</style>