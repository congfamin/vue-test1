<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共9个）" width="140" sortable fit align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="功率因素(%)" align="center">
      <el-table-column prop="sum" label="总" sortable fit align="center"></el-table-column>
      <el-table-column prop="u" label="U相" sortable fit align="center"></el-table-column>
      <el-table-column prop="u" label="V相" sortable fit align="center"></el-table-column>
      <el-table-column prop="w" label="W相" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column prop="date" label="抄表时刻" align="center" sortable fit></el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          id: '1',
          name: '监测点1',
          sum: '94.6',
          u: '94.6',
          v: '96.3',
          w: '92.7',
          date: '2017-09-14 09:00'
        }, {
          id: '2',
          name: '监测点2',
          sum: '90.3',
          u: '99.9',
          v: '72.8',
          w: '66.9',
          date: '2017-09-14 09:00'
        }, {
          id: '3',
          name: '监测点3',
          sum: '86',
          u: '-',
          v: '-',
          w: '-',
          date: '2017-09-14 09:00'
        }, {
          id: '4',
          name: '监测点4',
          sum: '94.4',
          u: '-',
          v: '-',
          w: '-',
          date: '2017-09-14 09:00'
        }, {
          id: '5',
          name: '监测点5',
          sum: '92.5',
          u: '94.4',
          v: '92.8',
          w: '90.4',
          date: '2017-09-14 09:00'
        }, {
          id: '6',
          name: '监测点6',
          sum: '99.8',
          u: '99.5',
          v: '99.7',
          w: '97.3',
          date: '2017-09-14 09:00'
        }, {
          id: '7',
          name: '监测点7',
          sum: '-',
          u: '-',
          v: '-',
          w: '-',
          date: '2017-09-14 09:00'
        }, {
          id: '8',
          name: '监测点8',
          sum: '99.9',
          u: '99.9',
          v: '99.9',
          w: '99.9',
          date: '2017-09-14 09:00'
        }, {
          id: '9',
          name: '监测点9',
          sum: '81.5',
          u: '86.3',
          v: '76.6',
          w: '79.6',
          date: '2017-09-14 09:00'
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