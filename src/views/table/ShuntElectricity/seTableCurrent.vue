<template>
  <el-table :data="tableData" max-height="650" border style="width:100%"
            :default-sort="{prop: 'date', order: 'decrease'}" @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共14个）" width="180" fit align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable fit align="center"></el-table-column>
    <el-table-column label="电流(A)" align="center">
      <el-table-column prop="maxlu" label="lu" sortable fit align="center"></el-table-column>
      <el-table-column prop="maxlv" label="lv" max sortable fit align="center"></el-table-column>
      <el-table-column prop="maxlw" label="lw" somaxrtable fit align="center"></el-table-column>
    </el-table-column>
    <el-table-column label="电流(A)" align="center">
      <el-table-column prop="minlu" label="lu" sortable fit align="center"></el-table-column>
      <el-table-column prop="minlv" label="lv" max sortable fit align="center"></el-table-column>
      <el-table-column prop="minlw" label="lw" somaxrtable fit align="center"></el-table-column>
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
          maxlu: '119.84',
          maxlv: '117.04',
          maxlw: '126.48',
          minlu: '5.2',
          minlv: '0',
          minlw: '0',
          date: '2017-09-14'
        }, {
          id: '2',
          name: '监测点2',
          maxlu: '81.12',
          maxlv: '119.84',
          maxlw: '129.2',
          minlu: '3.6',
          minlv: '0',
          minlw: '0',
          date: '2017-09-14'
        }, {
          id: '3',
          name: '监测点3',
          maxlu: '70.14',
          maxlv: '43.38',
          maxlw: '45.78',
          minlu: '3.72',
          minlv: '3.66',
          minlw: '3.48',
          date: '2017-09-14'
        }, {
          id: '4',
          name: '监测点4',
          maxlu: '56.32',
          maxlv: '37.68',
          maxlw: '44.64',
          minlu: '2.8',
          minlv: '2.16',
          minlw: '3.2',
          date: '2017-09-14'
        }, {
          id: '5',
          name: '监测点5',
          maxlu: '55.04',
          maxlv: '36',
          maxlw: '42.08',
          minlu: '2.4',
          minlv: '1.84',
          minlw: '3.12',
          date: '2017-09-14'
        }, {
          id: '6',
          name: '监测点6',
          maxlu: '47.52',
          maxlv: '32.08',
          maxlw: '39.36',
          minlu: '2.08',
          minlv: '1.44',
          minlw: '2',
          date: '2017-09-14'
        }, {
          id: '7',
          name: '监测点7',
          maxlu: '41.12',
          maxlv: '35.04',
          maxlw: '39.28',
          minlu: '12.8',
          minlv: '5.28',
          minlw: '4.96',
          date: '2017-09-14'
        }, {
          id: '8',
          name: '监测点8',
          maxlu: '33.84',
          maxlv: '18.64',
          maxlw: '31.44',
          minlu: '1.36',
          minlv: '1.36',
          minlw: '1.28',
          date: '2017-09-14'
        }, {
          id: '9',
          name: '监测点9',
          maxlu: '32.08',
          maxlv: '16.72',
          maxlw: '30.88',
          minlu: '1.2',
          minlv: '1.36',
          minlw: '1.28',
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