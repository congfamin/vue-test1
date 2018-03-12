<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="日期" align="center">

    </el-table-column>
    <!-- <el-table-column label="总和" align="center"> -->
    <el-table-column prop="sum" label="监测点1" align="center">

    </el-table-column>
    <el-table-column prop="sum1" label="监测点2" align="center">

    </el-table-column>
    <!-- </el-table-column> -->
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          num: '1',
          sum: '46,15',
          sum1: '36.91',
          date: '2017-08-15'
        }, {
          num: '2',
          sum: '44.91',
          sum1: '44.9',
          date: '2017-08-16'
        }]
      }
    }
  }
</script>