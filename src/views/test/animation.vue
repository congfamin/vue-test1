<template>
<div>
  <el-carousel :interval="4000" height="200px">
    <el-carousel-item>
      <table1></table1>
    </el-carousel-item>
    <el-carousel-item>

    </el-carousel-item>
    <el-carousel-item>

    </el-carousel-item>
    <el-carousel-item>

    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import table1 from '../table/ShuntElectricity/seTableCurrent-R'
import table2 from '../table/ShuntElectricity/seTableLoad-R'

  export default {
    components:{
      table1,
      table2
    }
    
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
