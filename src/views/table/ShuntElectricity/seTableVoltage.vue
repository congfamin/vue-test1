<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" width="100" fit align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable width="180" align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" le fit align="center"></el-table-column>
    <el-table-column label="最高电压(V)" align="center">
      <el-table-column prop="maxUU" label="Uu/Uuv" sortable fit align="center"></el-table-column>
      <el-table-column prop="maxUu" label="Uv" sortable fit align="center"></el-table-column>
      <el-table-column prop="maxUw" label="Uw/Uwv" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column label="最低电压(V)" align="center">
      <el-table-column prop="minUU" label="Uu/Uuv" sortable fit align="center"></el-table-column>
      <el-table-column prop="minUu" label="Uu" sortable fit align="center"></el-table-column>
      <el-table-column prop="minUw" label="Uw/Uwv" sortable fit align="center"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          id: '1',
          name: '监测点1',
          maxUU: '10600',
          maxUu: '-',
          maxUw: '10590',
          minUU: '10230',
          minUu: '-',
          minUw: '10200',
          date: '2017-09-14'
        }, {
          id: '2',
          name: '监测点2',
          maxUU: '10520',
          maxUu: '-',
          maxUw: '10300',
          minUU: '10210',
          minUu: '-',
          minUw: '9980',
          date: '2017-09-14'
        }, {
          id: '3',
          name: '监测点3',
          maxUU: '244.4',
          maxUu: '245.7',
          maxUw: '246.1',
          minUU: '233.4',
          minUu: '234.8',
          minUw: '236',
          date: '2017-09-14'
        }, {
          id: '4',
          name: '监测点4',
          maxUU: '244.1',
          maxUu: '246.1',
          maxUw: '246.8',
          minUU: '232.9',
          minUu: '234.5',
          minUw: '235.8',
          date: '2017-09-14'
        }, {
          id: '5',
          name: '监测点5',
          maxUU: '243.3',
          maxUu: '246',
          maxUw: '246.5',
          minUU: '232.4',
          minUu: '234.4',
          minUw: '235.8',
          date: '2017-09-14'
        }, {
          id: '6',
          name: '监测点6',
          maxUU: '243.2',
          maxUu: '244',
          maxUw: '245.8',
          minUU: '232.5',
          minUu: '234.2',
          minUw: '235.1',
          date: '2017-09-14'
        }, {
          id: '7',
          name: '监测点7',
          maxUU: '242.8',
          maxUu: '244.1',
          maxUw: '246.4',
          minUU: '232.6',
          minUu: '234.1',
          minUw: '235',
          date: '2017-09-14'
        }, {
          id: '8',
          name: '监测点8',
          maxUU: '238.6',
          maxUu: '238.1',
          maxUw: '238.1',
          minUU: '229.4',
          minUu: '228.2',
          minUw: '228.8',
          date: '2017-09-14'
        }, {
          id: '9',
          name: '监测点9',
          maxUU: '238.6',
          maxUu: '238.1',
          maxUw: '238.2',
          minUU: '229.3',
          minUu: '228.2',
          minUw: '228.7',
          date: '2017-09-14'
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