<template>
  <el-table :data="tableData" max-height="650" border style="width:100%" :default-sort="{prop: 'id', order: 'decrease'}"
            @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共14个）" sortable width="180" align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="120" align="center"></el-table-column>
    <el-table-column label="有功电量 (kWh)" align="center">
      <el-table-column prop="sum" label="总" sortable fit align="center"></el-table-column>
      <el-table-column prop="max" label="峰" sortable fit align="center"></el-table-column>
      <el-table-column prop="avg" label="平" sortable fit align="center"></el-table-column>
      <el-table-column prop="min" label="谷" sortable fit align="center"></el-table-column>
      <el-table-column prop="top" label="尖" sortable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column prop="Rpower" label="无功电量 (kWh)" align="center" sortable width="160"></el-table-column>
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
            sum: 1860,
            max: 750,
            avg: 855,
            min: 240,
            top: 0,
            Rpower: 900
          }, {
            id: 2,
            name: '监测点2',
            date: '2017-08-26',
            sum: 1200,
            max: 585,
            avg: 450,
            min: 165,
            top: 0,
            Rpower: 405
          }, {
            id: 3,
            name: '监测点3',
            date: '2017-08-26',
            sum: 616,
            max: 252,
            avg: 313,
            min: 51,
            top: 0,
            Rpower: 363
          }, {
            id: 4,
            name: '监测点4',
            date: '2017-08-26',
            sum: 552,
            max: 226,
            avg: 282,
            min: 44,
            top: 0,
            Rpower: 334
          }, {
            id: 5,
            name: '监测点5',
            date: '2017-08-26',
            sum: 268,
            max: 122,
            avg: 88,
            min: 58,
            top: 0,
            Rpower: 53
          }, {
            id: 6,
            name: '监测点6',
            date: '2017-08-26',
            sum: 263,
            max: 145,
            avg: 101,
            min: 17,
            top: 0,
            Rpower: 272
          }, {
            id: 7,
            name: '监测点7',
            date: '2017-08-26',
            sum: 259,
            max: 143,
            avg: 100,
            min: 16,
            top: 0,
            Rpower: 252
          }, {
            id: 8,
            name: '监测点8',
            date: '2017-08-26',
            sum: 219,
            max: 95,
            avg: 81,
            min: 43,
            top: 0,
            Rpower: 41
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