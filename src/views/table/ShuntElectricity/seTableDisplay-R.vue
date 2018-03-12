<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable width="180" align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="示数" align="center">
      <el-table-column prop="Pactive" label="正向有功" sortable fit align="center"></el-table-column>
      <el-table-column prop="Preactive" label="反向有功" sortable fit align="center"></el-table-column>
      <el-table-column prop="Ractive" label="正向无功" sortable fit align="center"></el-table-column>
      <el-table-column prop="Rreactive" label="反向无功" sortable fit align="center"></el-table-column>
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
          Pactive: '2442.59',
          Preactive: '0',
          Ractive: '473.52',
          Rreactive: '23.53',
          date: '2017-09-14 09:00'
        }, {
          id: '2',
          name: '监测点2',
          Pactive: '766.67',
          Preactive: '0',
          Ractive: '115.4',
          Rreactive: '70.11',
          date: '2017-09-14 09:00'
        }, {
          id: '3',
          name: '监测点3',
          Pactive: '364.77',
          Preactive: '0',
          Ractive: '178.12',
          Rreactive: '2.14',
          date: '2017-09-14 09:00'
        }, {
          id: '4',
          name: '监测点4',
          Pactive: '254.12',
          Preactive: '0',
          Ractive: '73.05',
          Rreactive: '8.78',
          date: '2017-09-14 09:00'
        }, {
          id: '5',
          name: '监测点5',
          Pactive: '1286.02',
          Preactive: '0',
          Ractive: '415.76',
          Rreactive: '8.06',
          date: '2017-09-14 09:00'
        }, {
          id: '6',
          name: '监测点6',
          Pactive: '411.32',
          Preactive: '0',
          Ractive: '54.84',
          Rreactive: '9.09',
          date: '2017-09-14 09:00'
        }, {
          id: '7',
          name: '监测点7',
          Pactive: '9.89',
          Preactive: '0',
          Ractive: '18.52',
          Rreactive: '0.07',
          date: '2017-09-14 09:00'
        }, {
          id: '8',
          name: '监测点8',
          Pactive: '401.54',
          Preactive: '0',
          Ractive: '264.7',
          Rreactive: '0',
          date: '2017-09-14 09:00'
        }, {
          id: '9',
          name: '监测点9',
          Pactive: '65.16',
          Preactive: '0',
          Ractive: '48.09',
          Rreactive: '9.11',
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