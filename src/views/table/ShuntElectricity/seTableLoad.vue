<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable width="180" align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="140" align="center"></el-table-column>
    <el-table-column label="负荷 (kW)" align="center">
      <el-table-column prop="sum" label="最大负荷" sortable fit align="center"></el-table-column>
      <el-table-column prop="min" label="最小负荷" sortable fit align="center"></el-table-column>
      <el-table-column prop="avg" label="平均负荷" sortable fit align="center"></el-table-column>
      <el-table-column prop="cl" label="峰谷差率" sortable fit align="center"></el-table-column>
      <el-table-column prop="fuhe" label="负荷率" sortable fit align="center"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [
          {
            id: 1,
            name: '监测点1',
            date: '2017-08-26',
            sum: 119.55,
            min: 14.85,
            avg: 59.65,
            cl: '87.57%',
            fuhe: '49.9%'
          }, {
            id: 2,
            name: '监测点2',
            date: '2017-08-26',
            sum: 44.1,
            min: 10.05,
            avg: 23.44,
            cl: '77.21%',
            fuhe: '53.15%'
          }, {
            id: 3,
            name: '监测点3',
            date: '2017-08-26',
            sum: 37.83,
            min: 8.42,
            avg: 16.42,
            cl: '77.73%',
            fuhe: '43.39%'
          }, {
            id: 4,
            name: '监测点4',
            date: '2017-08-26',
            sum: 27.04,
            min: 3.76,
            avg: 9.03,
            cl: '86.06%',
            fuhe: '33.41%'
          }, {
            id: 5,
            name: '监测点5',
            date: '2017-08-26',
            sum: 119.55,
            min: 14.85,
            avg: 59.65,
            cl: '87.57%',
            fuhe: '49.9%'
          }, {
            id: 6,
            name: '监测点6',
            date: '2017-08-26',
            sum: 119.55,
            min: 14.85,
            avg: 59.65,
            cl: '87.57%',
            fuhe: '49.9%'
          }, {
            id: 7,
            name: '监测点7',
            date: '2017-08-26',
            sum: 8.19,
            min: 0.79,
            avg: 4.13,
            cl: '90.33%',
            fuhe: '50.52%'
          }, {
            id: 8,
            name: '监测点8',
            date: '2017-08-26',
            sum: 8.19,
            min: 0.79,
            avg: 4.13,
            cl: '90.33%',
            fuhe: '50.52%'
          }, {
            id: 9,
            name: '监测点9',
            date: '2017-08-26',
            sum: 16.4,
            min: 2.58,
            avg: 5.35,
            cl: '84.25%',
            fuhe: '32.64%'
          }, {
            id: 10,
            name: '监测点10',
            date: '2017-08-26',
            sum: 6.23,
            min: 0.5,
            avg: 2.54,
            cl: '91.91%',
            fuhe: '40.8%'
          }
        ]
      }
    },
    methods: {
      showDetail (val) {
        this.$store.dispatch('showDetail', val)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .detailSpan {
    cursor: pointer;
    color: #3A5FCD;
  }
</style>