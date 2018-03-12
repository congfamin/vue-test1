<template>
  <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div class="detail-wrapper">
      <el-row :gutter="20">
        <el-col>
          <el-card>
            <el-form :inline="true">
              <el-form-item>
                <el-button type="warning" icon="arrow-left" size="small" @click.prevent="closeDetail">返回列表</el-button>
              </el-form-item>
              <el-form-item>
                <h4>详细信息：[ {{ dmPoints.name }} ]</h4>
              </el-form-item>
              <el-form-item label="日期：" v-if="routerName == '实时用电数据'||routerName == '日用电数据'">
                <el-date-picker
                  v-model="dateForm.date"
                  size="small"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  @change="dateFilter">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="日期：" v-if="routerName == '月用电数据'">
                <el-date-picker
                  v-model="monthForm.month"
                  size="small"
                  align="right"
                  type="month"
                  placeholder="选择月"
                  @change="monthFilter">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="日期：" v-if="routerName == '年用电数据'">
                <el-date-picker
                  v-model="yearForm.year"
                  size="small"
                  type="year"
                  format="yyyy"
                  align="right"
                  placeholder="选择年份"
                  :editable="false"
                  :clearable="false"
                  :picker-options="yearPickerOptions"
                  @change="yearFilter">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="负荷" name="负荷">
                <div class="chart" v-if="activeName == '负荷'">
                  <Echarts :options="loadOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>最大负荷</th>
                      <td>44.2 (kW)</td>
                      <th>发生时间</th>
                      <td>10-16 10:00</td>
                    </tr>
                    <tr>
                      <th>最小负荷</th>
                      <td>2.3 (kW)</td>
                      <th>发生时间</th>
                      <td>10-16 02:15</td>
                    </tr>
                    <tr>
                      <th>平均负荷</th>
                      <td>17.99 (kW)</td>
                      <th>峰谷差</th>
                      <td>41.9 (kW)</td>
                    </tr>
                    <tr>
                      <th>峰谷差率</th>
                      <td>94.78 %</td>
                      <th>负荷率</th>
                      <td>40.69 %</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="电量" name="电量">
                <div class="chart" v-if="activeName == '电量'">
                  <Echarts :options="elecOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>总电量</th>
                      <td colspan="3">192 (kWh)</td>
                    </tr>
                    <tr>
                      <th>峰电量</th>
                      <td>- (kWh)</td>
                      <th>平电量</th>
                      <td>- (kWh)</td>
                    </tr>
                    <tr>
                      <th>谷电量</th>
                      <td>- (kWh)</td>
                      <th>尖电量</th>
                      <td>- (kWh)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="示数" name="示数" v-if="routerName != '年用电数据'">
                <el-table :data="displayData" border>
                  <el-table-column prop="id" label="序号" align="center"></el-table-column>
                  <el-table-column prop="date" label="日期" align="center"></el-table-column>
                  <el-table-column prop="display" label="示数" align="center">
                    <el-table-column prop="Pactive" label="正向有功" align="center"></el-table-column>
                    <el-table-column prop="Ractive" label="反向有功" align="center"></el-table-column>
                    <el-table-column prop="PRpower" label="正向无功" align="center"></el-table-column>
                    <el-table-column prop="Rreactive" label="反向无功" align="center"></el-table-column>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="电压" name="电压" v-if="routerName != '年用电数据'">
                <div class="chart" v-if="activeName == '电压'">
                  <Echarts :options="volOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>U相最高电压</th>
                      <td>239.7(V) (10-16 02:15)</td>
                      <th>U相最低电压</th>
                      <td>233.2(V) (10-16 10:30)</td>
                    </tr>
                    <tr>
                      <th>V相最高电压</th>
                      <td>240.5(V) (10-16 11:15)</td>
                      <th>V相最低电压</th>
                      <td>234.7(V) (10-16 06:30)</td>
                    </tr>
                    <tr>
                      <th>W相最高电压</th>
                      <td>243.9(V) (10-16 06:30)</td>
                      <th>W相最低电压</th>
                      <td>236.4(V) (10-16 08:00)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="电流" name="电流" v-if="routerName != '年用电数据'">
                <div class="chart" v-if="activeName == '电流'">
                  <Echarts :options="curOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>U相最高电流</th>
                      <td>239.7(V) (10-16 02:15)</td>
                      <th>U相最低电流</th>
                      <td>233.2(V) (10-16 10:30)</td>
                    </tr>
                    <tr>
                      <th>V相最高电流</th>
                      <td>240.5(V) (10-16 11:15)</td>
                      <th>V相最低电流</th>
                      <td>234.7(V) (10-16 06:30)</td>
                    </tr>
                    <tr>
                      <th>W相最高电流</th>
                      <td>243.9(V) (10-16 06:30)</td>
                      <th>W相最低电流</th>
                      <td>236.4(V) (10-16 08:00)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="功率因数" name="功率因数" v-if="routerName != '年用电数据'">
                <div class="chart" v-if="activeName == '功率因数'">
                  <Echarts :options="PfactorOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>U相最高功率因数</th>
                      <td>100(%) (10-16 00:15)</td>
                      <th>U相最低功率因数</th>
                      <td>64.7(%) (10-16 07:30)</td>
                    </tr>
                    <tr>
                      <th>V相最高功率因数</th>
                      <td>100(%) (10-16 00:00)</td>
                      <th>V相最低功率因数</th>
                      <td>68.9(%) (10-16 09:15)</td>
                    </tr>
                    <tr>
                      <th>W相最高功率因数</th>
                      <td>100(%) (10-16 04:00)</td>
                      <th>W相最低功率因数</th>
                      <td>70.2(%) (10-16 07:30)</td>
                    </tr>
                    <tr>
                      <th>总最高功率因数</th>
                      <td>100(%) (10-16 00:00)</td>
                      <th>总最低功率因数</th>
                      <td>74(%) (10-16 07:30)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="谐波" name="谐波" v-if="routerName == '日用电数据'||routerName == '实时电数据'">
                暂时保留
              </el-tab-pane>
              <el-tab-pane label="温度" name="温度" v-if="routerName == '日用电数据'||routerName == '实时电数据'">
                <div class="chart" v-if="activeName == '温度'">
                  <Echarts :options="tempOptions" ref="echarts" :needResize="true"></Echarts>
                </div>
                <div class="table">
                  <table>
                    <tbody>
                    <tr>
                      <th>U相最高温度</th>
                      <td>-</td>
                      <th>U相最低温度</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>V相最高温度</th>
                      <td>-</td>
                      <th>V相最低温度</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>W相最高温度</th>
                      <td>-</td>
                      <th>W相最低温度</th>
                      <td>-</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { dateFormat, defaultDate } from 'utils'
  import Echarts from 'base/Echarts/Echarts'

  export default {
    props: ['fatherName', 'routerName'],
    components: {
      Echarts
    },
    data () {
      return {
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
        },
        yearPickerOptions: {
          disabledDate (time) {
            let date = new Date()
            let year = date.getFullYear()
            return time.getFullYear() > year
          }
        },
        dateForm: {
          date: ''
        },
        monthForm: {
          month: ''
        },
        yearForm: {
          year: ''
        },
        name: '',
        activeName: '负荷',
        displayData: [
          {
            id: '1',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '2',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '3',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '4',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '5',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '6',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '7',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '8',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '9',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '10',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          },
          {
            id: '11',
            date: '2017-10-16 00:00',
            Pactive: '2559.92',
            Ractive: '0',
            PRpower: '494.01',
            Rreactive: '25.49'
          }
        ],
        loadOptions: {
          grid: {
            left: '10%',
            top: '10%',
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
                name: '2017年10月16日',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#333'
                }
              }
            ]
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
            name: '单位:(kW)',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#333'
            },
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
              formatter: '{value}'
            },
          },
          series: [
            {
              name: '2017年10月16日',
              type: 'line',
              smooth: true,
              data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 34, 90, 100, 105,
                100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 230, 243, 240, 227],
              itemStyle: {
                normal: {
                  // color:'#00E9FF',
                  lineStyle: {
                    width: '3'
                  },
                }
              }
            }
          ]
        },
        elecOptions: {
          grid: {
            left: '10%',
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
                name: '2017年10月16日',
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
            left: '87%',
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
            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
              '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
          },
          yAxis: {
            name: '单位:(kWh)',
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
              name: '2017年10月16日',
              type: 'bar',
              data: [30, 17, 15, 30, 30, 56, 38, 35, 17, 15, 32, 23, 56, 38, 95,
                87, 15, 2, 33, 56, 38, 30, 30, 56, 8],
              itemStyle: {
                normal: {
                  color: '#0090FF',
                  lineStyle: {
                    color: '#0090FF',
                    width: '3',
                  }
                }
              },
            }
          ]
        },
        volOptions: {
          grid: {
            left: '10%',
            top: '10%',
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
                name: '2017年10月16日',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#333'
                }
              }
            ]
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
            name: '单位:(V)',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#333'
            },
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
              formatter: '{value}'
            },
          },
          series: [
            {
              name: '2017年10月16日',
              type: 'line',
              smooth: true,
              data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 34, 90, 100, 105,
                100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 230, 243, 240, 227],
              itemStyle: {
                normal: {
                  // color: '#8E388E',
                  lineStyle: {
                    // color: '#8E388E',
                    width: '3'
                  }
                }
              }
            }
          ]
        },
        curOptions: {
          grid: {
            left: '10%',
            top: '10%',
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
                name: '2017年10月16日',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#333'
                }
              }
            ]
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
            name: '单位:(A)',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#333'
            },
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
              formatter: '{value}'
            },
          },
          series: [
            {
              name: '2017年10月16日',
              type: 'line',
              smooth: true,
              data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 34, 90, 100, 105,
                100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 230, 243, 240, 227],
              itemStyle: {
                normal: {
                  // color: '#CD2626',
                  lineStyle: {
                    // color: '#CD2626',
                    width: '3'
                  },
                }
              }
            }
          ]
        },
        PfactorOptions: {
          grid: {
            left: '10%',
            top: '10%',
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
                name: '2017年10月16日',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#333'
                }
              }
            ]
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
            name: '单位:(%)',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#333'
            },
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
              formatter: '{value}'
            },
          },
          series: [
            {
              name: '2017年10月16日',
              type: 'line',
              smooth: true,
              data: [24, 21, 22, 24, 19, 20, 24, 22, 26, 21, 18, 17, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 25, 20, 34, 90, 100, 105,
                100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 230, 243, 240, 227],
              itemStyle: {
                normal: {
                  // color:'#3A5FCD',
                  lineStyle: {
                    // color:'#3A5FCD',
                    width: '3'
                  },
                }
              }
            }
          ]
        },
        tempOptions: {
          grid: {
            left: '10%',
            top: '10%',
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
                name: '2017年10月16日',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#333'
                }
              }
            ]
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
            name: '单位:(℃)',
            nameTextStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#333'
            },
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
              formatter: '{value}'
            },
          },
          series: [
            {
              name: '2017年10月16日',
              type: 'line',
              smooth: true,
              data: [14, 15, 16, 17, 15, 14, 15, 22, 23, 21, 22, 21, 20, 21, 20, 21, 22, 19, 16, 15, 18, 19, 24, 20, 17, 19, 24, 25,
                22, 21, 17, 18, 20, 17, 18, 19, 20, 20, 23, 21, 20, 21, 22, 21, 20, 25, 21, 20, 23, 20, 22],
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
                  }
                }
              }
            }
          ]
        }
      }
    },
    created () {
      if (this.routerName == '实时用电数据') {
        this.dateForm.date = dateFormat(new Date(), 'yyyy-MM-dd')
      }

      if (this.routerName == '日用电数据') {
        let yesterDay = new Date().getTime() - 3600 * 1000 * 24
        this.dateForm.date = dateFormat(new Date(yesterDay), 'yyyy-MM-dd')
      }

      if (this.routerName == '月用电数据') {
        let lastMonth = new Date().getTime() - 3600 * 1000 * 24 * 30
        this.monthForm.month = dateFormat(new Date(lastMonth), 'yyyy-MM')
      }

      if (this.routerName == '年用电数据') {
        let nowYear = new Date().getTime()
        this.yearForm.year = dateFormat(new Date(nowYear), 'yyyy')
      }
      this.search()
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'dmPoints'
      ])
    },
    methods: {
      handleClick (tab, event) {
        console.log(this.activeName)
      },
      closeDetail () {
        this.$store.dispatch('closeDetail')
      },
      dateFilter (val) {
        this.dateForm.date = val
      },
      monthFilter (val) {
        console.log(val)
        this.monthForm.month = val
      },
      yearFilter (val) {
        console.log(val)
        this.yearForm.year = val
      },
      search () {
        if (this.routerName == '实时用电数据' || this.routerName == '日用电数据') {
          console.log(this.dateForm.date)
        }

        if (this.routerName == '月用电数据') {
          console.log(this.monthForm.month)
        }

        if (this.routerName == '年用电数据') {
          console.log(this.yearForm.year)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart {
    width: 100%;
    height: 350px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
  }

  .table {
    width: 100%;
    margin: 0 auto;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-tabs {
    .el-tabs__nav {
      float: right;
    }
  }

  table {
    width: 100%;
    text-align: center;
  }

  tr, td {
    padding: 10px;
    border: 1px solid #ccc;
  }

  th {
    background-color: rgb(238, 241, 246);
  }

  tr:hover {
    background-color: rgb(238, 241, 246);
  }
</style>
