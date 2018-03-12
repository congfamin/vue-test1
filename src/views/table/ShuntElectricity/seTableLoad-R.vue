<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable width="180" align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="有功负荷(kW)" align="center">
      <el-table-column prop="sum" label="总" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pu" label="Pu" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pv" label="Pv" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pw" label="Pw" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column label="无功负荷(kvar)" align="center">
      <el-table-column prop="sum2" label="总" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pu" label="Qu" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pv" label="Qv" sortable fit align="center"></el-table-column>
      <el-table-column prop="Pw" label="Qw" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column prop="date" label="抄表时刻" align="center" sortable width="160"></el-table-column>
  </el-table>
</template>

<script>

  export default {
    data () {
      return {
        tableData: [{
          id: '1',
          name: '监测点1',
          sum: '21.61',
          Pu: '6.74',
          Pv: '8.14',
          Pw: '7.21',
          sum2: '1.99',
          date: '2017-09-14 08:15'
        }, {
          id: '2',
          name: '监测点2',
          sum: '16.35',
          Pu: '-',
          Pv: '-',
          Pw: '-',
          sum2: '-0.28',
          date: '2017-09-14 08:15'
        }, {
          id: '3',
          name: '监测点3',
          sum: '23.54',
          Pu: '-',
          Pv: '-',
          Pw: '-',
          sum2: '-1.05',
          date: '2017-09-14 08:15'
        }, {
          id: '4',
          name: '监测点4',
          sum: '2.56',
          Pu: '1.8',
          Pv: '0.12',
          Pw: '0.4',
          sum2: '0.1',
          date: '2017-09-14 08:15'
        }, {
          id: '5',
          name: '监测点5',
          sum: '0',
          Pu: '0',
          Pv: '0',
          Pw: '0',
          sum2: '-',
          date: '2017-09-14 08:15'
        }, {
          id: '6',
          name: '监测点6',
          sum: '0',
          Pu: '0',
          Pv: '0',
          Pw: '0',
          sum2: '-',
          date: '2017-09-14 08:15'
        }, {
          id: '7',
          name: '监测点7',
          sum: '-',
          Pu: '-',
          Pv: '-',
          Pw: '-',
          sum2: '-',
          date: '2017-09-14 08:15'
        }, {
          id: '8',
          name: '监测点8',
          sum: '5.25',
          Pu: '2.1',
          Pv: '1.57',
          Pw: '2.87',
          sum2: '2.98',
          date: '2017-09-14 08:15'
        }, {
          id: '9',
          name: '监测点9',
          sum: '5.84',
          Pu: '2.63',
          Pv: '1.51',
          Pw: '1.69',
          sum2: '-3.93',
          date: '2017-09-14 08:15'
        }]
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