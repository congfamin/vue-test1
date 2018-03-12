<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col class="logo">
          <ul class="logo-ul">
            <li><img src="../../assets/images/top_biaoti.jpg" alt=""></li>
          </ul>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="banner">
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item class="carouselOne"></el-carousel-item>
            <el-carousel-item class="carouselTwo"></el-carousel-item>
            <el-carousel-item class="carouselThree"></el-carousel-item>
            <el-carousel-item class="carouselFour"></el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="nav-row">
        <el-col>
          <ul class="nav">
            <li @click="about">公司简介</li>
            <li @click="quality">品质保证</li>
            <li @click="service">客户服务</li>
            <li @click="contact">联系我们</li>
          </ul>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <transition name="fade" mode="out-in">
          <el-col class="content" v-if="tab=='公司简介'">
            <p class="first">
              南京电力自动化设备三厂有限公司（原南京电力自动化设备总厂三厂）系集科研、生产经营为一体的高新技术企
              业，早在1983年就在全国率先研制生产了全电子单、三相电能表校验装置，并首家通过国家能源部鉴定，同时取得国
              家技术监督局颁发的“CMC制造计量器具许可证”。经过二十年的不懈努力，本企业在生产经营中不断提高企业素质和
              竞争优势，以自己独特的企业文化、经营理念凝聚了大批优秀的专业人才，现拥有高级研发人员数十人，90%的员工
              具有大专以上学历。企业视产品质量为生存与发展之本，致力于研发、生产高品质、高新技术的产品，建立了完善的
              市场营销网络和技术服务队伍，产品遍及全国二十几个省市。
            </p>
            <p class="second">
              本企业按照国际标准建立了质量保证体系，通过了ISO9001质量体系认证。进入新世纪，本企业大力进行体制改革，
              加快战略结构调整步伐，按照现代化企业制度要求，以资本为纽带，进行资产重组，发挥企业品牌优势和技术新优势。
              产品的科技含量、性价比已跻身行业领先地位，多次荣获江苏省科技技术进步奖。强大的研发能力和科学的质量管理体
              系，使企业的电能计量产品及配套软件不断升级换代，现我公司的系列成套产品有：单、三相全自动多功能电能表检定
              装置；单、三相多功能标准表；单、三相现场校验仪；三相全自动交直流仪表检定装置；单、三相便携式电能表检定装
              置；三相便携式全自动交直流仪表检定装置；全自动直流仪表检定装置；全自动互感器检定装置；交流采样检定装置和
              电力系统内各类负控、集抄、综合自动化、调度等系统和软件。产品投放市场以来，深受电力系统企业的欢迎和好评。
            </p>
          </el-col>
        </transition>
        <transition name="fade" mode="out-in">
          <el-col class="content" v-if="tab=='品质保证'">
            <p class="first">
              南京电力自动化设备总厂秉承了以“质量为本”的原则，对各分厂的开发和生产的所有操作流程严格按照ISO9001质
              量体系运行。总厂对各分厂实行标准化对口管理，对所有产品的开发和技术指标均严格审核 ，报国电公司备案；各分厂
              所用原材料均由总厂认定厂家，统一选型购买，并对其进行严格老化、筛选 ；总厂具有较完善的例行试验设备，定期对
              各分厂产品进行例行测试；企业在生产过程中不断提升企业 素质，提高产品质量，并于2002年3月通过了ISO9001（2000版）
              质量体系认证。企业在严格按照ISO9001 标准规定去做的同时，对全体员工定期进行培训，使职工的质量意识和技术水
              平不断提高。 
            </p>
            <p class="second">
              我们口号是：国内领先 赶超国际 一流服务 优质名牌。
            </p>
            <div class="certificate"></div>
          </el-col>
        </transition>
        <transition name="fade" mode="out-in">
          <el-col class="content" v-if="tab=='客户服务'">
                        <pre>
                        承诺：

                        接到报修电话，立即进行电话回访，电话内无法排除故障，8-24小时内工程师现场处理。

                        提供产品终身免费维护服务。

                        提供产品配套软件免费升级服务。
                        </pre>
          </el-col>
        </transition>
        <transition name="fade" mode="out-in">
          <el-col class="content" v-if="tab=='联系我们'">
                        <pre>
                        联系电话：柏永林　13770617608 
                        邓大金　13813894466
                        技术支持：金在冬　13851482907
                        售后支持：占学文　13851607471 
                        　　　　　高长标　15996295540 
                        传 真(FAX)：(025)-84646396 公司 
                        Email：13770617608@163.com
                        地址：江苏省南京市浦口区桥北路436号  邮编：210012
                        公司官网：<a href="http://www.njnzsc.com" target="_blank">www.njnzsc.com</a>
                        </pre>
          </el-col>
        </transition>
      </el-row>
      <el-row :gutter="20" class="footer-row">
        <el-col>
          <div class="footer">
            <span class="footer-text">技术支持：南京电力自动化设备三厂 Copyright © 2011 南京电力自动化设备三厂有限公司 苏ICP备11053094号</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: '公司简介'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      about () {
        this.tab = '公司简介'
      },
      quality () {
        this.tab = '品质保证'
      },
      service () {
        this.tab = '客户服务'
      },
      contact () {
        this.tab = '联系我们'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    width: 100%;
    height: 1rem;
    border-top: 0.04rem solid #458B74;
    border-bottom: 0.01rem solid #eee;
    margin-bottom: 0.2rem;
    .logo-ul {
      list-style: none;
      display: flex;
      li {
        line-height: 1.2rem;
      }
    }
  }
  .nav-row {
    margin: 0.2rem 0;
    .nav {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #fff;
      list-style: none;
      display: flex;
      justify-content: space-around;
      background-image: -webkit-radial-gradient(center, #20B2AA, #458B74);
      li {
        cursor: pointer
      }
      li:hover {
        color: #104E8B;
      }
    }
  }
  .content {
    font-size: 0.14rem;
    text-indent: 0.32rem;
    letter-spacing: 0.02rem;
    line-height: 0.3rem;
    .first, .second {
      margin-bottom: 0.2rem;
    }
    .certificate {
      width: 6rem;
      margin: 0 auto;
      height: 4.5rem;
      background: url(../../assets/images/certificate.jpg) no-repeat;
    }
    a {
      color: #6495ED;
      text-decoration: underline;
    }
    a:hover {
      color: #63B8FF;
    }
  }
  .footer-row {
    margin-top: 0.2rem;
    .footer {
      height: 0.4rem;
      text-align: right;
      padding: 0 0.1rem;
      background-image: -webkit-radial-gradient(center, #20B2AA, #458B74);
      .footer-text {
        line-height: 0.4rem;
        font-size: 0.12rem;
        color: #fff;
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 0.14rem;
    opacity: 0.75;
    line-height: 2.5rem;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carouselOne {
    background: url(../../assets/images/about.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .carouselTwo {
    background: url(../../assets/images/quality.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .carouselThree {
    background: url(../../assets/images/service.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .carouselFour {
    background: url(../../assets/images/contact.jpg) no-repeat;
    background-size: 100% 100%;
  }
</style>