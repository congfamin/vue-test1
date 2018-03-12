<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="elCol-top">
      <el-card class="box-card date-picker-card cardOne">
        <div class="date-picker-container">
          <el-form :model="searchForm" :inline="true" class="demo-form-inline">
            <el-form-item label="监测点：">
              <el-select v-model="searchForm.monitorPoint" placeholder="请选择" @change="monitorPointFilter">
                <el-option
                  v-for="item in monitoringPoint"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择对比监测点：">
              <el-checkbox v-model="checkbox1" label="对比监测点1：" @change="empty1"></el-checkbox>
              <el-select v-model="searchForm.monitorPoint1" placeholder="请选择" :disabled="!checkbox1"
                         @change="monitorPointFilter1">
                <el-option
                  v-for="item in monitoringPoint"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkbox2" label="对比监测点2：" @change="empty2"></el-checkbox>
              <el-select v-model="searchForm.monitorPoint2" placeholder="请选择" :disabled="!checkbox2"
                         @change="monitorPointFilter2">
                <el-option
                  v-for="item in monitoringPoint"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间点：">
              <el-date-picker
                v-model="searchForm.date"
                type="date"
                placeholder="选择日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="date-picker"
                @change="dateFilter">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请选择对比时间点：">
              <el-checkbox v-model="checkbox3" label="对比时间点1：" @change="empty3"></el-checkbox>
              <el-date-picker
                v-model="searchForm.date1"
                type="date"
                placeholder="选择日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="date-picker"
                :disabled="!checkbox3"
                @change="dateFilter1">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkbox4" label="对比时间点2：" @change="empty4"></el-checkbox>
              <el-date-picker
                v-model="searchForm.date2"
                type="date"
                placeholder="选择日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="date-picker"
                :disabled="!checkbox4"
                @change="dateFilter2">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkbox5" label="对比时间点3：" @change="empty5"></el-checkbox>
              <el-date-picker
                v-model="searchForm.date3"
                type="date"
                placeholder="选择日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="date-picker"
                :disabled="!checkbox5"
                @change="dateFilter3">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkbox6" label="对比时间点4：" @change="empty6"></el-checkbox>
              <el-date-picker
                v-model="searchForm.date4"
                type="date"
                placeholder="选择日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                class="date-picker"
                :disabled="!checkbox6"
                @change="dateFilter4">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" class="btn" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="elCol-bottom">
      <el-card>
        <el-tabs class="tabs" v-model="activeName">
          <el-tab-pane label="负荷" name="负荷">
            <div v-if="activeName=='负荷'">
              <div class="chart">
                <keep-alive>
                  <Echarts :options="optionsLoad" :needResize="true"></Echarts>
                </keep-alive>
              </div>
              <div class="table">
                <table>
                  <tbody>
                  <tr>
                    <th class="thead" rowspan="2">日期</th>
                    <th class="thead" colspan="2" v-for="(item, key) in LoadData[0].data" :key="key">{{item.name}}</th>
                  </tr>
                  <tr>
                    <template v-for="item in LoadData[0].data">
                      <th class="thead">最大值</th>
                      <th class="thead">发生时间</th>
                    </template>
                  </tr>
                  <tr class="tr" v-for="(item, key) in LoadData" :key="key">
                    <td>{{ item.date }}</td>
                    <template v-for="item1 in item.data">
                      <td>{{ item1.max ? item1.max : '-' }}</td>
                      <td>{{ item1.time }}</td>
                    </template>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="电量" name="电量">
            <div v-if="activeName=='电量'">
              <div class="chart">
                <keep-alive>
                  <Echarts :options="optionsElec" :needResize="true"></Echarts>
                </keep-alive>
              </div>
              <div class="table">
                <table>
                  <tbody>
                  <tr>
                    <th class="thead">日期</th>
                    <th class="thead" v-for="(item, key) in elecData[0].data" :key="key">{{ item.name }}</th>
                  </tr>
                  <tr class="tr" v-for="(item, key) in elecData" :key="key">
                    <td>{{ item.date }}</td>
                    <td v-for="(item1,key) in item.data" :key="key">{{ item1.elec ? item1.elec : '-' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getShuntElctricityFive } from 'api/echarts'
  import { dateFormat, defaultDate } from 'utils'
  import { MessageBox } from 'element-ui'
  import Echarts from 'base/Echarts/Echarts'
  import seTableContrast from '../table/ShuntElectricity/seTableContrast'

  export default {
    components: {
      seTableContrast,
      Echarts
    },
    data () {
      return {
        activeName: '负荷',
        searchForm: {
          monitorPoint: '0',
          monitorPoint1: '',
          monitorPoint2: '',
          date: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
        },
        LoadData: [{
          date: '2017-08-16',
          data: [{
            name: '监测点1',
            max: '46,15',
            time: '08-16 12:00'
          }, {
            name: '监测点2',
            max: '45.91',
            time: '08-16 12:00'
          }, {
            name: '监测点3',
            max: '24.91',
            time: '08-16 12:00'
          }]
        }, {
          date: '2017-08-15',
          data: [{
            name: '监测点1',
            max: '44.91',
            time: '08-15 16:00'
          }, {
            name: '监测点2',
            max: '41.98',
            time: '08-15 16:00'
          }, {
            name: '监测点3',
            max: '38.57',
            time: '08-15 16:00'
          }]
        }, {
          date: '2017-08-14',
          data: [{
            name: '监测点1',
            max: '28.91',
            time: '08-14 16:00'
          }, {
            name: '监测点2',
            max: '35.42',
            time: '08-14 16:00'
          }, {
            name: '监测点3',
            max: '32.27',
            time: '08-14 16:00'
          }]
        }, {
          date: '2017-08-13',
          data: [{
            name: '监测点1',
            max: '29.91',
            time: '08-13 14:00'
          }, {
            name: '监测点2',
            max: '41.98',
            time: '08-13 14:00'
          }, {
            name: '监测点3',
            max: '38.57',
            time: '08-13 14:00'
          }]
        }
        ],
        elecData: [{
          date: '2017-08-16',
          data: [{
            name: '监测点1',
            elec: '660'
          }, {
            name: '监测点2',
            elec: '175'
          }, {
            name: '监测点2',
            elec: '142'
          }]
        }, {
          date: '2017-08-15',
          data: [{
            name: '监测点1',
            elec: '1258'
          }, {
            name: '监测点2',
            elec: '155'
          }, {
            name: '监测点3',
            elec: '196'
          }]
        }, {
          date: '2017-08-14',
          data: [{
            name: '监测点1',
            elec: '889'
          }, {
            name: '监测点2',
            elec: '144'
          }, {
            name: '监测点3',
            elec: '201'
          }]
        }, {
          date: '2017-08-13',
          data: [{
            name: '监测点1',
            elec: '895'
          }, {
            name: '监测点2',
            elec: '123'
          }, {
            name: '监测点3',
            elec: '98'
          }]
        }],
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        optionsElec: null,
        optionsLoad: null
      }
    },
    computed: {
      ...mapGetters([
        'monitoringPoint'
      ])
    },
    created () {
      let yesterDay = new Date().getTime() - 3600 * 1000 * 24
      this.searchForm.date = dateFormat(new Date(yesterDay), 'yyyy-MM-dd')
      this.search()
    },
    methods: {
      monitorPointFilter (val) {
        this.searchForm.monitorPoint = val
        if (this.searchForm.monitorPoint == this.searchForm.monitorPoint1 || this.searchForm.monitorPoint == this.searchForm.monitorPoint2) {
          MessageBox({
            message: '该监测点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.monitorPoint = ''
        }
      },
      monitorPointFilter1 (val) {
        this.searchForm.monitorPoint1 = val
        if (this.searchForm.monitorPoint1 == this.searchForm.monitorPoint || this.searchForm.monitorPoint1 == this.searchForm.monitorPoint2 && this.searchForm.monitorPoint1 != '') {
          MessageBox({
            message: '该监测点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.monitorPoint1 = ''
        }
      },
      monitorPointFilter2 (val) {
        this.searchForm.monitorPoint2 = val
        if (this.searchForm.monitorPoint2 == this.searchForm.monitorPoint || this.searchForm.monitorPoint2 == this.searchForm.monitorPoint1 && this.searchForm.monitorPoint2 != '') {
          MessageBox({
            message: '该监测点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.monitorPoint2 = ''
        }
      },
      dateFilter (val) {
        this.searchForm.date = val
        if (this.searchForm.date == this.searchForm.date1 || this.searchForm.date == this.searchForm.date2 || this.searchForm.date == this.searchForm.date3 || this.searchForm.date == this.searchForm.date4) {
          MessageBox({
            message: '该时间点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.date = ''
        }
      },
      dateFilter1 (val) {
        this.searchForm.date1 = val
        if (this.searchForm.date1 == this.searchForm.date || this.searchForm.date1 == this.searchForm.date2 || this.searchForm.date1 == this.searchForm.date3 || this.searchForm.date1 == this.searchForm.date4) {
          MessageBox({
            message: '该时间点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.date1 = ''
        }
      },
      dateFilter2 (val) {
        this.searchForm.date2 = val
        if (this.searchForm.date2 == this.searchForm.date || this.searchForm.date2 == this.searchForm.date1 || this.searchForm.date2 == this.searchForm.date3 || this.searchForm.date2 == this.searchForm.date4) {
          MessageBox({
            message: '该时间点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.date2 = ''
        }
      },
      dateFilter3 (val) {
        this.searchForm.date3 = val
        if (this.searchForm.date3 == this.searchForm.date || this.searchForm.date3 == this.searchForm.date1 || this.searchForm.date3 == this.searchForm.date2 || this.searchForm.date3 == this.searchForm.date4) {
          MessageBox({
            message: '该时间点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.date3 = ''
        }
      },
      dateFilter4 (val) {
        this.searchForm.date4 = val
        if (this.searchForm.date4 == this.searchForm.date || this.searchForm.date4 == this.searchForm.date1 || this.searchForm.date4 == this.searchForm.date2 || this.searchForm.date4 == this.searchForm.date3) {
          MessageBox({
            message: '该时间点已选择',
            title: '提示',
            type: 'error',
            duration: 5 * 1000
          })
          this.searchForm.date4 = ''
        }
      },
      empty1 () {
        if (this.checkbox1 == false)
        this.searchForm.monitorPoint1 = ''
      },
      empty2 () {
        if (this.checkbox2 == false)
        this.searchForm.monitorPoint2 = ''
      },
      empty3 () {
        if (this.checkbox3 == false)
        this.searchForm.date1 = ''
      },
      empty4 () {
        if (this.checkbox4 == false)
        this.searchForm.date2 = ''
      },
      empty5 () {
        if (this.checkbox5 == false)
        this.searchForm.date3 = ''
      },
      empty6 () {
        if (this.checkbox6 == false)
        this.searchForm.date4 = ''
      },
      search () {
        getShuntElctricityFive(this.searchForm).then(res => {
          console.log(res)
          console.log(this.searchForm)
          this.optionsLoad = {
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
              data: ['总线'],
              textStyle: {
                color: '#444',//文字颜色
                fontStyle: 'normal',//字体风格,'normal','italic','oblique'
                fontWeight: 'normal',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontFamily: 'sans-serif',//字体系列
                fontSize: 15//字体大小
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
                name: '总线',
                type: 'line',
                // 曲线平滑
                smooth: true,
                data: [22, 25, 26, 20, 18, 20, 19, 25, 23, 20, 18, 15, 18, 19, 17, 20, 22, 18, 15, 15, 17, 18, 25, 20, 34, 90, 100, 105,
                  100, 110, 130, 115, 160, 175, 180, 193, 200, 206, 213, 215, 210, 215, 227, 219, 209, 215, 210, 220, 232, 243, 240, 227,
                  237, 221, 243, 231, 225, 221, 214, 230, 213, 231, 226, 244, 242, 239, 236, 214, 206, 203, 197, 200, 189, 194, 181, 174,
                  175, 164, 155, 166, 154, 160, 142, 136, 124, 119, 113, 97, 84, 85, 80, 76, 54, 43, 27, 24],
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
            this.optionsElec = {
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
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .btn {
    width: 100%;
  }

  .time-span {
    color: #696969;
  }

  .date-picker-card {
    margin-bottom: 10px;
  }

  .tabs {
    border-top: 2px solid #8DB6CD;
  }

  .chart {
    width: 100%;
    height: 250px;
  }

  table {
    width: 100%;
    text-align: center;
  }

  tr, th, td {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .thead {
    background-color: rgb(238, 241, 246);
  }

  .tr:hover {
    background-color: rgb(238, 241, 246);
  }
</style>
