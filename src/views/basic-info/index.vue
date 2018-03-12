<template>
  <div class="basicInfo">
    <el-collapse v-model="activeName">
      <el-collapse-item title="企业信息" name="1">
        <div class="EnterpriseInformation">
          <el-row :lg="24">
            <h2>企业信息</h2>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">企业名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">用电监测体验</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">简称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">用电监测体验</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">系统名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">SIN</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">成立日期</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">1995-04-26</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">企业性质</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">有限责任公司</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">主营行业</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">工业</div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>

      <el-collapse-item title="用电信息" name="2">
        <div class="ElectricityInformation">
          <el-row :lg="24">
            <h2>用电信息</h2>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">用电地址：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">栖霞区恒通大道33-1号</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">用户编号</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">0156105158</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">用户分类</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">高压</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">供电单位</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">南京供电公司市区</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">合同容量(kVA)</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">5000</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">运行容量(kVA)</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">5000</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">定价策略类型</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">单一制</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">供电电压</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">10kV</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">送电日期</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">2017-05-23</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">用电类别</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">大工业用电</div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>

      <el-collapse-item title="联系人信息" name="3">
        <div class="ContactInformation">
          <el-row :lg="24">
            <h2>联系人信息</h2>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">用电主管</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">赵志辉</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">联系电话</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">13584092404</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">用电负责人</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">彭杰军</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">联系电话</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">13818955787</div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>

      <el-collapse-item title="变压器信息" name="4">
        <div class="FacilityInformation">
          <el-row :lg="24">
            <h2>变压器信息</h2>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">变压器名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">4#变压器（新楼）</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">额定容量</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">640(kVA)</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">变压器名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">5#变压器（新楼）</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">额定容量</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">640(kVA)</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">变压器名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">6#变压器（新楼）</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">额定容量</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">640(kVA)</div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName: '1'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  h2 {
    letter-spacing: 5px;
    text-align: center;
    color: #4682B4;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid #5CACEE;
  }
  .el-row {
    font-size: 14px;
    text-align: left;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .EnterpriseInformation, .ElectricityInformation, .ContactInformation, .FacilityInformation {
    padding: 0 40px;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>