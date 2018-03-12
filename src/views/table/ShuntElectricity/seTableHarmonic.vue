<template>
  <el-table :data="tableData3" max-height="650" border style="width:100%"
            :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column prop="num" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共9个）" width="180" fit align="center"></el-table-column>
    <el-table-column prop="date" label="日期" width="180" fit align="center"></el-table-column>
    <el-table-column prop="count" label="谐波次数" width="100" fit align="center"></el-table-column>
    <el-table-column label="电压占比(%)" align="center">
      <el-table-column prop="Up" label="U相" sortable fit align="center"></el-table-column>
      <el-table-column prop="Vp" label="V相" sortable fit align="center"></el-table-column>
      <el-table-column prop="Wp" label="W相" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column label="电流最大值(A)" align="center">
      <el-table-column prop="maxU" label="U相" sortable fit align="center"></el-table-column>
      <el-table-column prop="maxV" label="V相" sortable fit align="center"></el-table-column>
      <el-table-column prop="maxW" label="W相" sortable fit align="center"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData3: [{
          num: '1',
          name: '监测点1',
          count: '总',
          Up: '-',
          Vp: '-',
          Wp: '-',
          maxU: '-',
          maxV: '-',
          maxW: '-',
          date: '2017-08-22'
        }, {
          num: '2',
          name: '监测点2',
          count: '总',
          Up: '3.3',
          Vp: '3.4',
          Wp: '3.4',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '3',
          name: '监测点3',
          count: '总',
          Up: '3.4',
          Vp: '3.4',
          Wp: '3.3',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '4',
          name: '监测点4',
          count: '总',
          Up: '3.4',
          Vp: '3.4',
          Wp: '3.4',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '5',
          name: '监测点5',
          count: '总',
          Up: '3.4',
          Vp: '3.4',
          Wp: '3.3',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '6',
          name: '监测点6',
          count: '总',
          Up: '-',
          Vp: '-',
          Wp: '-',
          maxU: '-',
          maxV: '-',
          maxW: '-',
          date: '2017-08-22'
        }, {
          num: '7',
          name: '监测点7',
          count: '总',
          Up: '3.5',
          Vp: '3.4',
          Wp: '3.3',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '8',
          name: '监测点8',
          count: '总',
          Up: '3.4',
          Vp: '3.4',
          Wp: '3.4',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }, {
          num: '9',
          name: '监测点9',
          count: '总',
          Up: '3.3',
          Vp: '3.4',
          Wp: '3.3',
          maxU: '0',
          maxV: '0',
          maxW: '0',
          date: '2017-08-22'
        }]
      }
    }
  }
</script>