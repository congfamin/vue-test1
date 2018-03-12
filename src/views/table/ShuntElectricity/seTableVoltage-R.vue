<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable fit align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="电压(V)" align="center">
      <el-table-column prop="UU" label="Uu/Uuv" sortable fit align="center"></el-table-column>
      <el-table-column prop="Uu" label="Uv" sortable fit align="center"></el-table-column>
      <el-table-column prop="Uu" label="Uw/Uwv" sortable fit align="center"></el-table-column>
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
          UU: '235.2',
          Uu: '238.9',
          Uw: '236.2',
          date: '2017-09-14 09:00'
        }, {
          id: '2',
          name: '监测点2',
          UU: '235.9',
          Uu: '239.5',
          Uw: '237.1',
          date: '2017-09-14 09:00'
        }, {
          id: '3',
          name: '监测点3',
          UU: '10310',
          Uu: '-',
          Uw: '10310',
          date: '2017-09-14 09:00'
        }, {
          id: '4',
          name: '监测点4',
          UU: '10240',
          Uu: '-',
          Uw: '10040',
          date: '2017-09-14 09:00'
        }, {
          id: '5',
          name: '监测点5',
          UU: '234.9',
          Uu: '239.3',
          Uw: '236.6',
          date: '2017-09-14 09:00'
        }, {
          id: '6',
          name: '监测点6',
          UU: '235.3',
          Uu: '239.2',
          Uw: '236.9',
          date: '2017-09-14 09:00'
        }, {
          id: '7',
          name: '监测点7',
          UU: '-',
          Uu: '-',
          Uw: '-',
          date: '2017-09-14 09:00'
        }, {
          id: '8',
          name: '监测点8',
          UU: '上海',
          Uu: '普陀区',
          Uw: '上海市普陀区金沙江路 1518 弄',
          date: '2017-09-14 09:00'
        }, {
          id: '9',
          name: '监测点9',
          UU: '230.5',
          Uu: '229.7',
          Uw: '230.7',
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