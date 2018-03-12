<template>
  <el-table :data="tableData" max-height="650" border style="width:100%"
            :default-sort="{prop: 'id', order: 'descending'}" @cell-click="showDetail">
    <el-table-column prop="id" label="序号" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="name" label="监测点（共36个）" sortable fit align="center">
      <template scope="scope">
        <span class="detailSpan">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="100" align="center"></el-table-column>
    <el-table-column prop="max" label="最大需量(kW)" sortable fit align="center"></el-table-column>
    <el-table-column prop="happend" label="发生时间" sortable fit align="center"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['tableData'],
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