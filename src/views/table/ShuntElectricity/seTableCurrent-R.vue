<template>
  <el-table :data="tableData" max-height="650" border style="width:100%"
            :default-sort="{prop: 'date', order: 'decrease'}" @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共14个）" sortable fit align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="电流(A)" align="center">
      <el-table-column prop="lu" label="lu" sortable fit align="center"></el-table-column>
      <el-table-column prop="lv" label="lv" sortable fit align="center"></el-table-column>
      <el-table-column prop="lw" label="lw" sortable fit align="center"></el-table-column>
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
          lu: '37.86',
          lv: '33.54',
          lw: '33.06',
          date: '2017-09-14 09:00'
        }, {
          id: '2',
          name: '监测点2',
          lu: '2.08',
          lv: '1.44',
          lw: '1.12',
          date: '2017-09-14 09:00'
        }, {
          id: '3',
          name: '监测点3',
          lu: '8.67',
          lv: '-',
          lw: '8.43',
          date: '2017-09-14 09:00'
        }, {
          id: '4',
          name: '监测点4',
          lu: '5.22',
          lv: '-',
          lw: '6.13',
          date: '2017-09-14 09:00'
        }, {
          id: '5',
          name: '监测点5',
          lu: '27.84',
          lv: '25.6',
          lw: '30.64',
          date: '2017-09-14 09:00'
        }, {
          id: '6',
          name: '监测点6',
          lu: '8.4',
          lv: '4.72',
          lw: '1.44',
          date: '2017-09-14 09:00'
        }, {
          id: '7',
          name: '监测点7',
          lu: '-',
          lv: '-',
          lw: '-',
          date: '2017-09-14 09:00'
        }, {
          id: '8',
          name: '监测点8',
          lu: '0',
          lv: '0',
          lw: '0',
          date: '2017-09-14 09:00'
        }, {
          id: '9',
          name: '监测点9',
          lu: '9.2',
          lv: '6.8',
          lw: '8',
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