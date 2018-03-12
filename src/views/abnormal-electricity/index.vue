<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card class="box-card cardOne" style="margin-bottom:20px">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="选择查询类型：">
              <el-select v-model="queryType" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择异常类型：">
              <el-select v-model="excepType" filterable placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" class="search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <el-table :data="tableData" height="550" style="width: 100%">
            <el-table-column type="expand">
              <!-- <template>
                  <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="推荐处理方式：">

                      </el-form-item>
                  </el-form>
              </template> -->
            </el-table-column>
            <el-table-column prop="num" label="序号" width="100" align="center"></el-table-column>
            <el-table-column label="名称" fit align="center">
              <template scope="scope">
                <span style="color:red">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="异常事件数" fit align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          num: '1',
          name: '电压越限异常',
          count: '1',
          mang: ''
        }],
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        date: '',
        options1: [{
          value: '选项1',
          label: '按事件'
        }, {
          value: '选项2',
          label: '按分路'
        }],
        options2: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '电压越限异常'
        }, {
          value: '选项3',
          label: '电压越门限异常'
        }, {
          value: '选项4',
          label: '电压断相故障'
        }, {
          value: '选项5',
          label: '电压三相不平衡'
        }, {
          value: '选项6',
          label: '电流三相不平衡'
        }, {
          value: '选项7',
          label: '负荷超载'
        }, {
          value: '选项10',
          label: '谐波越限警告'
        }, {
          value: '选项11',
          label: '温度警告'
        }, {
          value: '选项12',
          label: '最大需量警告'
        }, {
          value: '选项15',
          label: '反向电量'
        }],
        queryType: '按事件',
        excepType: '全部'
      }
    },
    methods: {
      handleCommand (command) {
        this.$message('click on item ' + command)
      },
      search () {
        console.log(1)
      },
      open () {
        this.$notify.error({
          title: '异常报警',
          message: '监测到异常信息，请及时去异常用电模块查看详情！',
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>