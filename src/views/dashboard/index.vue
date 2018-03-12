<template>
  <div class="dashboard">
    <el-row :gutter="20" class="top">
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="box basic">
          <i class="iconfont icon-gaikuangbaobiao icon"></i>
          <div class="box-title"><h3>基本概况</h3></div>
          <div class="content">
            <div>
              <div>主变台数</div>
              <div>主变容量</div>
              <div>监测分路个数</div>
            </div>
            <div class="right">
              <div>4 台</div>
              <div>1420 kVA</div>
              <div>37 个</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="box Electricity">
          <i class="iconfont icon-dian1 icon"></i>
          <div class="box-title"><h3>电量概况</h3></div>
          <div class="content">
            <div>
              <div>本月累计电量</div>
              <div>上月总电量</div>
              <div>前月总电量</div>
            </div>
            <div class="right">
              <div>63317 kWh</div>
              <div>14.27 万kWh</div>
              <div>82028 kWh</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="box load">
          <i class="iconfont icon-dian1 icon"></i>
          <div class="box-title"><h3>负荷概况</h3></div>
          <div class="content">
            <div>
              <div>本月最大负荷</div>
              <div>本年最大负荷</div>
              <div>本月最大需求</div>
            </div>
            <div class="right">
              <div>580.96 kW</div>
              <div>707.4 kW</div>
              <div>396 kW</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <el-card class="card-chart card-day">
          <div class="title">
            <i class="iconfont icon-tubiao" style="color:#6495ED;font-size:20px"></i>
            <span>日负荷折线图</span>
          </div>
          <div class="chart-day">
            <Echarts :options="optionsDay" ref="echartsDate" :needResize="true"></Echarts>
          </div>
          <table class="tb">
            <tbody>
            <tr>
              <td>昨日最大负荷</td>
              <td>254.96 kW</td>
              <td>时间</td>
              <td>10-10 10:45</td>
              <td>今日最大负荷</td>
              <td>147.89 kW</td>
              <td>时间</td>
              <td>10-11 10:00</td>
            </tr>
            </tbody>
          </table>
          <el-button class="btn-day" type="primary" size="small" @click="dumpDayLoad">View more >></el-button>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-card class="card-chart card-per">
          <div class="title">
            <i class="iconfont icon-tubiao1" style="color:#8A2BE2;font-size:20px"></i>
            <span>占比分析</span>
          </div>
          <div class="chart-per">
            <Echarts :options="optionsPer" :needResize="true"></Echarts>
          </div>
          <el-button class="btn-per" type="primary" size="small" @click="dumpPerAnalysis">View more >></el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card class="card-chart card-month">
          <div class="title">
            <i class="iconfont icon-tubiao" style="color:#9932CC;font-size:20px"></i>
            <span>月负荷柱状图</span>
          </div>
          <div class="chart-box">
            <div class="chart-month">
              <Echarts :options="optionsMonth" ref="echartsMonth" :needResize="true"></Echarts>
            </div>
            <ul>
              <li>本月累计电量</li>
              <li>12523 kWh</li>
              <li><i class="iconfont icon-shijian" style="color:#9932CC;font-size:20px"></i> 截止 2017-10-10</li>
              <li>同时段累计对比</li>
              <li><i class="iconfont icon-xiajiangjiantou" style="color:#9932CC;font-size:20px"></i> 47%</li>
              <li>
                <el-button class="btn-month" type="primary" size="small" @click="dumpMonthLoad">View more >></el-button>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getDashboard } from 'api/echarts'
  import { mapGetters } from 'vuex'
  import Echarts from 'base/Echarts/Echarts'

  export default {
    name: 'dashboard',
    components: {
      Echarts
    },
    data () {
      return {
        optionsDay: null,
        optionsMonth: null,
        optionsPer: null
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
      ])
    },
    created () {
      // 用以获取当前路由路径（解析为绝对路径）
      // console.log(this.$route.path);
      getDashboard().then(res => {
        console.log(res.data.data)
        // 用变量data去接收获取的数据
        let data = res.data.data
        console.log(data[0])
        console.log(data)
        this.optionsPer = {
          // backgroundColor: '#fff',
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
              radius: [0, '40%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  position: 'inner',
                  // formatter: '{b}\n{d}%'
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: res.data.data
            },
            {
              name: '电量',
              type: 'pie',
              radius: ['55%', '70%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  formatter: '{b}\n{d}%',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                },
              },
              data: res.data.data1
            }
          ]
        },
          this.optionsDay = {
            grid: {
              left: '10%',
              top: '50px',
              containLabel: true,
              backgroundColor: '#CCC'
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              top: '1%',
              left: '5%',
              data: ['昨日', '今日'],
              textStyle: {
                color: '#444',//文字颜色
                fontStyle: 'normal',//字体风格,'normal','italic','oblique'
                fontWeight: 'normal',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontFamily: 'sans-serif',//字体系列
                fontSize: 15//字体大小
              },
            },
            toolbox: {
              show: true,
              top: '1%',
              left: '80%',
              feature: {
                // dataZoom: {
                //     yAxisIndex: 'none'
                // },
                // dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                // restore: {},
                // saveAsImage: {}
              },
              iconStyle: {
                normal: {
                  color: '#FFF'
                }
              },
            },
            xAxis: {
              type: 'category',
              splitLine: {show: true},
              axisLine: {show: true},
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#444',
                }
              },
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
                lineStyle: {
                  color: '#444',
                }
              },
              axisLabel: {
                formatter: '{value} kW'
              },
            },
            series: [
              {
                name: '昨日',
                type: 'line',
                smooth: true,//曲线平滑
                data: [22, 25, 26, 20, 18, 20, 19, 25, 23, 20, 18, 15, 18, 19, 17, 20, 22, 18, 15, 15, 17, 18, 25, 20, 34, 90, 100, 105,
                  100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 220, 232, 243, 240, 227,
                  237, 221, 243, 231, 225, 221, 214, 230, 213, 231, 226, 244, 242, 239, 236, 214, 206, 203, 197, 200, 189, 194, 181, 174,
                  175, 164, 155, 166, 154, 160, 142, 136, 124, 119, 113, 97, 84, 85, 80, 76, 54, 43, 27, 24],
                itemStyle: {
                  normal: {
                    color: 'rgba(2, 197, 233, 0.4)',
                    lineStyle: {
                      color: 'rgba(23, 107, 203, 0.4)'
                    },
                    areaStyle: {
                      color: 'rgba(135,206,250, 0.2)'
                    }
                  }
                },
                markLine: {
                  symbol: 'circle',
                }
              },
              {
                name: '今日',
                type: 'line',
                smooth: true,
                data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 32, 98, 99, 104,
                  100, 105, 138, 108, 155, 182, 188, 202, 196, 215, 220, 207, 211, 223, 227, 219, 200, 217, 201, 222, 246, 242, 229],
                itemStyle: {
                  normal: {
                    color: 'rgba(255,20,147, 0.4)',
                    lineStyle: {
                      color: 'rgba(128,0,128, 0.4)'
                    },
                    areaStyle: {
                      color: 'rgba(255,20,147, 0.2)'
                    }
                  }
                },
                markLine: {
                  symbol: 'circle',
                }
              }
            ]
          },
          this.optionsMonth = {
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
                  name: '上月电量',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#333'
                  }
                },
                {
                  name: '本月电量',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#333'
                  }
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
                  color: '#333'
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
                color: '#333'
              },
              type: 'value',
              nameLocation: 'end',
              nameGap: '10',
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#333'
                }
              },
              textStyle: {
                fontSize: 20,
                color: 'red'
              }
            },
            series: [
              {
                name: '上月电量',
                type: 'bar',
                data: [3095, 1787, 1015, 3002, 2330, 3056, 3038],
                itemStyle: {
                  normal: {
                    color: '#0090FF',
                    lineStyle: {
                      color: '#0090FF',
                      width: '3',
                    }
                  }
                },
              },
              {
                name: '本月电量',
                type: 'bar',
                data: [4375, 3136, 2547, 2428, 3837, 1601, 4500],
                itemStyle: {
                  normal: {
                    color: '#708090',
                    lineStyle: {
                      color: '#708090',
                      width: '3'
                    }
                  }
                }
              }
            ]
          }
      }).catch(error => {
        console.log('数据未获取')
      })
    },
    methods: {
      dumpDayLoad () {
        this.$router.push('/statistical-report/point/pointTwo')
      },
      dumpMonthLoad () {
        this.$router.push('/statistical-report/point/pointThree')
      },
      dumpPerAnalysis () {
        this.$router.push('/electricity-analysis/AnalysisThree')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    width: 100%;
    height: 100%;
    .top {
      color: #fff;
    }
    .basic {
      background-color: #3A5FCD;
    }
    .basic:hover {
      background-color: #0099FF;
    }
    .Electricity {
      background-color: #9932CC;
    }
    .Electricity:hover {
      background-color: #7D26CD;
    }
    .load {
      background-color: #DAA520;
    }
    .load:hover {
      background-color: #CD950C;
    }
    .box {
      position: relative;
      height: 125px;
      box-shadow: 1px 1px 4px #ccc;
      .icon {
        font-size: 60px;
        position: absolute;
        opacity: 0.4;
        top: 10px;
        right: 10px
      }
      .box-title {
        text-indent: 10px;
        padding: 5px;
      }
      .content {
        width: 90%;
        display: flex;
        align-items: center;
        padding: 5px;
        padding-left: 40px;
        .right {
          padding: 5px;
        }
      }
      .content > div {
        flex: 1;
      }
      .content div div {
        padding: 2px;
      }
    }
    .el-col {
      margin-bottom: 20px;
    }
    .chart-month, .chart-per {
      height: 300px;
    }
    .chart-day {
      height: 280px;
    }
    .chart-box {
      display: flex;
      .chart-month {
        width: 80%;
      }
      ul {
        list-style: none;
        width: 20%;
        li {
          font-weight: bold;
          padding: 10px;
          color: #104E8B;
        }
        li:nth-child(2), li:nth-child(5) {
          color: #3CB371;
        }
      }
    }
    .button-per {
      text-align: right;
    }
    .tb {
      font-weight: bold;
      width: 100%;
      text-align: center;
      color: #104E8B;
      td {
        line-height: 20px;
      }
      td:nth-child(even) {
        color: #3CB371
      }
    }
    .card-chart {
      background-color: #eee;
    }
    .card-day {
      position: relative;
      .btn-day {
        position: absolute;
        top: 2px;
        right: 2px;
        letter-spacing: 1px;
      }
    }
    .card-per {
      position: relative;
      .btn-per {
        position: absolute;
        top: 2px;
        right: 2px;
        letter-spacing: 1px;
      }
    }
    .title {
      width: 100%;
      padding: 5px;
      font-size: 14px;
      font-weight: bold;
      text-indent: 2px;
      letter-spacing: 1px;
    }
  }
</style>